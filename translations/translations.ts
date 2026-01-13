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
    navigationButton: {
      previous: "précédent",
      next: "suivant",
      home: "accueil"
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
      delete: "Voulez-vous vraiment supprimer ce  TAKE 5?", //(supprimer le take 5 ne le supprimera pour de la base données de l'HSE)
      single: "Take 5 de"
    },
    identification: { 
      description1: "Veuillez vous identifier",
      description2: "pour continuer",
      nom: "Nom",
      prenom: "Prénom",
      email: "Email",
      phone: "Téléphone",
      societe: "Société",
      task: "Tâche",
      nomLabel: "Votre nom",
      permis: "ID permis de travail",
      prenomLabel: "Votre prenom",
      societeLabel: "Sélectionner la société",
      taskLabel: "Sélectionner la tâche",
      enter: "s'identifier",
      refreshData: "Actualiser les données"
    },


    think:{
      description: "Prenez un moment pour évaluer votre état et vos moyens. Soyez honnête avec vous-même",
    },
    alcool: {
      nom: "Alcool / Drogues / Sommeil",
      description: "Etes-vous sous l'influence de l'alcool, de drogues ou de médicaments pouvant affecter votre vigilance ou votre capacité à travailler en toute sécurité? Avez-vous suffisamment dormi?"
    },
    formation: {
      nom: "Formation",
      description: "Êtes-vous formé pour effectuer cette tâche en toute sécurité? Avez-vous reçu une formation spécifique pour l'équipement ou les outils que vous allez utiliser?"
    },
    competence: {
      nom: "Compétence",
      description: "Avez-vous les compétences nécessaires pour effectuer cette tâche en toute sécurité?"
    },
    materiel: {
      nom: "Matériel",
      description: "Avez-vous le(s) matériel(s) nécessaire(s) pour effectuer cette tâche en toute sécurité?"
    },
    nombreTravailleurs: {
      nom: "Nombre de travailleurs",
      description: "Y a-t-il un nombre suffisant de travailleurs pour exécuter cette tâche?"
    },


    organise1: {
      description: "Veuillez verifier que toutes les autorisations, procédures et plans nécessaires sont en place et compris avant le démarrage des travaux."
    },
    swp:{
      nom: "SWP",
      description: "Avez-vous un SWP (Safe Work Procedure) pour cette tâche?"
    },
    ast:{
      nom: "AST",
      description: "Avez-vous une AST (Analyse de Sécurité de Tâche) pour cette tâche?"
    },
    permis:{
      nom: "Permis de travail",
      description: "Avez-vous un permis de travail pour cette tâche?"
    },


    bonneCondition: {
      nom: "Bonne condition",
      description: "Est-ce que je suis en bonne condition pour faire ce travail?"
    },
    securite: {
      nom: "Sécurité",
      description: "Est-ce que je suis en securite pour realiser la tache?"
    },
    executerTache: {
      nom: "Exécuter la tâche en toute sécurité",
      description: "Exécuter la tâche en toute sécurité"
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
    navigationButton: {
      previous: "previous",
      next: "next",
      home: "home"
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
      delete: "Do you really wanna delete this TAKE 5?",
      single: "Take 5 of"
    },
    identification: { 
      description1: "Please identify yourself ",
      description2: "to continue",
      nom: "Last Name",
      prenom: "First Name",
      email: "Email",
      phone: "Phone number",
      societe: "Company",
      task: "Task",
      permis: "Work permit ID",
      nomLabel: "Your last name",
      prenomLabel: "Your first name",
      societeLabel: "Select the company",
      taskLabel: "Select the task",
      enter: "identify yourself",
      refreshData: "Refresh data"
    },
    think:{
      description: "Take a moment to assess your condition and resources. Be honest with yourself"
    },
    alcool: {
      nom: "Alcohol / Drugs / Sleep",
      description: "Are you under the influence of alcohol, drugs or medication that may affect your alertness or ability to work safely? Have you had enough sleep?"
    },
    formation: {
      nom: "Training",
      description: "Are you trained to perform this task safely? Have you received specific training for the equipment or tools you are going to use?"
    },
    competence: {
      nom: "Competence",
      description: "Do you have the necessary skills to perform this task safely?"
    },
    materiel: {
      nom: "Material",
      description: "Do you have the necessary material(s) to perform this task safely?"
    },
    nombreTravailleurs: {
      nom: "Number of workers",
      description: "Is there a sufficient number of workers to execute this task?"
    },

    organise1: {
      description: "Please ensure that all necessary permits, procedures and plans are in place and understood before starting work."
    },
    swp:{
      nom: "SWP",
      description: "Do you have a SWP (Safe Work Procedure) for this task?"
    },
    ast:{
      nom: "AST",
      description: "Do you have an AST (Task Safety Analysis) for this task?"
    },
    permis:{
      nom: "Work permit",
      description: "Do you have a work permit for this task?"
    },


    bonneCondition: {
      nom: "Good condition",
      description: "Am I in good condition to do this job?"
    },
    securite: {
      nom: "Safety",
      description: "Am I safe to perform the task?"
    },
    executerTache: {
      nom: "Execute the task safely",
      description: "Execute the task safely"
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
    navigationButton: {
      previous: "miemotra",
      next: "manaraka",
      home: "Accueil"
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
      delete: "Tena fafana TAKEa ve io TAKE 5 io?",
      single: "Take 5 an'i"
    },
    identification: { 
      description1: "Fenoy ireo",
      description2: "hahamantarana anao",
      nom: "Anarana",
      prenom: "Fanampin'anarana",
      email: "mailaka",
      phone: "Laharana finday",
      societe: "Orinasa",
      task: "Asa ho atao",
      permis: "ID Fahazoan-dalana miasa",
      nomLabel: "Anarana",
      prenomLabel: "Fanampin'anarana",
      societeLabel: "orinasa iasana",
      taskLabel: "Asa ho atao",
      enter: "s'identifer",
      refreshData: "Actualiser les données"
    },
    think:{
      description: "Mandania fotoana kely hijerena ny tenanao. Mahaiza mamantatra ny tenanao"
    },
    alcool: {
      nom: "Alikaola / Zava-mahadomelina / Torimaso",
      description: "Nandray toaka, zava-mahadomelina na fanafody mety misy fiantraikany amin'ny fahamailoanao ve ianao? Ampy torimaso ve ianao?"
    },
    formation: {
      nom: "Fiofanana",
      description: "Efa voaofana hanao ity asa ity ve ianao? Efa nahazo fiofanana manokana momba ny fitaovana hampiasainao ve ianao?"
    },
    competence: {
      nom: "Fahaizana",
      description: "Manana ny fahaiza-manao ilaina hanaovana ity asa ity ve ianao?"
    },
    materiel: {
      nom: "Fitaovana",
      description: "Manana ny fitaovana rehetra ilaina hanaovana ity asa ity ve ianao?"
    },
    nombreTravailleurs: {
      nom: "Isan'ny mpiasa",
      description: "Ampy tsara ve ny isan'ny mpiasa hanantanteraka an'io asa io?"
    },

    
    organise1: {
      description: "Hamarino tsara fa efa vonona sy takatra avokoa ny fahazoan-dalana, ny fomba fiasa ary ny drafitra rehetra ilaina alohan'ny hanombohana ny asa."
    },
    swp:{
      nom: "SWP",
      description: "Manana SWP (Safe Work Procedure) ho an'ity asa ity ve ianao?"
    },
    ast:{
      nom: "AST",
      description: "Manana AST (Task Safety Analysis) ho an'ity asa ity ve ianao?"
    },
    permis:{
      nom: "Permis de travail",
      description: "Manana permis de travail ho an'ity asa ity ve ianao?"
    },

    bonneCondition: {
      nom: "Bonne condition",
      description: "Est-ce que je suis en bonne condition pour faire ce travail?"
    },
    securite: {
      nom: "Sécurité",
      description: "Est-ce que je suis en securite pour realiser la tache?"
    },
    executerTache: {
      nom: "Exécuter la tâche en toute sécurité",
      description: "Exécuter la tâche en toute sécurité"
    }
  }
} as const;