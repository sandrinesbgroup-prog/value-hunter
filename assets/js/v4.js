/* ==========================================================================
   VALUE HUNTER — comportements communs à toutes les pages
   En-tête et pied de page, cartes et fiches de biens, bandeau défilant,
   simulateur, formulaires, apparitions au défilement.
   ========================================================================== */

/* Coordonnées de l'agence : à renseigner une seule fois ici. */
const AGENCE = {
  email: "contact@value-hunter.com", // reçoit aussi les formulaires
  telephone: "06 19 88 53 96" // écrit « 06 12 34 56 78 » ; vide = non affiché
};

/* Liens téléphone et e-mail, repris dans le pied de page. */
function lignesCoordonnees() {
  const lignes = [];
  if (AGENCE.telephone) {
    const tel = AGENCE.telephone.replace(/\D/g, "").replace(/^0/, "+33");
    lignes.push(`<a href="tel:${tel}">${AGENCE.telephone}</a>`);
  }
  if (AGENCE.email) lignes.push(`<a href="mailto:${AGENCE.email}">${AGENCE.email}</a>`);
  return lignes;
}

const PAGES = [
  { id: "biens", titre: "Nos biens", lien: "biens.html" },
  { id: "investir", titre: "Investir", lien: "investir.html" },
  { id: "vendre", titre: "Vendre", lien: "vendre.html" },
  { id: "agence", titre: "L'agence", lien: "agence.html" }
];

const nombre = (n, decimales = 0) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
const euros = (montant) => nombre(montant) + " €";
const parametre = (nom) => new URLSearchParams(location.search).get(nom);

/* Logo d'origine : trois barres, trois teintes, wordmark bicolore. */
const logo = (classe = "") => `
  <a class="logo ${classe}" href="index.html" aria-label="Value Hunter, accueil">
    <svg viewBox="0 0 148 144" aria-hidden="true" focusable="false"><rect class="b1" x="0" y="88" width="36" height="56"/><rect class="b2" x="56" y="48" width="36" height="96"/><rect class="b3" x="112" y="0" width="36" height="144"/></svg>
    <span class="logo__mot"><span class="value">VALUE</span> <span class="hunter">HUNTER</span></span>
  </a>`;

/* ---------- En-tête et pied de page -------------------------------------- */

function poserEntete() {
  const page = document.body.dataset.page;
  const entete = document.createElement("header");
  entete.className = "entete";
  entete.innerHTML = `
    <div class="conteneur entete__barre">
      ${logo("logo--clair")}
      <button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
      <nav class="nav" id="menu" aria-label="Navigation principale">
        ${PAGES.map((p) => `<a href="${p.lien}"${p.id === page ? ' aria-current="page"' : ""}>${p.titre}</a>`).join("")}
        <a class="bouton bouton--blanc" href="contact.html">Contact</a>
      </nav>
    </div>`;
  document.body.prepend(entete);

  // Transparent sur le bandeau violet, blanc avec le logo en couleurs au défilement.
  const marque = entete.querySelector(".logo");
  const burger = entete.querySelector(".burger");
  const ajuster = () => {
    const defile = window.scrollY > 40;
    entete.classList.toggle("entete--defile", defile);
    marque.classList.toggle("logo--clair", !defile && !entete.classList.contains("entete--ouvert"));
  };
  burger.addEventListener("click", () => {
    const ouvert = entete.classList.toggle("entete--ouvert");
    burger.setAttribute("aria-expanded", ouvert);
    burger.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    ajuster();
  });
  window.addEventListener("scroll", ajuster, { passive: true });
  ajuster();
}

