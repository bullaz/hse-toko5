import { createContext } from "react";
import Toko5Repository from "./repository/Toko5Repository";

export const DatabaseContext = createContext<Toko5Repository | null>(null);


//maybe put this in another file XD
export type RootStackParamList = {
  Login: undefined;
  Think: undefined;
  SinglePicto: {
    question: any;
  };
  Organise1: undefined;
  Organise2: undefined;
  IdentifyRisks: undefined;
  ControlMeasure: undefined;
  Epi: undefined;
  Fitness: undefined;
  ScanQr: undefined;
  Commentaire: undefined;
};