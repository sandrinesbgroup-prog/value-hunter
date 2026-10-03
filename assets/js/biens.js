/* ==========================================================================
   VALUE HUNTER — les biens à la vente
   Pour ajouter un bien : dupliquer un bloc { ... } et l'adapter.
   La liste, l'accueil et la fiche se mettent à jour tout seuls.

   categorie    : "À rénover" | "Rénové" | "Immeuble de rapport"
   investisseur : true pour les biens proposés aux investisseurs
   locatif      : ligne locative affichée sur la fiche. À ne renseigner que si
                  l'information figure déjà dans l'annonce publique.
   accroche, description, atouts : textes de la fiche, repris des annonces de l'agence.
   photos       : la première sert à la carte.
   statut       : facultatif, ex. "Sous compromis" (bandeau sur la carte et la fiche).
   honoraires   : { charge: "vendeur" } ou { charge: "acquéreur", montant: 6000 } (TTC).
                  Charge acquéreur : la fiche affiche le pourcentage et le prix hors honoraires.
   dpe          : { energie: "D", climat: "D", depenses: "entre … € et … € par an" },
                  étiquettes en couleur sur la fiche, comme l'exige la loi.
   ========================================================================== */

// Photos provisoires, reprises des annonces SeLoger de l'agence.
// À remplacer par les fichiers d'origine, rangés dans assets/img/.
const photo = (src, alt, largeur = 1440, hauteur = 1080) => ({ src, alt, largeur, hauteur });