function poserPied() {
  const pied = document.createElement("footer");
  pied.className = "pied";
  pied.innerHTML = `
    <div class="conteneur">
      <div class="pied__grille">
        <div>
          ${logo("logo--clair")}
          <p class="pied__texte">Agence immobilière · Paris &amp; Île-de-France</p>
          <ul class="pied__coordonnees">${lignesCoordonnees().map((l) => `<li>${l}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>Le site</h4>
          <ul>
            ${PAGES.map((p) => `<li><a href="${p.lien}">${p.titre}</a></li>`).join("")}
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Informations</h4>
          <ul>
            <li><a href="mentions-legales.html">Mentions légales</a></li>
            <li><a href="honoraires.html">Honoraires</a></li>
            <li><a href="donnees-personnelles.html">Données personnelles</a></li>
          </ul>
        </div>
      </div>
      <p class="pied__bas">© ${new Date().getFullYear()} Value Hunter</p>
    </div>`;
  document.body.append(pied);
}

/* ---------- Cartes de biens ---------------------------------------------- */
/* Une photo de projection ou de mise en scène virtuelle porte « non contractuelle » dans sa légende. */
const estProjection = (p) => /non contractuelle/.test(p.alt);

/* <div class="biens" data-biens data-limite="3" data-investisseur></div> */

function carteBien(bien, i) {
  const p = bien.photos[0];
  return `
    <a class="bien revele" href="bien.html?ref=${bien.ref}" data-categorie="${bien.categorie}" data-investisseur="${bien.investisseur}" style="--delai:${(i % 3) * 0.1}s">
      <div class="bien__photo">
        <img src="${p.src}" alt="${p.alt}" width="${p.largeur}" height="${p.hauteur}" loading="lazy" decoding="async">
        <span class="bien__tag">${bien.categorie}</span>
        ${estProjection(p) ? `<span class="bien__projection">Projection non contractuelle</span>` : ""}
        ${bien.statut ? `<span class="bien__statut">${bien.statut}</span>` : ""}
        <span class="bien__voir">Voir le bien</span>
      </div>
      <div class="bien__corps">
        <span class="bien__lieu">${bien.lieu}</span>
        <h3>${bien.titre}</h3>
        <span class="bien__specs">${bien.specs.join(" · ")}</span>
        <span class="bien__prix">${euros(bien.prix)}</span>
      </div>
    </a>`;
}

function poserBiens() {
  document.querySelectorAll("[data-biens]").forEach((liste) => {
    let biens = BIENS;
    if ("investisseur" in liste.dataset) biens = biens.filter((b) => b.investisseur);
    if (liste.dataset.limite) biens = biens.slice(0, Number(liste.dataset.limite));
    liste.innerHTML = biens.map(carteBien).join("");
  });

  // Bandeau défilant : les biens, répétés pour boucler sans couture.
  const bandeau = document.querySelector("[data-defile]");
  if (bandeau) {
    const ligne = BIENS.map((b) => `${b.lieu} <span>${b.titre}</span> ${euros(b.prix)}<i></i>`).join("");
    bandeau.innerHTML = ligne.repeat(6);
  }

  const filtres = document.querySelector(".filtres");
  if (!filtres) return;
  const appliquer = (filtre) => {
    filtres.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.filtre === filtre));
    document.querySelectorAll("[data-biens] .bien").forEach((carte) => {
      carte.hidden = !(
        filtre === "tous" ||
        carte.dataset.categorie === filtre ||
        (filtre === "investisseur" && carte.dataset.investisseur === "true")
      );
    });
  };
  filtres.addEventListener("click", (e) => {
    const bouton = e.target.closest("button");
    if (bouton) appliquer(bouton.dataset.filtre);
  });
  const demande = parametre("filtre");
  if (demande && filtres.querySelector(`[data-filtre="${demande}"]`)) appliquer(demande);
}

/* ---------- Fiche d'un bien (bien.html?ref=…) ---------------------------- */

/* Mention des honoraires exigée dans les annonces (arrêté du 10 janvier 2017). */
function texteHonoraires(bien) {
  const h = bien.honoraires;
  if (!h) return "";
  if (h.charge !== "acquéreur") return "Honoraires à la charge du vendeur.";
  const horsHonoraires = bien.prix - h.montant;
  const taux = nombre((h.montant / horsHonoraires) * 100, 2);
  return `Honoraires : ${taux} % TTC du prix hors honoraires, à la charge de l'acquéreur (${euros(h.montant)} TTC). Prix hors honoraires : ${euros(horsHonoraires)}.`;
}

