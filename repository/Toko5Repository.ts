//import SQLite, { SQLiteDatabase } from 'expo-sqlite';


//********************************* VERIFY CONNECTION OPENING AND CLOSING */



///// USE PREPARED STATEMENT LATER, TRY TO FIND SOME ROOM FOR OPTIMIZATION 


//// get list toko5 recent gotta be order by dateheure

import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';
import { QUESTION_CATEGORIES } from '../constants/questionTypes';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { getLocalDateTimeISOString } from '../utils/commonFunctions';
import { ETAT } from '../constants/commonConstants';
import NetInfo from '@react-native-community/netinfo';
import { v7 as uuidv7 } from 'uuid';


class Toko5Repository {
    private db: SQLiteDatabase | null;
    isInitialized: boolean = false;

    constructor() {
        this.db = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            this.db = await SQLite.openDatabaseAsync('toko5DB');
            await this.createTables();
            this.isInitialized = true;
        } catch (error) {
            console.log('Error when opening the database: ', error)
        }
    }

    async createTables() {
        //try using transaction
        if (this.db !== null) {
            try {
                // await this.db.execAsync("DROP TABLE toko5");
                await this.db.execAsync("DROP TABLE commentaire");
                await this.db.execAsync("DROP TABLE mesure_controle");
                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS toko5 (
                        toko5_id TEXT PRIMARY KEY,
                        nom_contractant TEXT NOT NULL,
                        prenom_contractant TEXT NOT NULL,
                        date_heure TEXT NOT NULL,
                        etat TEXT NOT NULL DEFAULT 'ongoing' CHECK (etat in ('valide','invalide','ongoing')),
                        saved INTEGER NOT NULL DEFAULT 0 CHECK (saved in (0, 1))
                    )`
                )
                //date time as ISO8601 string
                console.log('Table toko5 created successfully');
            } catch (error) {
                console.log('Error creating table toko5: ', error);
            }

            try {
                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS question (
                        question_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nom TEXT NOT NULL UNIQUE,
                        pictogramme TEXT,
                        required INTEGER NOT NULL DEFAULT 0 CHECK (required in (0,1)),
                        categorie TEXT NOT NULL CHECK (categorie in ("think","organise","risk","epi","safety"))
                    )`
                )
                console.log('Table question created successfully');
            } catch (error) {
                console.log('Error creating table question: ', error);
            }


            try {
                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS traduction (
                        traduction_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        question_id INTEGER NOT NULL,
                        nom TEXT NOT NULL UNIQUE,
                        description TEXT,
                        code_langue TEXT,
                        FOREIGN_KEY question_id REFERENCES question(question_id)
                    )`
                )
                console.log('Table traduction created successfully');
            } catch (error) {
                console.log('Error creating table traduction: ', error);
            }

            try {
                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS reponse (
                        toko5_id TEXT NOT NULL,
                        question_id INTEGER NOT NULL,
                        valeur INTEGER CHECK (valeur in (0,1)),
                        PRIMARY KEY (toko5_id, question_id),
                        FOREIGN KEY (toko5_id) REFERENCES toko5(toko5_id),
                        FOREIGN KEY (question_id) REFERENCES question(question_id)
                    )`
                )
                console.log('Table reponse created successfully');
            } catch (error) {
                console.log('Error creating table reponse: ', error);
            }

            try {
                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS commentaire (
                        commentaire_id TEXT PRIMARY KEY,
                        toko5_id TEXT NOT NULL,
                        nom TEXT NOT NULL,
                        prenom TEXT NOT NULL,
                        commentaire TEXT UNIQUE NOT NULL,
                        FOREIGN KEY (toko5_id) REFERENCES toko5(toko5_id)
                    )`
                )
                console.log('Table commentaire created successfully');
            } catch (error) {
                console.log('Error creating table commentaire : ', error);
            }

            try {
                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS mesure_controle (
                        mesure_controle_id TEXT PRIMARY KEY,
                        toko5_id TEXT NOT NULL,
                        question_id INTEGER NOT NULL,
                        mesure_prise TEXT NOT NULL,
                        implemented INTEGER DEFAULT 0 CHECK (implemented in (0,1)),
                        FOREIGN KEY (toko5_id) REFERENCES toko5(toko5_id),
                        FOREIGN KEY (question_id) REFERENCES question(question_id)
                    )`
                )
                console.log('Table mesure_controle created successfully');
            } catch (error) {
                console.log('Error creating table mesure_controle: ', error);
            }

            try {
                await this.db.execAsync(`DELETE FROM reponse`);
                await this.db.execAsync(`DELETE FROM toko5`);
                await this.db.execAsync(`DELETE FROM question`);
                await this.db.execAsync(`DELETE FROM mesure_controle`);
                await this.db.execAsync(`DELETE FROM commentaire`);
                await this.db.runAsync(
                    `INSERT INTO question (nom, pictogramme, categorie, required) VALUES 
                        ('alcool','alcohol', 'think', 1),
                        ('competence', 'competency', 'think', 1),
                        ('formation', 'formation', 'think', 1),
                        ('materiel', 'materiel', 'think', 1),
                        ('nombre de travailleurs', 'people', 'think', 1),

                        
                        ('swp',  'swp', 'organise', 1),
                        ('ast', 'ast', 'organise', 1),
                        ('permis de travail', 'workpermit', 'organise', 1),
                        ('attention eboulement', 'falling-rock', 'organise', 0),
                        ('pelle', 'pelle', 'organise', 0),
                        ('attention feu', 'fire_warning', 'organise', 0),
                        ('test1', 'organise22', 'organise', 0),
                        ('test5', 'organise23', 'organise', 0),
                        ('test2', 'organise24', 'organise', 0),
                        ('test3', 'organise211', 'organise', 0),
                        ('test4', 'organiselast', 'organise', 0),



                        ('biohazard', 'biohazard', 'risk', 0),
                        ('electricite', 'electricity', 'risk', 0),
                        ('fatal', 'fatal', 'risk', 0),
                        ('attention risque feu ', 'fire_warning', 'risk', 0),
                        ('attention terrain glissant', 'slippery', 'risk', 0),
                        ('unknown', 'unknown', 'risk', 0),
                        ('attention a la marche', 'watch-steps', 'risk', 0),
                        ('autre', 'other-hazard', 'risk', 0),


                        ('antibruit', 'antibruit', 'epi', 0),
                        ('verre de protection du visage', 'face-protection', 'epi', 0),
                        ('gant', 'gant', 'epi', 0),
                        ('gilet', 'gilet', 'epi', 0),
                        ('gilet2', 'gilet2', 'epi', 0),
                        ('lunettes', 'glass2', 'epi', 0),
                        ('casque', 'helmet', 'epi', 0),
                        ('cache-bouche', 'mask2', 'epi', 0),
                        ('chaussures de protection', 'shoes', 'epi', 0),
                        ('uniforme', 'uniform', 'epi', 0),


                        ('Est-ce que je suis en bonne condition pour faire ce travail?',null , 'safety', 1),
                        ('Est-ce que je suis en securite pour realiser la tache?',null , 'safety', 1),
                        ('Executer la tache en toute securite',null , 'safety', 1)
                    `
                )
                console.log('insert inside table question successfully');
            } catch (error) {
                console.log('Error while inserting inside table question : ', error);
            }
        }

    }
    //don't forget to insert inside traduction .. Use that instead of question.nom later


    getDb() {
        if (!this.isInitialized) {
            throw new Error('Database not initialized');
        }
        return this.db;
    }


    async getAllCategorieQuestion(categorie: string) {
        if (this.db !== null) {
            try {
                const listQuestion = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ?', categorie);
                return listQuestion;
            } catch (error) {
                console.log("error getAllCategorieQuestion", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }

    async getAllCategorieQuestionWithRequired(categorie: string, required: boolean) {
        if (this.db !== null) {
            try {
                const listQuestion = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ? AND required = ?', categorie, required);
                //console.log('listQuestion getAllCategorieQuestionWithREquired',listQuestion);
                return listQuestion;
            } catch (error) {
                console.log("error getAllCategorieQuestionWithRequired", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }

    async getAllRequiredOrganise() {
        if (this.db !== null) {
            try {
                const list = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ? and required = true', QUESTION_CATEGORIES.ORGANISE);
                return list;
            } catch (error) {
                console.log("error getAllRequiredOrganise", error);
                throw error;
            }
        } else {
            // console.log("db null")
            // return null
            throw new Error('Database not initialized');
        }
    }

    async getAllNotRequiredOrganise() {
        if (this.db !== null) {
            try {
                const list = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ? and required = false', QUESTION_CATEGORIES.ORGANISE);
                return list;
            } catch (error) {
                console.log("error getAllNotRequiredOrganise", error);
                throw error;
            }
        }
        else {
            // console.log("db null")
            // return null
            throw new Error('Database not initialized')
        }
    }

    async getQuestion(idQuestion: number) {
        if (this.db !== null) {
            try {
                const question = await this.db.getFirstSync('SELECT * FROM question WHERE question_id = ?', idQuestion);
                return question;
            } catch (error) {
                console.log("error getQuestion", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }


    async getAllToko5() {
        if (this.db !== null) {
            try {
                const listToko5 = await this.db.getAllAsync('SELECT * FROM toko5');
                return listToko5;
            } catch (error) {
                console.log("error getAllToko5", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }


    async newToko5(nom: string, prenom: string) {
        if (this.db !== null) {
            try {
                const newUUID: string = uuidv7();
                const dateHeureNow: string = getLocalDateTimeISOString();
                //console.log(dateHeureNow);
                //runAsync or execAsync ???? 
                await this.db.runAsync("INSERT INTO toko5(toko5_id, nom_contractant, prenom_contractant, date_heure) values (?,?,?,?)", newUUID, nom, prenom, dateHeureNow);
                return {
                    toko5Id: newUUID,
                    nomContractant: nom,
                    prenomContractant: prenom,
                    dateHeure: dateHeureNow.split(/[+Z]/)[0],
                    listCommentaire: [],
                    listMesureControle: [],
                    listProblem: []
                };
            } catch (error) {
                console.log("error newToko5", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }

    async insertListReponse(list: any[]) {
        ////why tf does this won't work
        if (this.db !== null) {
            //console.log('list[0] toko5id', list[0].toko5_id);
            for (let elem of list) {
                try {
                    await this.db.runAsync("INSERT OR REPLACE INTO REPONSE(toko5_id, question_id, valeur) VALUES (?,?,?)", elem.toko5_id, elem.question_id, elem.valeur);
                } catch (error) {
                    console.log('error insertListReponse', error);
                }
            }
            try {
                const newEtat = await this.updateValidityToko5(list[0].toko5_id);
                console.log("AFTER INSERT OR REPLACE INTO REPONSE : new etat toko5:", newEtat)
            } catch (error) {
                console.log(error)
            }
            //const test = this.db.getFirstSync("Select * from REPONSE WHERE toko_id = ?", list[0].toko5_id);
            //const test = await this.db.getAllAsync("SELECT * FROM reponse where toko5_id = ?",list[0].toko5_id);
            //console.log('test reponse from database', test);
            //return 'yes';

        } else {
            throw new Error('Database not initialized');
        }
    }


    async updateValidityToko5(toko5Id: string) {
        if (this.db !== null) {
            try {
                const result: any = await this.db.getFirstAsync("SELECT COUNT(*) as count FROM reponse, question WHERE reponse.question_id = question.question_id and question.required = 1 and reponse.toko5_id = ? and reponse.valeur = 0", toko5Id);

                const etat = (result.count == 0) ? 'ongoing' : 'invalide';

                await this.db.runAsync(
                    "UPDATE TOKO5 SET etat = ? WHERE toko5_id = ?",
                    etat, toko5Id
                );

                return etat;
            } catch (error) {
                console.log('error in updateValidityToko5', error);
                throw error;
            }
        } else {
            throw new Error('Database not initiliazed');
        }
    }

    async validateToko5(toko5Id: string) {
        if (this.db !== null) {
            try {
                await this.db.runAsync("UPDATE TOKO5 set etat = 'valide' where toko5_id = ?", toko5Id);
            } catch (error) {
                console.log('error in validateToko5', error);
                throw error;
            }
        } else {
            throw new Error('Database not initiliazed')
        }
    }


    async getAllReponseToko5Categorie(toko5Id: string, categorie: string) {
        if (this.db !== null) {
            try {
                const listReponse = await this.db.getAllAsync('SELECT * FROM reponse,question WHERE (reponse.question_id = question.question_id AND toko5_id = ? AND question.categorie = ?)', toko5Id, categorie);
                //console.log('listReponse in database', listReponse);
                return listReponse;
            } catch (error) {
                console.log("error getAllReponseToko5Categorie", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }

    async getAllReponseToko5CategorieWithRequired(toko5Id: string, categorie: string, required: boolean) {
        if (this.db !== null) {
            try {
                const listReponse = await this.db.getAllAsync('SELECT * FROM reponse,question WHERE (reponse.question_id = question.question_id AND toko5_id = ? AND question.categorie = ? AND question.required = ?)', toko5Id, categorie, required);
                //console.log('listReponse in database', listReponse);
                return listReponse;
            } catch (error) {
                console.log("error getAllReponseToko5CategorieWithRequired", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized')
        }
    }

    async getValidityToko5(toko5Id: string): Promise<boolean> {
        if (this.db !== null) {
            try {
                const validity: any = await this.db.getFirstAsync('SELECT etat FROM TOKO5 where toko5_id = ?', toko5Id);
                if (validity.etat === ETAT.valide || validity.etat === ETAT.ongoing) return true;
                return false;
            } catch (error) {
                console.log("error getValidity", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized')
        }
    }

    async deleteFromToko5(toko5Id: string) {
        if (this.db !== null) {
            await this.db.runAsync('DELETE FROM toko5 where toko5_id = ?', toko5Id);
        } else {
            throw new Error('Database not initialized');
        }
    }

    async deleteFromControlMeasure(toko5Id: string, questionId: number) {
        if (this.db !== null) {
            await this.db.runAsync('DELETE FROM mesure_controle where toko5_id = ? AND question_id = ?', toko5Id, questionId);
        } else {
            throw new Error('Database not initialized');
        }
    }

    async deleteFromControlMeasureById(controlId: string) {
        if (this.db !== null) {
            await this.db.runAsync('DELETE FROM mesure_controle where mesure_controle_id = ?', controlId);
        } else {
            throw new Error('Database not initialized');
        }
    }

    async insertIntoControlMeasure(toko5Id: string, questionId: number, mesure: string, implemented: boolean): Promise<string> {
        if (this.db !== null) {
            const newUUID: string = uuidv7();
            await this.db.runAsync('INSERT INTO mesure_controle(mesure_controle_id, toko5_id, question_id, mesure_prise, implemented) values (?,?,?,?,?)',newUUID, toko5Id, questionId, mesure, implemented);
            console.log('icii');
            return newUUID;
        } else {
            throw new Error('Database not initialized');
        }
    }

    async updateControlMesure(controleMesureId: string, mesure: string, implemented: boolean) {
        if (this.db !== null) {
            await this.db.runAsync('UPDATE mesure_controle set mesure_prise = ?, implemented = ? where mesure_controle_id = ?', mesure, implemented, controleMesureId);
        } else {
            throw new Error('Database not initialized');
        }
    }

    async getAllControlMeasure(toko5Id: string) {
        if (this.db !== null) {
            try {
                const list = await this.db.getAllAsync('SELECT * FROM mesure_controle mc, question q where mc.question_id = q.question_id and mc.toko5_id = ?', toko5Id);
                // console.log('list control measure', list);
                return list;
            } catch (error) {
                console.log("error getAllControlMeasure", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }

    async findToko5ById(toko5Id: string) {
        if (this.db !== null) {
            try {
                const toko5: any = await this.db.getFirstAsync('SELECT * FROM toko5 where toko5_id = ?', toko5Id);
                return {
                    toko5Id: toko5.toko5_id,
                    nomContractant: toko5.nom_contractant,
                    prenomContractant: toko5.prenom_contractant,
                    dateHeure: toko5.date_heure.split(/[+Z]/)[0],
                    etat: toko5.etat,
                    listMesureControle: [],
                    listCommentaire: [],
                    listProblem: []
                };
            } catch (error) {
                console.log("error findToko5ById", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }

    async findQuestionById(questionId: number) {
        if (this.db !== null) {
            try {
                const question: any = await this.db.getFirstAsync('SELECT * FROM question where question_id = ?', questionId);
                return question;
            } catch (error) {
                console.log("error findQuestionById", error);
                throw error;
            }
        } else {
            throw new Error('Database not initialized');
        }
    }


    async updateToko5Saved(toko5Id: string, saved: boolean) {
        if (this.db !== null) {
            await this.db.runAsync('UPDATE toko5 set saved = ? where toko5_id = ?', saved, toko5Id);
        } else {
            throw new Error('Database not initialized');
        }
    }












}

export default Toko5Repository;