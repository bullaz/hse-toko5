import axios from "axios";
import Toko5Repository from "../repository/Toko5Repository";
import { BACKEND_URL } from "../constants/commonConstants";
import NetInfo from '@react-native-community/netinfo';
import { CommentaireDto, RepDto, Reponse, ReponseInterfaceView, Toko5Json } from "../context";
import { v7 as uuidv7 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import { toko5StateDto } from "../types/domain";


const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const isInternetReachable = async () => {
    const state = await NetInfo.fetch();
    return state.isInternetReachable;
};


export const addCommentaire = async (toko5Repository: Toko5Repository | null, toko5Id: string, nom: string, prenom: string, commentaire: string): Promise<CommentaireDto> => {
    let netState = await isInternetReachable();
    if (netState && toko5Repository) {
        let response = await axios.post(`${BACKEND_URL}/toko5s/toko5/${toko5Id}/comments`, {
            commentaireId: uuidv7(),
            toko5Id: toko5Id,
            nom: nom,
            prenom: prenom,
            commentaire: commentaire
        })
        return response.data;
    }
    if (!toko5Repository) {
        throw new Error("toko5repository is null");
    }
    throw new Error("pas de connection internet");
}

export const updateCommentaire = async (toko5Repository: Toko5Repository | null, toko5Id: string, commentaireId: string, commentaire: string) => {
    let netState = await isInternetReachable();
    if (netState && toko5Repository) {
        await axiosInstance.put(`/toko5s/comments/${commentaireId}`, {},
            {
                params: {
                    commentaire: commentaire
                }
            });
    }
}


export const resolveToko5 = async (toko5Id: string): Promise<Toko5Json> => {
    let netState = await isInternetReachable();
    if (netState) {
        const response = await axiosInstance.put(`/toko5s/toko5/${toko5Id}/resolve`, {}, {});
        return response.data;
    }
    throw new Error("you have internet access issues");
}

export const refreshToko5s = async (toko5Repository: Toko5Repository | null): Promise<toko5StateDto[]> => {
    let netState = await isInternetReachable();
    if (netState && toko5Repository) {
        try {
            let listToko5Today = await toko5Repository.getAllToko5Today();
            let listToko5Ids = listToko5Today.map((toko5, index) => {
                return toko5.toko5_id;
            })
            const toko5sReponse = await axiosInstance.get("/toko5s/refresh_state", {
                params: { ids: listToko5Ids },
                paramsSerializer: {
                    indexes: null //This tells axios to NOT use array brackets
                }
            });
            const listToko5StateDto: toko5StateDto[] = toko5sReponse.data;
            //console.log(listToko5StateDto);
            for (const stateDto of listToko5StateDto) {
                await toko5Repository.updateStateToko5(stateDto.toko5Id, stateDto.etat);
            }
            return listToko5StateDto;
        } catch (error) {
            console.error(error); ///.../
        }
    }
    throw new Error("you have internet access issues or internal app error"); //change that mf (separate errors..)
}


export const addMesureControle = async (toko5Repository: Toko5Repository | null, toko5Id: string, questionId: number, mesurePrise: string) => {
    let netState = await isInternetReachable();
    if (netState && toko5Repository) {
        //console.log("add mesure controle api here");
        const controlId: string = await toko5Repository.insertIntoControlMeasure(toko5Id, questionId, mesurePrise, false);
        //console.log("control Id", controlId);
        const question = await toko5Repository.findQuestionById(questionId);
        //console.log(question);
        axios.post(`${BACKEND_URL}/toko5s/toko5/${toko5Id}/mesures_controle`, {
            mesureControleId: controlId,
            toko5Id: toko5Id,
            questionNom: question.nom,
            mesure: mesurePrise,
            implemented: false
        })
        //console.log('add mesure controle finished');
    }
}

export const updateMesureControle = async (toko5Repository: Toko5Repository | null, toko5Id: string, mesureId: string, mesurePrise: string, implemented: boolean) => {
    let netState = await isInternetReachable();
    if (netState && toko5Repository) {
        await axiosInstance.put(`/toko5s/toko5/${toko5Id}/mesures_controle/${mesureId}`, {
            mesureControleId: null,
            toko5Id: null,
            questionNom: null,
            mesure: mesurePrise,
            implemented: implemented
        });
    }
}

export const updateOrAddToko5 = async (toko5Id: string, toko5Repository: Toko5Repository, withReponse: boolean, listRepView: ReponseInterfaceView[] | Reponse[] = [], notify: boolean = false) => {
    let netState = await isInternetReachable();

    let listRepDto: RepDto[] = [];
    if (withReponse) {
        // Use Promise.all to handle async mapping
        listRepDto = await Promise.all(
            listRepView.map(async (rep) => {
                let question = await toko5Repository.findQuestionById(rep.question_id);
                return {
                    nomQuestion: question.nom,
                    valeur: rep.valeur
                } as RepDto;
            })
        );
    }

    if (netState) {
        try {
            let tk = await toko5Repository.findToko5ById(toko5Id);
            let params: {
                withReponse: boolean,
                notify: boolean
            } = {
                withReponse: withReponse,
                notify: false,
            }
            if (notify) {
                params = {
                    withReponse: withReponse,
                    notify: true
                }
            }
            // console.log({
            //     toko5: tk,
            //     listReponseDTO: listRepDto
            // });
            await axios.put(`${BACKEND_URL}/toko5s/toko5/${toko5Id}`,
                {
                    toko5: tk,
                    listReponseDTO: listRepDto
                },
                {
                    params: params,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            return true;
        } catch (error) {
            console.log("error updateToko5", error);
            return false;
        }
    }
    return false;
}