/* Étiquettes énergie et climat, lisibles et en couleur (CCH, art. R126-22 à R126-24). */
function blocDpe(bien) {
  const d = bien.dpe;
  if (!d) return "";
  const etiquette = (type, classe, libelle) => classe
    ? `<div class="dpe__ligne"><span class="dpe__lettre dpe__lettre--${type}-${classe.toLowerCase()}">${classe}</span><span>${libelle}</span></div>`
    : `<div class="dpe__ligne"><span class="dpe__lettre">–</span><span>${libelle} : non communiqué</span></div>`;
  const excessif = ["F", "G"].includes(d.energie) ? "<p class=\"dpe__mention\">Logement à consommation énergétique excessive.</p>" : "";
  const depenses = d.depenses ? `<p class="dpe__mention">Montant estimé des dépenses annuelles d'énergie pour un usage standard : ${d.depenses}.</p>` : "";
  return `
    <section class="fiche__encadre">
      <h2>Performance énergétique${d.avant ? ' <span class="h2__precision">avant rénovation</span>' : ""}</h2>
      <div class="dpe">
        ${etiquette("energie", d.energie, `Classe énergie (DPE)${d.avant ? ", établie avant rénovation" : ""}`)}
        ${etiquette("climat", d.climat, "Classe climat (GES)")}
      </div>
      ${excessif}${depenses}${d.note ? `<p class="dpe__mention">${d.note}</p>` : ""}
    </section>`;
}

function poserFiche() {
  const racine = document.querySelector("[data-fiche]");
  if (!racine) return;
  const bien = BIENS.find((b) => b.ref === parametre("ref")) || BIENS[0];
  document.title = `${bien.titre}, ${bien.lieu} · Value Hunter`;

  const locatif = bien.locatif ? `<p class="fiche__accroche">${bien.locatif}</p>` : "";
  const dossier = bien.investisseur && !bien.statut
    ? `<section>
         <h2>Pour investir</h2>
         ${locatif}
         <p>Dossier chiffré sur demande.</p>
         <a class="bouton bouton--violet" href="contact.html?bien=${bien.ref}&amp;projet=Investir&amp;dossier=1">Demander le dossier</a>
       </section>`
    : "";

  racine.innerHTML = `
    <section class="hero hero--page hero--fiche">
      ${bien.statut ? `<span class="hero__statut entre">${bien.statut}</span>` : ""}
      <span class="hero__etiquette entre">${bien.categorie} · ${bien.lieu}</span>
      <h1 class="entre">${bien.titre}</h1>
      <p class="hero__prix entre">${euros(bien.prix)}${bien.honoraires?.charge === "acquéreur" ? " honoraires inclus" : ""}</p>
    </section>

    <section class="section">
      <div class="conteneur">
        <div class="mosaique">
          ${bien.photos.map((p, i) => `<button type="button" aria-label="Agrandir la photo : ${p.alt}">${i === 0 && bien.statut ? `<span class="mosaique__statut">${bien.statut}</span>` : ""}${estProjection(p) ? `<span class="mosaique__projection">Projection</span>` : ""}<img src="${p.src}" alt="${p.alt}" width="${p.largeur}" height="${p.hauteur}" decoding="async"></button>`).join("")}
          <button class="mosaique__tout" type="button">${bien.photos.length} photos</button>
        </div>

        <div class="fiche">
          <div class="fiche__corps">
            ${bien.avertissement ? `<p class="fiche__avertissement">${bien.avertissement}</p>` : ""}
            <section>
              <p class="fiche__accroche">${bien.accroche}</p>
              ${bien.description.map((p) => `<p>${p}</p>`).join("")}
            </section>
            <section>
              <h2>Les atouts</h2>
              <ul class="liste">${bien.atouts.map((a) => `<li>${a}</li>`).join("")}</ul>
            </section>
            <section class="fiche__encadre">
              <h2>Caractéristiques</h2>
              <dl class="specs specs--colonnes">
                ${bien.caracteristiques.map(([cle, valeur]) => `<div><dt>${cle}</dt><dd>${valeur}</dd></div>`).join("")}
              </dl>
            </section>
            ${blocDpe(bien)}
            ${dossier}
            <section>
              <p class="mention">${texteHonoraires(bien)} <a href="honoraires.html">Barème des honoraires</a>.</p>
              <p class="mention">Réf. ${bien.reference}. Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques : <a href="https://www.georisques.gouv.fr" rel="noopener" target="_blank">www.georisques.gouv.fr</a>. Photos et descriptif non contractuels.</p>
            </section>
          </div>
          <aside class="fiche__carte">
            ${bien.statut ? `<span class="fiche__statut">${bien.statut}</span>` : ""}
            <strong>${euros(bien.prix)}</strong>
            ${bien.dpe?.energie ? `<p class="fiche__dpe"><span class="dpe__lettre dpe__lettre--petite dpe__lettre--energie-${bien.dpe.energie.toLowerCase()}">${bien.dpe.energie}</span>DPE${bien.dpe.avant ? " avant rénovation" : ""}</p>` : ""}
            ${texteHonoraires(bien) ? `<p class="fiche__honoraires">${texteHonoraires(bien)}</p>` : ""}
            <p>${bien.specs.join(" · ")}</p>
            ${bien.statut
              ? `<a class="bouton bouton--blanc" href="contact.html">Nous contacter</a>`
              : `<a class="bouton bouton--blanc" href="contact.html?bien=${bien.ref}">Demander une visite</a>
                 ${bien.investisseur ? `<a class="bouton bouton--contour" href="contact.html?bien=${bien.ref}&amp;projet=Investir&amp;dossier=1">Demander le dossier</a>` : ""}`}
          </aside>
        </div>
      </div>
    </section>`;
}

