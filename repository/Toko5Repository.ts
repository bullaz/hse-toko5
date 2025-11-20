//import SQLite, { SQLiteDatabase } from 'expo-sqlite';


//********************************* VERIFY CONNECTION OPENING AND CLOSING */

import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';
import { QUESTION_CATEGORIES } from '../constants/questionTypes';

class Toko5Repository {
    private db: SQLiteDatabase | null;
    isInitialized: boolean = false;

    constructor() {
        this.db = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            this.db = await SQLite.openDatabaseAsync('toko5DB')
            await this.createTables()
        } catch (error) {
            console.log('Error when opening the database: ', error)
        }
    }

    async createTables() {
        //try using transaction
        if (this.db !== null) {
            try {

                await this.db.execAsync(
                    `CREATE TABLE IF NOT EXISTS toko5 (
                        toko5_id TEXT PRIMARY KEY,
                        nom_contractant TEXT NOT NULL,
                        prenom_contractant TEXT NOT NULL,
                        date_heure TEXT NOT NULL,
                        etat TEXT NOT NULL DEFAULT 'ongoing' CHECK (etat in ('valide','invalide','ongoing'))
                    )`
                )
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
                        reponse_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        toko5_id TEXT NOT NULL,
                        question_id INTEGER NOT NULL,
                        valeur INTEGER CHECK (valeur in (0,1)),
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
                        commentaire_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
                        mesure_controle_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
                await this.db.execAsync(`DELETE FROM question`);
                await this.db.runAsync(
                    `INSERT INTO question (nom, pictogramme, categorie, required) VALUES 
                        ('alcool','alcohol', 'think', 1),
                        ('competence', 'competency', 'think', 1),
                        ('formation', 'formation', 'think', 1),
                        ('materiel', 'materiel', 'think', 1),
                        ('nombre de travailleurs', 'people', 'think', 1),

                        
                        ('swp',  'swp', 'organise', 1),
                        ('ast', 'document', 'organise', 1),
                        ('permis de travail', 'workpermit', 'organise', 1),
                        ('attention eboulement', 'falling-rock', 'organise', 0),
                        ('pelle', 'pelle', 'organise', 0),
                        ('attention feu', 'fire_warning', 'organise', 0),


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


                        ('safety1', 'Est-ce que je suis en bonne condition pour faire ce travail?', 'safety', 1),
                        ('safety2', 'Est-ce aue je suis en securite pour realiser la tache?', 'safety', 1),
                        ('safety3', 'Ececuter la tache en toute securite', 'safety', 1)
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
                const listThinkQuestion = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ?', categorie);
                return listThinkQuestion;
            } catch (error) {
                console.log("error getAllThinkQuestion",error)
            }
        }
        console.log("db null")
        return null
    }

    async getAllRequiredOrganise() {
        if (this.db !== null) {
            try {
                const list = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ? and required = true',QUESTION_CATEGORIES.ORGANISE);
                return list;
            } catch (error) {
                console.log("error getAllRequiredOrganise",error)
            }
        }
        console.log("db null")
        return null
    }

    async getAllNotRequiredOrganise() {
        if (this.db !== null) {
            try {
                const list = await this.db.getAllAsync('SELECT * FROM question WHERE categorie = ? and required = false',QUESTION_CATEGORIES.ORGANISE);
                return list;
            } catch (error) {
                console.log("error getAllNotRequiredOrganise",error)
            }
        }
        console.log("db null")
        return null
    }











}

export default Toko5Repository;