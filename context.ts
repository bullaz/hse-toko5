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
  Organise2: {
    toko5Id: string;
  };
  IdentifyRisks: {
    toko5Id: string;
  };
  ControlMeasure: {
    toko5Id: string;
    questionId: number;
  };
  Epi: {
    toko5Id: string;
  };
  Fitness: {
    toko5Id: string;
  };
  ListProblem: {
    toko5: any;
  };
  Commentaire: {
    toko5: Toko5Json | null;
  };

  ScanQr: undefined;
  Recent: undefined;
  Invalide: undefined;
  Home: undefined;
  LoginSup: undefined;
};


export interface Question {
  question_id: number;
  // add other properties that your question object has
  texte?: string;
  categorie?: string;
}

export interface RepDto {
  nomQuestion: string;
  valeur: boolean;
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


export interface ControlMeasureRisk {
  mesure_controle_id: number,
  toko5_id: string,
  question_id: number,
  implemented: boolean,
  nom: string,
  pictogramme: string,
  required: boolean,
  categorie: string
}

export interface Toko5 {
  toko5_id: string,
  nom_contractant: string,
  prenom_contractant: string,
  date_heure: string,
  etat: string
}

export interface Toko5Json {
  toko5Id: string,
  nomContractant: string,
  prenomContractant: string,
  dateHeure: string,
  etat: string,
  listMesureControle: MesureControleDto[],
  listCommentaire: CommentaireDto[],
  listProblem: QuestionDto[]
}

export interface CommentaireInterface {
  commentaireId: number,
  nom: string,
  prenom: string,
  commentaire: string
}


export interface QuestionDto {
  questionId: number,
  nom: string,
  pictogramme: string,
  categorie: string,
  required: boolean
}

export interface MesureControleDto {
  mesureControleId: string,
  question: QuestionDto,
  mesurePrise: string,
  implemented: boolean
}

export interface CommentaireDto {
  commentaireId: string,
  nom: string,
  prenom: string,
  commentaire: string
}