/* ---------- Bouton retour en haut de chaque page intérieure -------------- */
/* Si l'on vient d'une page du site, on y revient (position et filtres conservés) ;
   sinon le lien mène à son adresse : l'accueil, ou la liste des biens depuis une fiche. */

function poserRetour() {
  const bandeau = document.querySelector(".hero--page");
  if (!bandeau) return;
  const fiche = document.querySelector("[data-fiche]");
  const texte = fiche ? "Tous les biens" : "Retour";
  const lien = `<a class="retour" href="${fiche ? "biens.html" : "index.html"}" aria-label="${texte}" data-retour><span aria-hidden="true">←</span><span class="retour__texte">${texte}</span></a>`;

  // Sur la même ligne que l'étiquette du bandeau : le titre ne descend pas (choix de Sandrine, 2026-10-03).
  const etiquette = bandeau.querySelector(".hero__etiquette");
  if (etiquette) {
    etiquette.insertAdjacentHTML("beforebegin", `<div class="hero__haut entre">${lien}</div>`);
    const statut = bandeau.querySelector(".hero__statut");
    if (statut) bandeau.querySelector(".hero__haut").append(statut);
    bandeau.querySelector(".hero__haut").append(etiquette);
  } else {
    bandeau.insertAdjacentHTML("afterbegin", `<div class="hero__haut entre">${lien}</div>`);
  }

  const vientDuSite = document.referrer && new URL(document.referrer).origin === location.origin;
  document.querySelectorAll("[data-retour]").forEach((lien) => {
    lien.addEventListener("click", (e) => {
      if (vientDuSite && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  });
}

/* ---------- Visionneuse de photos ---------------------------------------- */

function activerGalerie() {
  const mosaique = document.querySelector(".mosaique");
  if (!mosaique) return;
  const vignettes = [...mosaique.querySelectorAll("button:not(.mosaique__tout)")];

  const visionneuse = document.createElement("div");
  visionneuse.className = "visionneuse";
  visionneuse.setAttribute("role", "dialog");
  visionneuse.setAttribute("aria-modal", "true");
  visionneuse.setAttribute("aria-label", "Photos du bien");
  visionneuse.innerHTML = `
    <button class="visionneuse__fermer" type="button" aria-label="Fermer">✕</button>
    <button class="visionneuse__prec" type="button" aria-label="Photo précédente">←</button>
    <img src="" alt="">
    <button class="visionneuse__suiv" type="button" aria-label="Photo suivante">→</button>
    <p class="visionneuse__legende"></p>`;
  document.body.append(visionneuse);

  const image = visionneuse.querySelector("img");
  const legende = visionneuse.querySelector(".visionneuse__legende");
  let courant = 0;
  let declencheur = null;

  const montrer = (i) => {
    courant = (i + vignettes.length) % vignettes.length;
    const source = vignettes[courant].querySelector("img");
    image.src = source.src;
    image.alt = source.alt;
    legende.textContent = `${source.alt} · ${courant + 1} / ${vignettes.length}`;
  };
  const ouvrir = (i, origine) => {
    declencheur = origine;
    montrer(i);
    visionneuse.classList.add("ouverte");
    document.body.style.overflow = "hidden";
    visionneuse.querySelector(".visionneuse__fermer").focus();
    // Le bouton « retour » du navigateur ou du téléphone ferme la visionneuse au lieu de quitter la fiche.
    history.pushState({ visionneuse: true }, "");
  };
  const masquer = () => {
    visionneuse.classList.remove("ouverte");
    document.body.style.overflow = "";
    if (declencheur) declencheur.focus();
  };
  const fermer = () => (history.state?.visionneuse ? history.back() : masquer());
  window.addEventListener("popstate", () => {
    if (visionneuse.classList.contains("ouverte")) masquer();
  });

  vignettes.forEach((vignette, i) => vignette.addEventListener("click", () => ouvrir(i, vignette)));
  const tout = mosaique.querySelector(".mosaique__tout");
  tout.addEventListener("click", () => ouvrir(0, tout));
  visionneuse.querySelector(".visionneuse__fermer").addEventListener("click", fermer);
  visionneuse.querySelector(".visionneuse__prec").addEventListener("click", () => montrer(courant - 1));
  visionneuse.querySelector(".visionneuse__suiv").addEventListener("click", () => montrer(courant + 1));
  visionneuse.addEventListener("click", (e) => { if (e.target === visionneuse) fermer(); });
  document.addEventListener("keydown", (e) => {
    if (!visionneuse.classList.contains("ouverte")) return;
    if (e.key === "Escape") fermer();
    if (e.key === "ArrowLeft") montrer(courant - 1);
    if (e.key === "ArrowRight") montrer(courant + 1);
  });
}

/* ---------- Simulateur de rendement -------------------------------------- */
/* Rendement brut = (loyer mensuel × 12) / (prix + travaux). Aucun envoi de données. */

function activerSimulateur() {
  const simulateur = document.querySelector("[data-simulateur]");
  if (!simulateur) return;
  const champ = (nom) => Number(String(simulateur.querySelector(`[name="${nom}"]`).value).replace(/\s/g, "").replace(",", ".")) || 0;
  const sortie = simulateur.querySelector("[data-resultat]");
  const calculer = () => {
    const cout = champ("prix") + champ("travaux");
    sortie.textContent = cout > 0 ? nombre((champ("loyer") * 12 * 100) / cout, 1) + " %" : "—";
  };
  simulateur.addEventListener("input", calculer);
  calculer();
}

/* ---------- Formulaires -------------------------------------------------- */
/* Provisoire : l'envoi prépare un e-mail dans la messagerie du visiteur,
   adressé à AGENCE.email. À remplacer par un service d'envoi ou le CRM. */

function activerFormulaires() {
  // Page contact ouverte depuis une fiche : on rappelle le bien concerné.
  const bien = BIENS.find((b) => b.ref === parametre("bien"));
  const champBien = document.querySelector("[data-champ-bien]");
  if (bien && champBien) {
    champBien.hidden = false;
    champBien.querySelector("input").value = `${bien.titre}, ${bien.lieu} (${bien.reference})`;
  }
  // Venue d'un bouton « Demander le dossier » : projet Investir coché, demande pré-remplie
  const projet = parametre("projet");
  const caseProjet = projet && document.querySelector(`input[name="Votre projet"][value="${projet}"]`);
  if (caseProjet) caseProjet.checked = true;
  const message = document.querySelector("#c-message");
  if (parametre("dossier") && message && !message.value) {
    message.value = bien ? "Je souhaite recevoir le dossier investisseur de ce bien." : "Je souhaite recevoir un dossier investisseur.";
  }

  document.querySelectorAll("form[data-formulaire]").forEach((formulaire) => {
    formulaire.addEventListener("submit", (e) => {
      e.preventDefault();
      const retour = formulaire.querySelector(".formulaire__retour");
      if (!AGENCE.email) {
        retour.textContent = "Formulaire pas encore relié : adresse e-mail de réception à fournir.";
        retour.classList.add("visible");
        return;
      }
      const lignes = [];
      new FormData(formulaire).forEach((valeur, nom) => {
        if (nom === "consentement" || !String(valeur).trim()) return;
        lignes.push(`${nom} : ${valeur}`);
      });
      const objet = `[Site] ${formulaire.dataset.formulaire}`;
      window.location.href = `mailto:${AGENCE.email}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(lignes.join("\n"))}`;
      retour.classList.add("visible");
    });
  });
}

/* ---------- Vidéo d'accueil ---------------------------------------------- */
/* Une seule vidéo, en boucle continue (attribut loop), sans effet au raccord.
   Sur grand écran, on charge la version haute définition (data-hd). */

function activerVideo() {
  const video = document.querySelector(".hero__video");
  if (!video) return;
  if (video.dataset.hd && window.innerWidth * window.devicePixelRatio > 1500) video.src = video.dataset.hd;

  // Le navigateur peut suspendre la lecture quand la page n'est pas à l'écran : on relance au retour.
  const lire = () => { if (video.paused && !document.hidden) video.play().catch(() => {}); };
  video.addEventListener("canplay", lire);
  document.addEventListener("visibilitychange", lire);
  lire();
}

/* ---------- Apparitions au défilement, une seule fois -------------------- */

function activerApparitions() {
  const cibles = document.querySelectorAll(".revele");
  if (!("IntersectionObserver" in window)) {
    cibles.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observateur = new IntersectionObserver((entrees) => entrees.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    observateur.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
  cibles.forEach((el) => observateur.observe(el));
}

/* ---------- Rappel des barres du logo dans les bandeaux de page ---------- */

function poserBarres() {
  document.querySelectorAll(".hero--page").forEach((bandeau) => {
    const barres = document.createElement("div");
    barres.className = "hero__barres";
    barres.setAttribute("aria-hidden", "true");
    barres.innerHTML = Array.from({ length: 18 }, (_, n) => `<i style="--n:${n}"></i>`).join("");
    bandeau.append(barres);
  });
  document.querySelectorAll(".regard__barre").forEach((barre, i) => barre.style.setProperty("--i", i));
}

/* ---------- Film de présentation : le bouton lance la lecture avec le son, puis laisse les commandes */

function activerFilm() {
  document.querySelectorAll(".film").forEach(film => {
    const video = film.querySelector("video"), bouton = film.querySelector(".film__lecture");
    if (!video || !bouton) return;
    bouton.addEventListener("click", () => {
      film.classList.add("joue");
      video.controls = true;
      video.play().catch(() => {});
    });
  });
  // Bouton « Voir le film » du bandeau : descend jusqu'au film et le lance
  document.querySelectorAll("[data-lire-film]").forEach(lien => {
    lien.addEventListener("click", e => {
      const film = document.querySelector(".film");
      if (!film) return;
      e.preventDefault();
      film.scrollIntoView({ behavior: "smooth", block: "center" });
      film.querySelector(".film__lecture")?.click();
    });
  });
}

/* ---------- Démarrage ---------------------------------------------------- */

poserEntete();
poserBiens();
poserFiche();
poserRetour();
poserBarres();
poserPied();
activerVideo();
activerGalerie();
activerSimulateur();
activerFormulaires();
activerApparitions();
activerFilm();
