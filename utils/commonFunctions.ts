import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { Question, Reponse } from "../context";

export function getLocalDateTimeISOString(): string {
  const now = new Date();

  // Get individual date and time components
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



export const getAllData = async (toko5Repository: any /*should use the appropriate typing bro*/, categorie: string, toko5Id: string, withRequired: boolean, required: boolean) => {
  try {
    if (toko5Repository !== null) {
      let listQuestion = [];
      if (withRequired) {
        listQuestion = await toko5Repository.getAllCategorieQuestionWithRequired(categorie, required);
        //console.log('listQuestion in organise1', listQuestion);
      } else {
        listQuestion = await toko5Repository.getAllCategorieQuestion(categorie);
      }
      //setListQuestion(list);



      // find a cleaner way to achieve this .. I think this is too dirty ... maybe
      let listAnswer = [];
      if (withRequired) {
        listAnswer = await toko5Repository.getAllReponseToko5CategorieWithRequired(toko5Id, categorie, required); //with required
      } else {
        listAnswer = await toko5Repository.getAllReponseToko5Categorie(toko5Id, categorie); //with required
        //console.log('saved list answer', listAnswer);
      }

      let listValiny: any;
      if (listAnswer.length > 0) {
        let listRep: Record<number, Reponse> = {};

        for (let answer of listAnswer as Reponse[]) {
          //console.log('conversion individual of the database answer to reponse',answer);
          let x: Reponse = { ///don't even need that .. xD xD xD 
            toko5_id: toko5Id,
            question_id: answer.question_id,
            valeur: Boolean(answer.valeur)
          };
          listRep[answer.question_id] = x;
        }
        for (let question of listQuestion as Question[]) {
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
        //setListReponse(listRep);
      } else {
        let listRep: Record<number, Reponse> = {};
        for (let question of listQuestion as Question[]) {
          //console.log('question',question);
          let reponse: Reponse = {
            toko5_id: toko5Id,
            question_id: question.question_id,
            valeur: false,
          };
          //console.log('reponse',reponse);
          listRep[question.question_id] = reponse;
        }
        //console.log('listRep',listRep);
        listValiny = listRep

        //console.log(listRep)
      }
      return { listQuestion: listQuestion, listReponse: listValiny }
    } throw new Error('getAllReponseData function : toko5repository is null');
  } catch (error) {
    console.error('Error in the getAllReponseData function ', error);
  } finally {
    //setLoading(false);
  }
};