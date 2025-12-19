import axios from "axios";
import Toko5Repository from "../repository/Toko5Repository";
import { BACKEND_URL } from "../constants/commonConstants";
import NetInfo from '@react-native-community/netinfo';
import { RepDto, Reponse, ReponseInterfaceView } from "../context";


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


export const addMesureControle = async (toko5Repository: Toko5Repository | null, toko5Id: string, questionId: number, mesurePrise: string) => {
    let netState = await isInternetReachable();
    if (netState && toko5Repository) {
        //console.log("add mesure controle api here");
        const controlId: string = await toko5Repository.insertIntoControlMeasure(toko5Id, questionId, '', false);
        console.log("control Id", controlId);
        const question = await toko5Repository.findQuestionById(questionId);
        console.log(question);
        await axios.post(`${BACKEND_URL}/toko5s/toko5/${toko5Id}/mesures_controle`, {
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

export const updateOrAddToko5 = async (toko5Id: string, toko5Repository: Toko5Repository, withReponse: boolean, listRepView: ReponseInterfaceView[] | Reponse[] = []) => {
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
            console.log({
                toko5: tk,
                listReponseDTO: listRepDto
            });
            await axios.put(`${BACKEND_URL}/toko5s/toko5/${toko5Id}`,
                {
                    toko5: tk,
                    listReponseDTO: listRepDto
                },
                {
                    params: {
                        withReponse: true
                    },
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
