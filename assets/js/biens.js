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
      ["Procédure en cours", "Non"],
      ["Honoraires", "Charge vendeur"]
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
      ["Année de construction", "1900"],
      ["DPE", "E"],
      ["GES", "E"],
      ["Facture énergétique estimée", "3 500 à 4 000 €/an"]
    ],
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
  {
    ref: "appartement-rosny",
    reference: "VH-001",
    categorie: "Rénové",
    investisseur: true,
    type: "Appartement",
    titre: "Trois-pièces rénové, 60 m²",
    lieu: "Rosny-sous-Bois · Seine-Saint-Denis",
    prix: 200000,
    specs: ["60 m²", "3 pièces", "2 chambres"],
    accroche: "Dans un immeuble en meulière, un trois-pièces entièrement refait, à proximité de la ligne 11 et du RER E.",
    description: [
      "Séjour avec cuisine ouverte équipée, deux chambres, salle d'eau avec douche à l'italienne. Parquet ancien poncé, double vitrage, peintures neuves.",
      "Aucun travaux à prévoir : le bien peut être habité ou loué dès la remise des clés."
    ],
    atouts: [
      "Rénovation complète",
      "Double exposition",
      "Cuisine équipée, douche à l'italienne",
      "Ligne 11 et RER E à proximité"
    ],
    caracteristiques: [
      ["Type", "Appartement"],
      ["Surface", "60 m²"],
      ["Pièces", "3"],
      ["Chambres", "2"],
      ["État", "Rénové"],
      ["Exposition", "Double"],
      ["DPE", "D"]
    ],
    photos: [
      photo("assets/img/rosny-sejour.jpg", "Séjour avec cuisine ouverte", 1500, 1125),
      photo("assets/img/rosny-salle-eau.jpg", "Salle d'eau", 1125, 1500),
      photo("assets/img/rosny-facade.jpg", "Façade de l'immeuble", 551, 827),
      photo("assets/img/rosny-escalier-2.jpg", "Escalier de l'immeuble", 551, 827),
      photo("assets/img/rosny-escalier-1.jpg", "Cage d'escalier", 551, 827)
    ]
  }
];
