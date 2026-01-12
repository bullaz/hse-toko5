export type LanguageCode = 'fr' | 'en' | 'mg';

export const translations = {
  fr: {
    home: {
      title: "TAKE 5",
      worker: "INTERVENANT",
      supervisor: "SUPERVISEUR",
      selectLanguage: "Sélectionnez une langue"
    },
    common: {
      appName: "TAKE 5",
      language: 'français',
      french: "Français",
      english: "Anglais",
      malagasy: "Malagasy",
      cancel: "Annuler",
      save: "Sauvegarder",
      yes: "oui",
      no: "non"
    },
    screenTitles: {
      home: "TAKE 5",
      recent: "TAKE 5 RÉCENT(S)",
      invalide: "TAKE 5 INVALIDE",
      scanQr: "SCANNER UN TAKE 5",
      login: "IDENTIFICATION",
      think: "PENSER",
      singlePicto: "Description du pictogramme",
      organise: "ORGANISER",
      identifyRisks: "IDENTIFIER LES DANGERS",
      controlMeasure: "PRENDRE DES MESURES",
      epi: "EPI / PPE",
      fitness: "MON ÉTAT",
      commentaire: "COMMENTAIRES",
      listProblem: "INFORMATIONS"
    },
    recent:{
      empty: "Vous n'avez pas de TAKE 5",
      pressButtonNewEmpty: "Veuillez presser le bouton en dessous pour en initier un!",
      pressButtonNew: "Veuillez presser le bouton en dessous pour initier un nouveau TAKE 5 !",
      delete: "Voulez-vous vraiment supprimer ce  TAKE 5?"
    },
    identification: { 
      nom: "Votre nom",
      prenom: "Votre prenom",
      societe: "Sélectionner la société",
      task: "Sélectionner la tâche",
      enter: "s'identifier"
    }
  },
  en: {
    home: {
      title: "TAKE 5",
      worker: "WORKER",
      supervisor: "SUPERVISOR",
      selectLanguage: "Select a language",
    },
    common: {
      appName: "TAKE 5",
      language: 'english',
      french: "French",
      english: "English",
      malagasy: "Malagasy",
      cancel: "Cancel",
      save: "Save",
      yes: "yes",
      no: "no"
    },
     screenTitles: {
      home: "TAKE 5",
      recent: "RECENT TAKE 5",
      invalide: "TAKE 5 INVALID",
      scanQr: "SCAN A TAKE 5",
      login: "IDENTIFICATION",
      think: "THINK",
      singlePicto: "Pictogram description",
      organise: "ORGANIZE",
      identifyRisks: "IDENTIFY RISKS",
      controlMeasure: "TAKE MEASURES",
      epi: "PPE / EPP",
      fitness: "MY CONDITION",
      commentaire: "COMMENTS",
      listProblem: "TAKE 5 INFORMATION"
    },
    recent:{
      empty: "You don't have any TAKE 5 yet",
      pressButtonNewEmpty: "Please press the button below to initiate one!",
      pressButtonNew: "Please press the button below to initiate a new TAKE 5 !",
      delete: "Do you really wanna delete this TAKE 5?"
    },
    identification: { 
      nom: "Your lastname",
      prenom: "Your firstname",
      societe: "Select the company",
      task: "Select the task",
      enter: "identify yourself"
    }
  },
  mg: {
    home: {
      title: "TAKE 5",
      tagline: "Protège / Miaro / Protect",
      worker: "MPIASA",
      supervisor: "MPANARAMASO",
      selectLanguage: "Fidio ny fiteny"
    },
    common: {
      appName: "TAKE 5",
      language: 'malagasy',
      french: "Frantsay",
      english: "Anglisy",
      malagasy: "Malagasy",
      cancel: "Afoana",
      save: "Tehirizo",
      yes: "eny",
      no: "tsia"
    },
    screenTitles: {
      home: "TAKE 5",
      recent: "TAKE 5 VAOVAO",
      invalide: "TAKE 5 TSY MANANKERY",
      scanQr: "MANAO SCAN TAKE 5",
      login: "FANAMARINANA",
      think: "DINIHO",
      singlePicto: "FANAZAVANA PIKTOGRAMY",
      organise: "MANDAMINA",
      identifyRisks: "MAMANTATRA LOZA",
      controlMeasure: "FISOROHANA LOZA",
      epi: "EPI / PPE",
      fitness: "MIJERY NY TENAKO",
      commentaire: "FANEHOAN-KEVITRA",
      listProblem: "TAKE 5"
    },
    recent:{
      empty: "Tsy manana TAKE 5 ianao",
      pressButtonNewEmpty: "Tsindrio io ambany io raha te hanomboka",
      pressButtonNew: "Tsindira io ambany io raha te hanomboka TAKE 5 vaovao!",
      delete: "Tena fafana TAKEa ve io TAKE 5 io?"
    },
    identification: { 
      nom: "Anarana",
      prenom: "Fanampin'anarana",
      societe: "orinasa iasana",
      task: "Asa ho atao",
      enter: "s'identifer"
    }
  }
} as const;