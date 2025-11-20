import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
const db = SQLite.openDatabase(
    {
        name: 'Toko5DB',
        location: 'default',
    },
    () => console.log('Database opened successfully'),
    error => console.log('Error when opening the database: ',error)
);

export const initDatabase = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      
        tx.executeSql(
        `CREATE TABLE IF NOT EXISTS toko5 (
          toko5_id TEXT PRIMARY KEY,
          nom_contractant TEXT NOT NULL,
          prenom_contractant TEXT NOT NULL,
          date_heure TEXT NOT NULL,
          etat TEXT NOT NULL DEFAULT 'ongoing' CHECK (etat in ('valide','invalide','ongoing'))
        )`,
        [],
        () => {
          console.log('Table toko5 created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating table toko5: ', error);
          reject(error);
        }
      );


      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS question (
          question_id INT PRIMARY KEY AUTOINCREMENT,
          nom TEXT NOT NULL UNIQUE,
          pictogramme TEXT,
          required INT NOT NULL DEFAULT 0 CHECK (required in (0,1)),
          categorie TEXT NOT NULL CHECK (categorie in ("think","organise","risk","epi","safety"))
        )`,
        [],
        () => {
          console.log('Table question created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating table question: ', error);
          reject(error);
        }
      );


      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS traduction (
          traduction_id INT PRIMARY KEY AUTOINCREMENT,
          question_id INT NOT NULL,
          nom TEXT NOT NULL UNIQUE,
          description TEXT,
          code_langue TEXT,
          FOREIGN_KEY question_id REFERENCES question(question_id)
        )`,
        [],
        () => {
          console.log('Table question created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating table question: ', error);
          reject(error);
        }
      );


      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS reponse (
          reponse_id INT PRIMARY KEY AUTOINCREMENT,
          toko5_id TEXT NOT NULL,
          question_id INT NOT NULL,
          valeur INT CHECK (valeur in 0,1),
          FOREIGN KEY (toko5_id) REFERENCES toko5(toko5_id),
          FOREIGN KEY (question_id) REFERENCES question(question_id)
        )`,
        [],
        () => {
          console.log('Table reponse created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating table reponse: ', error);
          reject(error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS commentaire (
          commentaire_id INT PRIMARY KEY AUTOINCREMENT,
          toko5_id TEXT NOT NULL,
          nom TEXT NOT NULL,
          prenom TEXT NOT NULL,
          commentaire TEXT UNIQUE NOT NULL,
          FOREIGN KEY (toko5_id) REFERENCES toko5(toko5_id)
        )`,
        [],
        () => {
          console.log('Table commentaire created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating table commentaire: ', error);
          reject(error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS mesure_controle (
          mesure_controle_id INT PRIMARY KEY AUTOINCREMENT,
          toko5_id TEXT NOT NULL,
          question_id INT NOT NULL,
          mesure_prise TEXT NOT NULL,
          implemented INT DEFAULT 0 CHECK (implemented in (0,1)),
          FOREIGN KEY (toko5_id) REFERENCES toko5(toko5_id),
          FOREIGN KEY (question_id) REFERENCES question(question_id)
        )`,
        [],
        () => {
          console.log('Table mesure_controle created successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error creating table mesure_controle: ', error);
          reject(error);
        }
      );

      tx.executeSql(
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


            ('biohazard', 'biohazard', 'hazard', 0),
            ('electricite', 'electricity', 'hazard', 0),
            ('fatal', 'fatal', 'hazard', 0),
            ('attention feu', 'fire_warning', 'hazard', 0),
            ('attention terrain glissant', 'slippery', 'hazard', 0),
            ('unknown', 'unknown', 'hazard', 0),
            ('attention a la marche', 'watch-steps', 'hazard', 0),
            ('autre', 'other-hazard', 'hazard', 0),


            ('antibruit', 'antibruit', 'epi', 0),
            ('verre de protection du visage', 'face-protection', 'epi', 0),
            ('gant', 'gant', 'epi', 0),
            ('gilet', 'gilet', 'epi', 0),
            ('gilet', 'gilet2', 'epi', 0),
            ('lunettes', 'glass2', 'epi', 0),
            ('casque', 'helmet', 'epi', 0),
            ('cache-bouche', 'mask2', 'epi', 0),
            ('chaussures de protection', 'shoes', 'epi', 0),
            ('uniforme', 'uniform', 'epi', 0),


            ('safety1', 'Est-ce que je suis en bonne condition pour faire ce travail?', NULL, 'safety', 1),
            ('safety2', 'Est-ce aue je suis en securite pour realiser la tache?', NULL, 'safety', 1),
            ('safety3', 'Ececuter la tache en toute securite', NULL, 'safety', 1),
        `,
        [],
        () => {
          console.log('insert inside table question successfully');
          resolve();
        },
        (_, error) => {
          console.log('Error while inserting in table question: ', error);
          reject(error);
        }
      );

      //don't forget to insert inside traduction .. Use that instead of question.nom later

    });
  });
};

export default db;