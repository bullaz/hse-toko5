import axios from "axios";
import Toko5Repository from "../repository/Toko5Repository";
import { BACKEND_URL } from "../constants/commonConstants";
import NetInfo from '@react-native-community/netinfo';
import { RepDto, ReponseInterfaceView } from "../context";

export const isInternetReachable = async () => {
    const state = await NetInfo.fetch();
    return state.isInternetReachable;
};

export const updateOrAddToko5 = async (toko5Id: string, toko5Repository: Toko5Repository, withReponse: boolean, listRepView: ReponseInterfaceView[] = []) => {
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