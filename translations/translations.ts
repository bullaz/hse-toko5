export type LanguageCode = 'fr' | 'en' | 'mg';

export const translations = {
  fr: {
    home: {
      title: "TOKO 5",
      worker: "INTERVENANT",
      supervisor: "SUPERVISEUR",
      selectLanguage: "Sélectionnez une langue"
    },
    common: {
      appName: "TOKO 5",
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
      home: "TOKO 5",
      recent: "TOKO 5 RÉCENT(S)",
      invalide: "TOKO 5 INVALIDE",
      scanQr: "SCANNER UN TOKO 5",
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
      empty: "Vous n'avez pas de Toko 5",
      pressButtonNewEmpty: "Veuillez presser le bouton en dessous pour en initier un!",
      pressButtonNew: "Veuillez presser le bouton en dessous pour initier un nouveau TOKO 5 !",
      delete: "Voulez-vous vraiment supprimer ce  TOKO 5?"
    }
  },
  en: {
    home: {
      title: "TOKO 5",
      worker: "WORKER",
      supervisor: "SUPERVISOR",
      selectLanguage: "Select a language",
    },
    common: {
      appName: "TOKO 5",
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
      home: "TOKO 5",
      recent: "RECENT TOKO 5",
      invalide: "TOKO 5 INVALID",
      scanQr: "SCAN A TOKO 5",
      login: "IDENTIFICATION",
      think: "THINK",
      singlePicto: "Pictogram description",
      organise: "ORGANIZE",
      identifyRisks: "IDENTIFY RISKS",
      controlMeasure: "TAKE MEASURES",
      epi: "PPE / EPP",
      fitness: "MY CONDITION",
      commentaire: "COMMENTS",
      listProblem: "TOKO 5 INFORMATION"
    },
    recent:{
      empty: "You don't have any Toko 5 yet",
      pressButtonNewEmpty: "Please press the button below to initiate one!",
      pressButtonNew: "Please press the button below to initiate a new TOKO 5 !",
      delete: "Do you really wanna delete this Toko 5?"
    }
  },
  mg: {
    home: {
      title: "TOKO 5",
      tagline: "Protège / Miaro / Protect",
      worker: "MPIASA",
      supervisor: "MPANARAMASO",
      selectLanguage: "Fidio ny fiteny"
    },
    common: {
      appName: "TOKO 5",
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
      home: "TOKO 5",
      recent: "TOKO 5 VAOVAO",
      invalide: "TOKO 5 TSY MANANKERY",
      scanQr: "MANAO SCAN TOKO 5",
      login: "FANAMARINANA",
      think: "MISALY",
      singlePicto: "FAMINTINANA PIKTOGRAMY",
      organise: "MANDAMINA",
      identifyRisks: "MAMANTATRA LOZA",
      controlMeasure: "MANAO FANDRINITRA",
      epi: "FIAROVANA / EPP",
      fitness: "NY TOETRAKO",
      commentaire: "HEVITRA",
      listProblem: "FANAZAVANA TOKO 5"
    },
    recent:{
      empty: "Tsy manana toko 5 ianao",
      pressButtonNewEmpty: "Tsindrio io ambany io raha te hanomboka",
      pressButtonNew: "Tsindira io ambany io raha te hanomboka Toko 5 vaovao!",
      delete: "Tena fafana tokoa ve io TOKO 5 io?"
    }
  }
} as const;