const BIENS = [
  {
    ref: "maison-paris-17",
    reference: "VH-005",
    categorie: "À rénover",
    investisseur: false,
    type: "Maison de ville",
    titre: "Maison de ville à rénover, 91 m²",
    lieu: "Paris 17e · Batignolles",
    prix: 624000,
    honoraires: { charge: "vendeur" },
    specs: ["91 m²", "5 pièces", "3 chambres"],
    accroche: "À deux pas des Batignolles, au calme d'une cour intérieure : une maison indépendante à repenser entièrement, avec un accès privatif.",
    description: [
      "Le rez-de-chaussée développe environ 50 m² et permet d'imaginer une pièce de vie — cuisine ouverte ou séparée, salle à manger, salon — ainsi qu'une première chambre.",
      "À l'étage, la réunion du premier niveau et des combles créerait environ 40 m² supplémentaires, sous une hauteur pouvant dépasser 3,50 mètres au faîtage, éclairés par quatre fenêtres de toit dont l'installation a déjà reçu l'accord de la copropriété.",
      "Le vendeur s'engage à obtenir les autorisations d'urbanisme et de copropriété nécessaires à la transformation. Un projet d'architecte peut être mis à votre disposition."
    ],
    atouts: [
      "Maison indépendante, accès privatif depuis la cour",
      "Toiture de la maison et de l'immeuble entièrement refaite",
      "Déclaration préalable déposée par un architecte",
      "Plus de 3,50 m de hauteur sous plafond à l'étage",
      "Au calme, à l'abri des regards"
    ],
    caracteristiques: [
      ["Type", "Maison de ville"],
      ["Surface", "90,5 m² après projet"],
      ["Pièces", "5"],
      ["Chambres", "3"],
      ["État", "À rénover"],
      ["Année de construction", "1850"],
      ["Exposition", "Est"],
      ["Copropriété", "12 lots"],
      ["Charges de copropriété", "2 400 €/an"],
      ["Procédure en cours", "Non"]
    ],
    photos: [
      photo("assets/img/paris17-1.jpg", "Maison de ville vue depuis la cour"),
      photo("assets/img/paris17-2.jpg", "Façade latérale et porte d'entrée", 1440, 958),
      photo("assets/img/paris17-3.jpg", "Cour intérieure de la copropriété", 1440, 960),
      photo("assets/img/paris17-4.jpg", "Rez-de-chaussée dans son état actuel"),
      photo("assets/img/paris17-5.jpg", "Projection d'aménagement du séjour, image non contractuelle", 1440, 960),
      photo("assets/img/paris17-6.jpg", "Projection d'aménagement de la salle à manger, image non contractuelle", 1440, 960),
      photo("assets/img/paris17-7.jpg", "Plans du projet", 1392, 1176)
    ]
  },
  {
    ref: "immeuble-bessancourt",
    reference: "VH-03",
    categorie: "Immeuble de rapport",
    investisseur: true,
    type: "Immeuble",
    titre: "Immeuble de 8 logements, 192 m²",
    lieu: "Bessancourt · Val-d'Oise",
    prix: 749000,
    honoraires: { charge: "vendeur" },
    locatif: "Potentiel locatif estimé : environ 58 000 € bruts par an", // libellé de l'annonce publique
    specs: ["192 m²", "8 logements", "4 niveaux"],
    accroche: "Un immeuble de rapport complet, dans un quartier pavillonnaire calme, à deux pas de la gare Transilien (ligne H vers Paris).",
    description: [
      "L'immeuble est bien entretenu, sans travaux à prévoir dans les parties communes, et ses huit logements sont eux aussi en bon état.",
      "Il réunit des studios et des deux-pièces de 18 à 28 m², répartis du rez-de-chaussée au troisième étage.",
      "Vente libre ou occupée, au choix de l'acquéreur."
    ],
    atouts: [
      "Immeuble entier",
      "Parties communes sans travaux à prévoir",
      "Gare Transilien ligne H à proximité",
      "Vente libre ou occupée"
    ],
    caracteristiques: [
      ["Type", "Immeuble de rapport"],
      ["Surface", "192 m²"],
      ["Logements", "8"],
      ["Niveaux", "Rez-de-chaussée + 3"],
      ["Année de construction", "1900"]
    ],
    dpe: { energie: "E", climat: "E", depenses: "entre 3 500 € et 4 000 € par an" },
    photos: [
      photo("assets/img/bessancourt-1.jpg", "Façade de l'immeuble"),
      photo("assets/img/bessancourt-2.jpg", "Séjour sous combles avec poutres apparentes"),
      photo("assets/img/bessancourt-3.jpg", "Escalier vu depuis le rez-de-chaussée", 1080, 1440),
      photo("assets/img/bessancourt-4.jpg", "Vue depuis les étages"),
      photo("assets/img/bessancourt-5.jpg", "Pièce de vie avec cuisine"),
      photo("assets/img/bessancourt-6.jpg", "Studio"),
      photo("assets/img/bessancourt-7.jpg", "Cuisine"),
      photo("assets/img/bessancourt-8.jpg", "Cage d'escalier", 1080, 1440)
    ]
  },
  // Médan : annonce SeLoger de l'agence (VH-001), mandat n° 1.
  {
    ref: "maison-medan",
    reference: "VH-001",
    categorie: "À rénover",
    investisseur: false,
    type: "Maison",
    titre: "Maison en pierre, 210 m², terrain de 1 100 m²",
    lieu: "Médan · Yvelines",
    prix: 600000,
    honoraires: { charge: "vendeur" },
    specs: ["210 m²", "6 pièces", "4 chambres"],
    accroche: "Une maison en pierre de 1850, pleine de charme, sur un terrain de 1 100 m², à proximité de la Seine et à moins de 30 minutes de Paris.",
    description: [
      "Répartie sur trois niveaux, elle offre cinq pièces, dont trois chambres, avec la possibilité d'en aménager une quatrième. Une annexe pleine de caractère complète le bien : elle sera idéale pour créer un bureau, une chambre d'amis ou un espace indépendant.",
      "Des travaux sont à prévoir afin de révéler tout le potentiel de cette maison, notamment le remplacement des menuiseries et une remise en peinture générale. Plusieurs rénovations importantes ont déjà été réalisées : l'installation électrique a été refaite, la cuisine et la chaudière sont neuves, et la toiture est en bon état.",
      "À l'extérieur, un jardin arboré d'environ 840 m², un préau et une cour intérieure permettant de stationner un véhicule. Disponible immédiatement."
    ],
    atouts: [
      "Terrain de 1 100 m², jardin arboré",
      "Électricité refaite, cuisine et chaudière neuves",
      "Annexe indépendante",
      "Préau et cour avec stationnement"
    ],
    caracteristiques: [
      ["Type", "Maison"],
      ["Surface", "210 m²"],
      ["Terrain", "1 100 m²"],
      ["Pièces", "6"],
      ["Chambres", "4"],
      ["Salles de bains", "3"],
      ["Niveaux", "3"],
      ["État", "Travaux à prévoir"],
      ["Année de construction", "1850"],
      ["Exposition", "Est / Ouest"],
      ["Stationnement", "1 place"]
    ],
    dpe: { energie: "F", climat: "D" },
    photos: [
      photo("assets/img/medan-01.jpg", "Maison et terrasse à balustres", 1500, 1000),
      photo("assets/img/medan-02.jpg", "Façade en pierre et cour pavée", 1500, 1000),
      photo("assets/img/medan-03.jpg", "Façade et escalier extérieur", 1500, 1000),
      photo("assets/img/medan-04.jpg", "Maison et jardin", 1500, 1000),
      photo("assets/img/medan-05.jpg", "Séjour aux poutres apparentes", 1500, 1000),
      photo("assets/img/medan-06.jpg", "Salon", 1500, 1000),
      photo("assets/img/medan-07.jpg", "Salon", 1500, 1000),
      photo("assets/img/medan-08.jpg", "Salon", 1500, 1000),
      photo("assets/img/medan-09.jpg", "Salon et porte ancienne", 1500, 1000),
      photo("assets/img/medan-10.jpg", "Salle à manger", 1500, 999),
      photo("assets/img/medan-11.jpg", "Salle à manger", 1500, 1000),
      photo("assets/img/medan-12.jpg", "Cuisine équipée", 1500, 1000),
      photo("assets/img/medan-13.jpg", "Cuisine équipée", 1500, 1000),
      photo("assets/img/medan-14.jpg", "Chambre sous les combles", 1500, 1000),
      photo("assets/img/medan-15.jpg", "Bureau sous les combles", 1500, 1000),
      photo("assets/img/medan-16.jpg", "Salle de bains", 1500, 1000),
      photo("assets/img/medan-17.jpg", "Chambre", 1500, 1000),
      photo("assets/img/medan-18.jpg", "Salle d'eau", 1500, 1000),
      photo("assets/img/medan-19.jpg", "Bureau et bibliothèque", 1500, 1000),
      photo("assets/img/medan-20.jpg", "Bureau", 1500, 1000),
      photo("assets/img/medan-21.jpg", "Jardin", 1500, 1000),
      photo("assets/img/medan-22.jpg", "Préau", 1500, 999),
      photo("assets/img/medan-23.jpg", "Cour intérieure", 1500, 999),
      photo("assets/img/medan-24.jpg", "Jardin et terrasse", 1500, 999)
    ]
  },
  // Rosny : annonces SeLoger de l'agence (VH-002), retirées de la diffusion car sous compromis.
  // Prix : celui affiché sur l'annonce. Honoraires : mandats n° 7 et 8, à la charge de l'acquéreur.
  {
    ref: "rosny-t3",
    reference: "VH-002 / Lot 4",
    statut: "Sous compromis",
    categorie: "Rénové",
    investisseur: true,
    type: "Appartement",
    titre: "Quatre-pièces rénové, 62 m²",
    lieu: "Rosny-sous-Bois · Seine-Saint-Denis",
    prix: 190000,
    honoraires: { charge: "acquéreur", montant: 6000 },
    specs: ["62 m²", "4 pièces", "2 chambres"],
    accroche: "Un appartement entièrement rénové à neuf, au deuxième et dernier étage d'une copropriété en pierre meulière très bien entretenue.",
    description: [
      "Seul appartement sur le palier, ce bien se trouve avenue Jean-Jaurès à Rosny-sous-Bois, à proximité immédiate du RER. La copropriété est gérée par un syndic bénévole, permettant de bénéficier de faibles charges.",
      "Traversant et lumineux, l'appartement a été rénové avec goût et offre une distribution fonctionnelle : une pièce de vie de 21 m² avec cuisine ouverte, une grande chambre de 12 m² complétée par un dressing de 5 m², une chambre d'enfant de 9,7 m², un bureau de 5 m², une salle de bains et un WC indépendant."
    ],
    atouts: [
      "Rénové à neuf",
      "Dernier étage, seul sur le palier",
      "Traversant et lumineux",
      "RER à proximité immédiate"
    ],
    caracteristiques: [
      ["Type", "Appartement"],
      ["Surface", "62 m²"],
      ["Pièces", "4"],
      ["Chambres", "2"],
      ["Étage", "2e et dernier"],
      ["État", "Rénové"],
      ["Année de construction", "1950"],
      ["Exposition", "Est / Ouest"],
      ["Cave", "Oui"],
      ["Copropriété", "5 lots"],
      ["Charges de copropriété", "500 €/an"],
      ["Procédure en cours", "Non"]
    ],
    dpe: { energie: "D", climat: "D", depenses: "entre 1 490 € et 1 930 € par an" },
    photos: [
      photo("assets/img/rosny-t3-01.jpg", "Pièce de vie avec cuisine ouverte, mise en scène virtuelle non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t3-02.jpg", "Pièce de vie, mise en scène virtuelle non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t3-03.jpg", "Chambre, mise en scène virtuelle non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t3-04.jpg", "Dressing, mise en scène virtuelle non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t3-05.jpg", "Chambre d'enfant, mise en scène virtuelle non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t3-06.jpg", "Bureau, mise en scène virtuelle non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t3-07.jpg", "Pièce de vie avec cuisine ouverte", 1500, 1125),
      photo("assets/img/rosny-t3-08.jpg", "Pièce de vie", 1500, 1125),
      photo("assets/img/rosny-t3-09.jpg", "Pièce de vie", 1500, 1125),
      photo("assets/img/rosny-t3-10.jpg", "Dressing", 1500, 1125),
      photo("assets/img/rosny-t3-11.jpg", "Chambre", 1500, 1125),
      photo("assets/img/rosny-t3-12.jpg", "Chambre", 1500, 1125),
      photo("assets/img/rosny-t3-13.jpg", "Chambre", 1500, 1125),
      photo("assets/img/rosny-t3-14.jpg", "Pièce sous les combles", 1500, 1125),
      photo("assets/img/rosny-t3-15.jpg", "Pièce sous les combles", 1500, 1125),
      photo("assets/img/rosny-t3-16.jpg", "Salle d'eau", 1500, 1125),
      photo("assets/img/rosny-t3-17.jpg", "Façade de l'immeuble en meulière", 1500, 1125)
    ]
  },
  {
    ref: "rosny-t2-jardin",
    reference: "VH-002 / Lot 1",
    statut: "Sous compromis",
    categorie: "À rénover",
    investisseur: true,
    type: "Appartement",
    titre: "Deux-pièces avec jardin privatif, 38 m²",
    lieu: "Rosny-sous-Bois · Seine-Saint-Denis",
    prix: 100000,
    honoraires: { charge: "acquéreur", montant: 8000 },
    specs: ["38,4 m²", "2 pièces", "Jardin privatif"],
    accroche: "Un deux-pièces de 38,40 m² avec jardin privatif, offrant un beau potentiel d'aménagement et nécessitant une rénovation complète.",
    description: [
      "Les menuiseries extérieures seront réalisées par le propriétaire : pose des fenêtres, de la porte d'entrée et de la baie vitrée donnant sur le jardin. L'aménagement intérieur restera entièrement à repenser selon vos goûts et vos besoins. Des devis pourront être mis à disposition sur demande.",
      "L'appartement est situé avenue Jean-Jaurès à Rosny-sous-Bois, à proximité immédiate de la gare RER. Il prend place dans un bel immeuble de type meulière, en très bon état. La copropriété, à taille humaine, est gérée par un syndic bénévole, permettant de bénéficier de très faibles charges.",
      "Un bien idéal pour les acquéreurs souhaitant créer un intérieur sur mesure, ou pour un investisseur."
    ],
    atouts: [
      "Jardin privatif",
      "Menuiseries extérieures posées par le propriétaire",
      "Syndic bénévole, charges très faibles",
      "Gare RER à proximité immédiate"
    ],
    caracteristiques: [
      ["Type", "Appartement"],
      ["Surface", "38,4 m²"],
      ["Pièces", "2"],
      ["Chambres", "1"],
      ["Étage", "Rez-de-jardin"],
      ["État", "À rénover"],
      ["Année de construction", "1950"],
      ["Copropriété", "5 lots"],
      ["Charges de copropriété", "300 €/an"],
      ["Procédure en cours", "Non"]
    ],
    dpe: { energie: "D" },
    photos: [
      photo("assets/img/rosny-t2-01.jpg", "Jardin et baie vitrée, projection d'aménagement non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t2-02.jpg", "Pièce de vie, projection d'aménagement non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t2-03.jpg", "Chambre, projection d'aménagement non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t2-04.jpg", "Entrée et salle d'eau, projection d'aménagement non contractuelle", 1500, 1125),
      photo("assets/img/rosny-t2-05.jpg", "Intérieur dans son état actuel", 1500, 1125),
      photo("assets/img/rosny-t2-06.jpg", "Intérieur dans son état actuel", 1500, 1125),
      photo("assets/img/rosny-t2-07.jpg", "Jardin et accès dans leur état actuel", 1500, 1125),
      photo("assets/img/rosny-t2-08.jpg", "Intérieur dans son état actuel", 1500, 1125),
      photo("assets/img/rosny-t2-09.jpg", "Intérieur dans son état actuel", 1500, 1125),
      photo("assets/img/rosny-t2-10.jpg", "Façade de l'immeuble en meulière", 1500, 1125)
    ]
  }
];
