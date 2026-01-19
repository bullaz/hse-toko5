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

    scanQr: {
      description: "Positionnez le code QR dans le cadre",
      valide: "Ce take 5 est valide",
      invalide: "Ce take 5 est invalide",
      ongoing: "Ce take 5 est en cours",
      commenter: "commenter",
      more: "plus de details"
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
      controlMeasure: "MESURES DE CONTRÔLE",
      epi: "EPI / PPE",
      fitness: "MON ÉTAT",
      commentaire: "COMMENTAIRES",
      listProblem: "Take 5 de ..."
    },
    recent: {
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
      poste: "Poste",
      posteLabel: "votre poste",
      nomLabel: "Votre nom",
      permis: "ID permis de travail",
      prenomLabel: "Votre prenom",
      societeLabel: "Sélectionner la société",
      taskLabel: "Sélectionner la tâche",
      enter: "s'identifier",
      refreshData: "Actualiser les données"
    },


    think: {
      description: "Prenez un moment pour évaluer votre état et vos moyens. Soyez honnête avec vous-même",
    },
    alcool: {
      nom: "Sobre et alerte",
      description: "Confirmez-vous n'être sous aucune influence d'alcool, de drogues ou de médicaments pouvant affecter votre vigilance ou votre capacité à travailler en toute sécurité? Avez-vous suffisamment dormi?"
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
    swp: {
      nom: "SWP",
      description: "Avez-vous un SWP (Safe Work Procedure) pour cette tâche?"
    },
    ast: {
      nom: "AST",
      description: "Avez-vous une AST (Analyse de Sécurité de Tâche) pour cette tâche?"
    },
    permis: {
      nom: "Permis de travail",
      description: "Avez-vous un permis de travail pour cette tâche?"
    },



    organise2: {
      description: "Organisez votre espace de travail. Regardez autour de vous. Quels sont les dangers à proximité?" //Organise your workspace. Look around you. What hazards are nearby?
    },
    pressureExplosion: {
      nom: "Pression / Explosion",
      description: "Avez-vous identifié tous les systèmes sous pression ou les matières explosives susceptibles de provoquer des projections de débris pour cette tâche?"
    },
    confinedSpace: {
      nom: "Espace confiné",
      description: "Avez-vous identifié des zones d'accès restreint, ou des fosses nécessitant un permis d'entrée spécifique pour cette tâche?"
    },
    fall: {
      nom: "Chute de hauteur",
      description: "Travaillez-vous à proximité d'un rebord non protégé ou à une hauteur où un équipement antichute est nécessaire?"
    },
    suspendedLoad: {
      nom: "Charges suspendues",
      description: "Avez-vous vérifié l'absence d'activité de pont roulant et vous êtes-vous assuré d'être hors de la zone de chute pour cette tâche?"
    },
    fire: {
      nom: "Substances inflammables",
      description: "Avez-vous identifié des risques d'incendie et vous êtes-vous assuré que toutes les sources d'inflammation sont maîtrisées pour cette tâche?"
    },
    eboulement: {
      nom: "Risque d'éboulement / Terrain instable",
      description: "Avez-vous évalué le talus en amont pour déceler les risques d'éboulement ou de débris instables susceptibles de se déplacer lors de cette tâche?"
    },
    embankment: {
      nom: "embankment",
      description: "Travaillez-vous près d'un quai, d'eaux profondes ou d'un ravin abrupt où il existe un risque de chute?"
    },
    pelle: {
      nom: "Active Work Zone",
      description: "Active Work Zone"
    },




    identifyRisks: {
      description: "Identifiez les dangers et risques spécifiques liés à votre tâche et votre environnement",
      controlMeasure: "Mes mesures de contrôle"
    },
    biohazard: {
      nom: "Risque biologique, chimique",
      description: "Y a-t-il des risques biologiques ou chimiques associés à cette tâche?"
    },
    electricite: {
      nom: "Électricité",
      description: "Puis-je entrer en contact avec des composants électriques sous tension pendant cette tâche?"
    },
    fatal: {
      nom: "Risque mortel",
      description: "Y a-t-il des risques mortels associés à cette tâche?"
    },
    risqueFeu: {
      nom: "Risque d'incendie / explosion / feu",
      description: "Y a-t-il des risques d'incendie, d'explosion ou de feu associés à cette tâche?"
    },
    terrainGlissant: {
      nom: "Terrain glissant / instable",
      description: "Y a-t-il des risques de terrain glissant ou instable associés à cette tâche?"
    },
    attentionMarche: {
      nom: "trébuchement",
      description: "Y a-t-il des risques de trébuchement associés à cette tâche?"
    },
    autre: {
      nom: "Autre",
      description: "Y a-t-il d'autres risques que ceux cités associés à cette tâche?"
    },
    unknown: {
      nom: "Risque d'asphyxie / manque d'oxygène",
      description: "Y a-t-il des risques d'asphyxie ou de manque d'oxygène associés à cette tâche?"
    },


    controlMeasure: {
      danger: "danger",
      mesures: "mesures",
      implemented: "en place",
      delete: "supprimer",
      deleteText: "Voulez-vous vraiment supprimer cette mesure de controle?",
      valider: "valider",
      mesureToTake: "mesure à prendre",
      addDescription1: " Pour ajouter une nouvelle mesure de contrôle pour d'autres dangers",
      addDescription2: " appuyez sur le bouton '+' en dessous",
    },


    epi: {
      description: "Assurez-vous que chaque équipement requis est disponible, en bon état, adapté à la tâche et que vous savez correctement l'utiliser. Portez-le systématiquement."
    },
    antibruit: {
      nom: "Protection antibruit",
      description: "Avez-vous la protection antibruit requise pour cette tâche?"
    },
    faceProtection: {
      nom: "Verre de protection du visage",
      description: "Avez-vous les verres de protection du visage requis pour cette tâche?"
    },
    gant: {
      nom: "Gants de protection",
      description: "Avez-vous les gants de protection requis pour cette tâche?"
    },
    gilet: {
      nom: "gilet haute visibilité",
      description: "Avez-vous le gilet haute visibilité requis pour cette tâche?"
    },
    gilet2: {
      nom: "Gilet de sauvetage",
      description: "Avez-vous le gilet de sauvetage requis pour cette tâche?"
    },
    lunettes: {
      nom: "Lunettes de sécurité",
      description: "Avez-vous les lunettes de sécurité requises pour cette tâche?"
    },
    chaussuresProtection: {
      nom: "Chaussures de protection",
      description: "Avez-vous les chaussures de protection requises pour cette tâche?"
    },
    uniforme: {
      nom: "Vetements de protection",
      description: "Avez-vous les vêtements de protection requis pour cette tâche?"
    },


    fitness: {
      merci: "Merci d'avoir pris le temps de finir votre toko 5 !!!",
      backHome: "revenir a l'accueil",
      finish: "J'ai fini mon toko5"
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
    },


    singleTake5: {
      mesures: "Mesures",
      commentaires: "Commentaires",
      commentPlaceholder: "Écrivez votre commentaire ici...",
      problems: "Problèmes",
      mesureLabel: "Mesures de Contrôle",
      implemented: "Implémentée",
      notImplemented: "En attente",
      risk: "Danger/risque",
      noComment: "Aucun commentaire pour le moment",
      comment: "commenter",
      ok: "Ce toko 5 est ok",
      resolve: "problèmes resolus",
      resolveText: "Voulez-vous vraiment laisser le contractant continuer son toko 5?",
      enCours: "En cours",
      valide: "Valide",
      invalide: "Invalide",
      unknown: "Inconnu"
    },

    invalide: {
      invalide: "Votre Toko 5 est invalide",
      manipError: "En cas d'erreur de manipulation, vous pouvez encore reessayer en appuyant sur le bouton en bas a gauche",
      otherwise: "Sinon",
      talkToSup: "Veuillez parler avec votre supersiveur"
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

    scanQr: {
      description: "Position the QR code in the frame",
      valide: "That take 5 is valid",
      invalide: "That take 5 is not valid",
      ongoing: "That take 5 is in progress",
      commenter: "comment",
      more: "more details"
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
      controlMeasure: "CONTROL MEASURES",
      epi: "PPE / EPP",
      fitness: "MY CONDITION",
      commentaire: "COMMENTS",
      listProblem: "Take 5 of"
    },
    recent: {
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
      poste: "Position",
      posteLabel: "Your position",
      permis: "Work permit ID",
      nomLabel: "Your last name",
      prenomLabel: "Your first name",
      societeLabel: "Select the company",
      taskLabel: "Select the task",
      enter: "identify yourself",
      refreshData: "Refresh data"
    },



    think: {
      description: "Take a moment to assess your condition and resources. Be honest with yourself"
    },
    alcool: {
      nom: "Alcohol / Drugs / Sleep",
      description: "Do you confirm that you are not under the influence of alcohol, drugs or medication that could affect your alertness or your ability to work safely? Have you had enough sleep?"
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
    swp: {
      nom: "SWP",
      description: "Do you have a SWP (Safe Work Procedure) for this task?"
    },
    ast: {
      nom: "AST",
      description: "Do you have an AST (Task Safety Analysis) for this task?"
    },
    permis: {
      nom: "Work permit",
      description: "Do you have a work permit for this task?"
    },


    organise2: {
      description: "Organise your workspace. Look around you. What are nearby?"
    },
    pressureExplosion: {
      nom: "Pressure / Explosion",
      description: "Have you identified all pressurized systems or explosive materials that could cause flying debris for this task?"
    },
    confinedSpace: {
      nom: "Confined space",
      description: "Have you identified any restricted-access areas, tanks, or pits that require a specific entry permit for this task?"
    },
    fall: {
      nom: "Fall from heights",
      description: "Are you working near an unprotected ledge or at an elevation where fall arrest equipment is needed?"
    },
    suspendedLoad: {
      nom: "Suspended loads",
      description: "Have you checked for overhead crane activity and ensured you are clear of the drop zone for this task?"
    },
    fire: {
      nom: "Flammable substances",
      description: "Have you identified all fire hazards and ensured that all ignition sources are controlled for this task?"
    },
    eboulement: {
      nom: "Falling Rocks / Unstable Ground",
      description: "Have you assessed the overhead slope for potential rockfall or loose debris that could shift for this task?"
    },
    embankment: {
      nom: "Water/Embankment",
      description: "Are you working near a quayside, deep water, or a steep drop-off where there is a risk of falling in?"
    },
    pelle: {
      nom: "Active Work Zone",
      description: "Active Work Zone"
    },



    identifyRisks: {
      description: "Identify the specific hazards and risks associated with your task and environment.",
      controlMeasure: "My control measures"
    },
    biohazard: {
      nom: "Biological, chemical risk",
      description: "Are there any biological or chemical risks associated with this task?"
    },
    electricite: {
      nom: "Electricity",
      description: "Can I get in contact with live electrical parts during this task?"
    },
    fatal: {
      nom: "Mortal risks",
      description: "Are there any life-threatening risks associated with this task?"
    },
    risqueFeu: {
      nom: "Risk of fire / explosion / blaze",
      description: "Are there any risks of fire, explosion, or flame associated with this task?"
    },
    terrainGlissant: {
      nom: "Slippery/unstable terrain",
      description: "Are there any risks of slippery or unstable ground associated with this task?"
    },
    attentionMarche: {
      nom: "stumble",
      description: "Are there any tripping hazards associated with this task?"
    },
    autre: {
      nom: "Other",
      description: "Are there any other risks associated with this task besides those mentioned?"
    },
    unknown: {
      nom: "Risk of asphyxiation / lack of oxygen",
      description: "Are there any risks of asphyxiation or lack of oxygen associated with this task?"
    },


    controlMeasure: {
      danger: "danger",
      mesures: "measures",
      implemented: "implemented",
      delete: "delete",
      deleteText: "Do you really want to remove this control measure?",
      valider: "validate",
      mesureToTake: "measure to be taken",
      addDescription1: "To add a new control measure for other hazards",
      addDescription2: "press the '+' button below",
    },


    epi: {
      description: "Ensure that all required equipment is available, in good condition, suitable for the task, and that you know how to use it correctly. Wear it at all times."
    },
    antibruit: {
      nom: "Noise protection",
      description: "Do you have the required hearing protection for this task?"
    },
    faceProtection: {
      nom: "Face protection glasses",
      description: "Do you have the required face protection glasses for this task?"
    },
    gant: {
      nom: "Protective gloves",
      description: "Do you have the protective gloves required for this task?"
    },
    gilet: {
      nom: "high visibility vest",
      description: "Do you have the high-visibility vest required for this task?"
    },
    gilet2: {
      nom: "Life jacket",
      description: "Do you have the life jacket required for this task?"
    },
    lunettes: {
      nom: "Safety glasses",
      description: "Do you have the required safety glasses for this task?"
    },
    chaussuresProtection: {
      nom: "Protective shoes",
      description: "Do you have the required protective footwear for this task?"
    },
    uniforme: {
      nom: "Protective clothing",
      description: "Do you have the required protective clothing for this task?"
    },
    casque: {
      nom: "Safety helmet",
      description: ""
    },
    cacheBouche: {
      nom: "Face mask",
      description: ""
    },


    fitness: {
      merci: "Thank you for taking the time to finish your Take 5!!!",
      backHome: "return to homepage",
      finish: "I finished my Take 5"
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
    },


    singleTake5: {
      mesures: "Measures",
      commentaires: "Comments",
      commentPlaceholder: "Write your comments here...",
      problems: "Problems",
      mesureLabel: "Control Measures",
      implemented: "Implemented",
      notImplemented: "Pending",
      risk: "Danger/risk",
      noComment: "No comments yet",
      comment: "comment",
      ok: "This take 5 is ok",
      resolve: "problems solved",
      resolveText: "Do you really want to let the contractor continue his take 5?",
      enCours: "In progress",
      valide: "Valid",
      invalide: "Invalid",
      unknown: "Unknown"
    },

    invalide: {
      invalide: "Your take 5 is invalid",
      manipError: "If you mistapped, you can try again by pressing the button in the bottom left corner.",
      otherwise: "Otherwise",
      talkToSup: "Please speak with your supervisor"
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

    
    scanQr: {
      description: "Position the QR code in the frame",
      valide: "Ce take 5 est valide",
      invalide: "Ce take 5 est invalide",
      ongoing: "Ce take 5 est en cours",
      commenter: "commenter",
      more: "plus de details"
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
    recent: {
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
      refreshData: "Actualiser les données",
      poste: "Andraikitra",
      posteLabel: "Andraikitra sahaninao"
    },
    think: {
      description: "Mandania fotoana kely hijerena ny tenanao. Mahaiza mamantatra ny tenanao"
    },
    alcool: {
      nom: "Alikaola / Zava-mahadomelina / Torimaso",
      description: "Manamarina ve ianao fa tsy nandray toaka, zava-mahadomelina na fanafody mety misy fiantraikany amin'ny fahamailoanao? Ampy torimaso ve ianao?"
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
    swp: {
      nom: "SWP",
      description: "Manana SWP (Safe Work Procedure) ho an'ity asa ity ve ianao?"
    },
    ast: {
      nom: "AST",
      description: "Manana AST (Task Safety Analysis) ho an'ity asa ity ve ianao?"
    },
    permis: {
      nom: "Fahazoan-dalana hiasa",
      description: "Manana permis de travail ho an'ity asa ity ve ianao?"
    },


    organise2: {
      description: "Diniho ny toeram-piasanao. Jereo ny manodidina anao."
    },
    pressureExplosion: {
      nom: "Pression / Explosion",
      description: ""
    },
    confinedSpace: {
      nom: "Toerana tery",
      description: "Nahita faritra tery na lavaka voarara ve ianao izay mitaky fahazoan-dàlana manokana ho an'ity asa ity?"
    },
    fall: {
      nom: "Fall from heights",
      description: "Are you working near an unprotected ledge or at an elevation where fall arrest equipment is needed?"
    },
    suspendedLoad: {
      nom: "Suspended loads",
      description: "Have you checked for overhead crane activity and ensured you are clear of the drop zone for this task?"
    },
    fire: {
      nom: "Flammable substances",
      description: "Have you identified all fire hazards and ensured that all ignition sources are controlled for this task?"
    },
    eboulement: {
      nom: "Falling Rocks / Unstable Ground",
      description: "Have you assessed the overhead slope for potential rockfall or loose debris that could shift for this task?"
    },
    embankment: {
      nom: "Water/Embankment",
      description: "Are you working near a quayside, deep water, or a steep drop-off where there is a risk of falling in?"
    },
    pelle: {
      nom: "Active Work Zone",
      description: "Active Work Zone"
    },


    identifyRisks: {
      description: "Identify the specific hazards and risks associated with your task and environment.",
      controlMeasure: "My control measures"
    },
    biohazard: {
      nom: "Biological, chemical risk",
      description: "Are there any biological or chemical risks associated with this task?"
    },
    electricite: {
      nom: "Electricity",
      description: "Can I get in contact with live electrical parts during this task?"
    },
    fatal: {
      nom: "Mortal risks",
      description: "Are there any life-threatening risks associated with this task?"
    },
    risqueFeu: {
      nom: "Risk of fire / explosion / blaze",
      description: "Are there any risks of fire, explosion, or flame associated with this task?"
    },
    terrainGlissant: {
      nom: "Slippery/unstable terrain",
      description: "Are there any risks of slippery or unstable ground associated with this task?"
    },
    attentionMarche: {
      nom: "stumble",
      description: "Are there any tripping hazards associated with this task?"
    },
    autre: {
      nom: "Other",
      description: "Are there any other risks associated with this task besides those mentioned?"
    },
    unknown: {
      nom: "Risk of asphyxiation / lack of oxygen",
      description: "Are there any risks of asphyxiation or lack of oxygen associated with this task?"
    },


    controlMeasure: {
      danger: "danger",
      mesures: "measures",
      implemented: "implemented",
      delete: "delete",
      deleteText: "Do you really want to remove this control measure?",
      valider: "validate",
      mesureToTake: "measure to be taken",
      addDescription1: "To add a new control measure for other hazards",
      addDescription2: "press the '+' button below",
    },


    epi: {
      description: "Ensure that all required equipment is available, in good condition, suitable for the task, and that you know how to use it correctly. Wear it at all times."
    },
    antibruit: {
      nom: "Noise protection",
      description: "Do you have the required hearing protection for this task?"
    },
    faceProtection: {
      nom: "Face protection glasses",
      description: "Do you have the required face protection glasses for this task?"
    },
    gant: {
      nom: "Protective gloves",
      description: "Do you have the protective gloves required for this task?"
    },
    gilet: {
      nom: "high visibility vest",
      description: "Do you have the high-visibility vest required for this task?"
    },
    gilet2: {
      nom: "Life jacket",
      description: "Do you have the life jacket required for this task?"
    },
    lunettes: {
      nom: "Safety glasses",
      description: "Do you have the required safety glasses for this task?"
    },
    chaussuresProtection: {
      nom: "Protective shoes",
      description: "Do you have the required protective footwear for this task?"
    },
    uniforme: {
      nom: "Protective clothing",
      description: "Do you have the required protective clothing for this task?"
    },


    fitness: {
      merci: "Thank you for taking the time to finish your Take 5!!!",
      backHome: "return to homepage",
      finish: "I finished my Take 5"
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
    },

    singleTake5: {
      mesures: "Mesures",
      commentaires: "Commentaires",
      commentPlaceholder: "Écrivez votre commentaire ici...",
      problems: "Problèmes",
      mesureLabel: "Mesures de Contrôle",
      implemented: "Implémentée",
      notImplemented: "En attente",
      risk: "Danger/risque",
      noComment: "Aucun commentaire pour le moment",
      comment: "commenter",
      ok: "Ce toko 5 est ok",
      resolve: "problèmes resolus",
      resolveText: "Voulez-vous vraiment laisser le contractant continuer son toko 5?",
      enCours: "En cours",
      valide: "Valide",
      invalide: "Invalide",
      unknown: "Inconnu"
    },

    invalide: {
      invalide: "Votre Toko 5 est invalide",
      manipError: "En cas d'erreur de manipulation, vous pouvez encore reessayer en appuyant sur le bouton en bas a gauche",
      otherwise: "raha tsy izany",
      talkToSup: "Resaho amin'ny mpanara-maso anao izany."
    }
  }
} as const;