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
          etat TEXT NOT NULL DEFAULT 'ongoing', CHECK (etat in ('valide','invalide','ongoing')),
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
          question_id INT AUTO_INCREMENT PRIMARY KEY,
          nom TEXT NOT NULL UNIQUE,
          description TEXT,
          pictogramme TEXT,
          required INT NOT NULL DEFAULT 0, CHECK (required in (0,1)),
          is_risk_question INT NOT NULL DEFAULT 0, CHECK (is_risk_questoin in (0,1))
          categorie TEXT NOT NULL, CHECK (categorie in ("think","organise","risk","epi","safety"))
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
          reponse_id INT AUTO_INCREMENT PRIMARY KEY,
          toko5_id TEXT NOT NULL,
          question_id INT NOT NULL,
          valeur INT, CHECK (valeur in 0,1),
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
          commentaire_id INT AUTO_INCREMENT PRIMARY KEY,
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
          mesure_controle_id INT AUTO_INCREMENT PRIMARY KEY,
          toko5_id TEXT NOT NULL,
          question_id INT NOT NULL,
          mesure_prise TEXT NOT NULL,
          implemented INT DEFAULT 0, CHECK (implemented in (0,1)),
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
        `INSERT INTO question (nom, description, pictogramme, categorie, required) VALUES 
            ('alcool', 'description',' alcohol', 'think', 1),
            ('competence', 'description', 'competency', 'think', 1),
            ('formation', 'description', 'formation', 'think', 1),
            ('materiel', 'description', 'materiel', 'think', 1),
            ('nombre de travailleurs', 'description', 'people', 'think', 1),

            
            ('swp', 'description', 'swp', 'organise', 1),
            ('ast', 'description', 'document', 'organise', 1),
            ('permis de travail', 'description', 'workpermit', 'organise', 1),
            ('attention eboulement', 'description', 'falling-rock', 'organise', 0),
            ('pelle', 'description', 'pelle', 'organise', 0),
            ('attention feu', 'description', 'fire_warning', 'organise', 0),


            ('biohazard', 'description', 'biohazard', 'hazard', 0),
            ('electricite', 'description', 'electricity', 'hazard', 0),
            ('fatal', 'description', 'fatal', 'hazard', 0),
            ('attention feu', 'description', 'fire_warning', 'hazard', 0),
            ('attention terrain glissant', 'description', 'slippery', 'hazard', 0),
            ('unknown', 'description', 'unknown', 'hazard', 0),
            ('attention a la marche', 'description', 'watch-steps', 'hazard', 0),
            ('autre', 'description', 'other-hazard', 'hazard', 0),


            ('antibruit', 'description', 'antibruit', 'epi', 0),
            ('verre de protection du visage', 'description', 'face-protection', 'epi', 0),
            ('gant', 'description', 'gant', 'epi', 0),
            ('gilet', 'description', 'gilet', 'epi', 0),
            ('gilet', 'description', 'gilet2', 'epi', 0),
            ('lunettes', 'description', 'glass2', 'epi', 0),
            ('casque', 'description', 'helmet', 'epi', 0),
            ('cache-bouche', 'description', 'mask2', 'epi', 0),
            ('chaussures de protection', 'description', 'shoes', 'epi', 0),
            ('uniforme', 'description', 'uniform', 'epi', 0),


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

    });
  });
};