import { createContext } from "react";
import Toko5Repository from "./repository/Toko5Repository";

export const DatabaseContext = createContext<Toko5Repository | null>(null);


//maybe put this in another file XD
export type RootStackParamList = {
  Login: undefined;
  Think: {
    toko5Id: string; 
  };
  SinglePicto: {
    question: any;
  };
  Organise1: {
    toko5Id: string; 
  };
  Organise2: undefined;
  IdentifyRisks: undefined;
  ControlMeasure: undefined;
  Epi: undefined;
  Fitness: undefined;
  ScanQr: undefined;
  Commentaire: undefined;
  Recent: undefined;
  Invalide: undefined;
};


export interface Question {
  question_id: number;
  // add other properties that your question object has
  texte?: string;
  categorie?: string;
}

export interface ReponseInterfaceView {
  toko5_id: string;
  question_id: number;
  valeur: boolean;
  pressed: boolean;
}

export interface Reponse {
  toko5_id: string;
  question_id: number;
  valeur: boolean;
}