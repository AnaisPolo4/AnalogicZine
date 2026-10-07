// Construit l'aperçu à partir du choix fait dans Rassembler.
// Comme dans InDesign : la page impaire est à droite.
// La première est seule, puis les pages se touchent deux à deux.

const MAX = 16;
const ORDRE = ["pleine", "bas", "gauche"];

function nombre(id) {
  return Number(document.getElementById(id).textContent);
}

function modeMix() {
  return document.querySelector('input[name="mode"]:checked').value === "mix";
}

function typoChoisie() {
  return document.querySelector('input[name="typo"]:checked').value;
}

function pages() {
  if (!modeMix()) {
    const mise = document.querySelector('input[name="mise"]:checked').value;
    return Array.from({ length: nombre("compte") }, () => mise);
  }
  const liste = [];
  for (const mise of ORDRE) {
    const n = nombre("n-" + mise);
    for (let i = 0; i < n; i += 1) liste.push(mise);
  }
  return liste;
}

// Page 1 seule à droite, puis (2|3), (4|5)… La dernière page paire reste seule à gauche.
function doubles(liste) {
  if (liste.length === 0) return [];
  const rangs = [{ cote: "droite", pages: [liste[0]] }];
  let i = 1;
  while (i < liste.length) {
    if (i + 1 < liste.length) {
      rangs.push({ cote: "paire", pages: [liste[i], liste[i + 1]] });
      i += 2;
    } else {
      rangs.push({ cote: "gauche", pages: [liste[i]] });
      i += 1;
    }
  }
  return rangs;
}

function dessiner() {
  const cahier = document.getElementById("cahier");
  const texte = document.getElementById("texte").value.trim();
  const typo = typoChoisie();
  document.getElementById("texte").className = "typo-" + typo;
  cahier.replaceChildren();

  const liste = pages();
  const total = nombre("n-pleine") + nombre("n-bas") + nombre("n-gauche");
  document.getElementById("total").textContent = String(total);

  if (liste.length === 0) {
    const vide = document.createElement("p");
    vide.className = "note";
    vide.textContent = "Aucune page. Ajoute une mise en page.";
    cahier.append(vide);
    return;
  }

  let numero = 1;
  for (const rang of doubles(liste)) {
    const bloc = document.createElement("div");
    bloc.className = rang.cote === "paire" ? "double" : "double solo-" + rang.cote;
    for (const mise of rang.pages) {
      const page = document.createElement("article");
      page.className = "page";
      page.dataset.mise = mise;
      const cadre = document.createElement("div");
      cadre.className = "cadre";
      const num = document.createElement("span");
      num.className = "num";
      num.textContent = String(numero).padStart(2, "0");
      cadre.append(num);
      page.append(cadre);
      if (texte) {
        const legende = document.createElement("p");
        legende.className = "legende typo-" + typo;
        legende.textContent = texte;
        page.append(legende);
      }
      bloc.append(page);
      numero += 1;
    }
    cahier.append(bloc);
  }
}

function changer(cible, step) {
  const mix = cible !== "compte";
  const id = mix ? "n-" + cible : "compte";
  const suivant = nombre(id) + step;
  if (mix) {
    if (suivant < 0) return;
    const autres = ORDRE.filter((mise) => mise !== cible).reduce(
      (somme, mise) => somme + nombre("n-" + mise),
      0,
    );
    if (autres + suivant > MAX) return;
  } else if (suivant < 1 || suivant > MAX) {
    return;
  }
  document.getElementById(id).textContent = String(suivant);
  dessiner();
}

const reglages = document.getElementById("reglages");

reglages.addEventListener("change", () => {
  document.getElementById("reglage-fixe").hidden = modeMix();
  document.getElementById("reglage-mix").hidden = !modeMix();
  dessiner();
});

reglages.addEventListener("click", (event) => {
  const bouton = event.target.closest("button[data-step]");
  if (!bouton) return;
  changer(bouton.dataset.cible, Number(bouton.dataset.step));
});

document.getElementById("ouvrir-texte").addEventListener("click", () => {
  const panneau = document.getElementById("panneau-texte");
  const ouvrir = panneau.hidden;
  panneau.hidden = !ouvrir;
  document.getElementById("ouvrir-texte").setAttribute("aria-expanded", String(ouvrir));
  if (ouvrir) document.getElementById("texte").focus();
});

document.getElementById("texte").addEventListener("input", () => {
  const vide = document.getElementById("texte").value.trim() === "";
  document.getElementById("ouvrir-texte").classList.toggle("faite", !vide);
  dessiner();
});

let fichiers = [];

function lireOrientation(fichier) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(fichier);
    const image = new Image();
    image.onload = () => {
      const portrait = image.naturalHeight > image.naturalWidth;
      URL.revokeObjectURL(url);
      resolve(portrait ? "portrait" : "horizontale");
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve("horizontale");
    };
    image.src = url;
  });
}

function remettreCompteurs() {
  document.getElementById("n-images").textContent = "0";
  document.getElementById("n-portraits").textContent = "0";
  document.getElementById("n-horizontales").textContent = "0";
  document.getElementById("analyser").classList.remove("faite");
}

document.querySelector("#deposer input").addEventListener("change", (event) => {
  fichiers = [...event.target.files].filter((fichier) => fichier.type.startsWith("image/"));
  document.getElementById("deposer").classList.toggle("faite", fichiers.length > 0);
  remettreCompteurs();
});

document.getElementById("analyser").addEventListener("click", async () => {
  if (fichiers.length === 0) return;
  let portraits = 0;
  let horizontales = 0;
  for (const fichier of fichiers) {
    const orientation = await lireOrientation(fichier);
    if (orientation === "portrait") portraits += 1;
    else horizontales += 1;
  }
  document.getElementById("n-images").textContent = String(fichiers.length);
  document.getElementById("n-portraits").textContent = String(portraits);
  document.getElementById("n-horizontales").textContent = String(horizontales);
  document.getElementById("analyser").classList.add("faite");
});

const format = document.getElementById("format");

function appliquerFormat() {
  document.body.dataset.format = format.value === "0" ? "a6" : "a5";
}

format.addEventListener("input", appliquerFormat);
appliquerFormat();

dessiner();
