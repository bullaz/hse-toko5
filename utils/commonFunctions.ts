import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { Question, Reponse } from "../context";
import Toko5Repository from "../repository/Toko5Repository";

export function getLocalDateTimeISOString(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

  // Get timezone offset in minutes and convert to +/-HH:MM format
  const timezoneOffsetMinutes = -now.getTimezoneOffset(); // getTimezoneOffset returns negative for positive offsets
  const offsetSign = timezoneOffsetMinutes >= 0 ? '+' : '-';
  const offsetHours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60).toString().padStart(2, '0');
  const offsetMinutes = (Math.abs(timezoneOffsetMinutes) % 60).toString().padStart(2, '0');
  const timezoneOffset = `${offsetSign}${offsetHours}:${offsetMinutes}`;

  // Construct the ISO 8601 string with local timezone offset
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffset}`;
}


//rft
export const getAllData = async (toko5Repository: Toko5Repository, categorie: string, toko5Id: string, withRequired: boolean, required: boolean) : Promise<{ listQuestion: Question[], listReponse: Record<number, Reponse> }> => {
  try {
    let listQuestion: Question[] = [];
    let listAnswer: Reponse[] = [];
    if (withRequired) {
      listQuestion = await toko5Repository.getAllCategorieQuestionWithRequired(categorie, required);
      listAnswer = await toko5Repository.getAllReponseToko5CategorieWithRequired(toko5Id, categorie, required);
    } else {
      listQuestion = await toko5Repository.getAllCategorieQuestion(categorie);
      listAnswer = await toko5Repository.getAllReponseToko5Categorie(toko5Id, categorie);
    }

    let listValiny: Record<number, Reponse> = {};
    if (listAnswer.length > 0) {
      let listRep: Record<number, Reponse> = {};

      for (let answer of listAnswer as Reponse[]) {
        listRep[answer.question_id] = answer;
      }
      for (let question of listQuestion) {
        if (!listRep[question.question_id]) {
          let x: Reponse = {
            toko5_id: toko5Id,
            question_id: question.question_id,
            valeur: false
          };
          listRep[question.question_id] = x;
        }
      }
      listValiny = listRep;
    } else {
      let listRep: Record<number, Reponse> = {};
      for (let question of listQuestion) {
        let reponse: Reponse = {
          toko5_id: toko5Id,
          question_id: question.question_id,
          valeur: false,
        };
        listRep[question.question_id] = reponse;
      }
      listValiny = listRep
    }
    return { listQuestion: listQuestion, listReponse: listValiny }
  } catch (error) {
    throw error;
  }
};