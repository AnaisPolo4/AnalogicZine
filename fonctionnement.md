# AnalogicZine

Ce fichier dit à quoi sert l'app et comment elle est censée marcher.
L'écran (`index.html`, `styles.css`, `edition.js`) montre le parcours.
Rien n'est branché : pas de compte, pas de base, pas d'envoi des images, pas d'IA.

---

## À quoi ça sert

Photographie argentique. Chaque mois, une pellicule est développée.
Les scans existent, le temps passe, et les images ne sont pas imprimées.

L'app prend un lot — une pellicule — et en fait une mini édition,
façon fanzine, prête à imprimer depuis le navigateur.
Le dépôt doit déjà être le chemin vers le papier, pas une archive de plus.

Une pellicule = une édition. Le mois est le rythme de travail,
pas un calendrier à afficher.

---

## Comment ça fonctionne

Une seule page, trois temps les uns sous les autres. Le fond est gris clair, les titres sont blancs.

Une bulle est blanche tant qu'elle n'est pas remplie. Elle passe au gris quand c'est fait.

### 1. Prise de contenu

**Déposer** — les photos, et ce qu'on veut écrire avec. Blanche tant qu'il n'y a rien. Grise dès qu'au moins une image est choisie. Les fichiers restent sur l'appareil.

**Analyser** — on la presse ensuite. Ziny compte les images, les portraits et les horizontales, d'après le cadre du fichier. Rien n'est envoyé. La bulle devient grise, et les trois comptes s'affichent à côté. Le tri par sujet n'existe pas encore.

### 2. Rassembler

On choisit ici comment une image se pose sur la page. Trois poses :

- **Pleine page** — l'image couvre toute la feuille.
- **Alignée en bas** — l'image est collée au bas, le blanc reste au-dessus.
- **Alignés au bord gauche** — l'image est collée au bord gauche, le blanc reste à droite.

Deux façons de l'appliquer :

- **Toute l'édition** — la même pose sur chaque page. On règle le nombre de pages.
- **Mix** — on dit combien de pages prennent chaque pose. Elles se suivent dans l'ordre de la liste : d'abord les pleines pages, puis celles alignées en bas, puis celles au bord gauche. Seize pages au plus.

Le bouton **Texte** ouvre un champ. On écrit, et on choisit une des cinq typos. Le texte se pose sur chaque page : sur l'image si elle est pleine, dans le blanc au-dessus si elle est en bas, dans le blanc à droite si elle est au bord gauche.

Une page porte une image, pour l'instant. Les cadres sont vides tant que les scans ne s'affichent pas.

L'IA qui proposerait des catégories n'est pas branchée. La règle de regroupement des images entre elles n'est toujours pas décidée (sujet, lumière, ordre de la pellicule, ce qui tient sur une double). On tranche ça avant de brancher un modèle.

### 3. Aperçu

Le livret se regarde comme dans InDesign : des doubles pages sur la table.

La page 1 est seule, à droite. Ensuite les pages se touchent deux à deux — 2 avec 3, 4 avec 5 — sans espace dans la double. L'espace est entre les doubles. S'il reste une page paire à la fin, elle est seule à gauche.

Le bouton « Imprimer » sort ces pages une par une, au format choisi sur la première page (A6 ou A5). L'écran, lui, montre les doubles.

---

## Typo

Une seule famille : BBB Poppins TN, Text. Rien d'autre.
Les fichiers sont dans `fonts/`, copiés depuis `~/Library/Fonts` pour que la page puisse les charger.

- Regular
- Regular italique
- SemiBold — titres et nom
- Bold
- Bold italique

Le navigateur ne fabrique pas de gras ni d'italique de remplacement (`font-synthesis: none`).

---

## Ce qu'on ne fait pas tant que ce n'est pas décidé

- Où vivent les images (sur l'appareil seulement, ou quelque part en ligne).
- Quel service d'IA, et avec quelles images on accepte de les lui envoyer.
- Les légendes image par image : aujourd'hui, un seul texte pour toutes les pages.
- Le papier : A6 et A5 se choisissent. Un autre format n'est pas prévu.

---

## Où c'est dans le code

- `index.html` — les trois écrans. Un commentaire en tête renvoie ici.
- `styles.css` — la typo, les doubles pages, et la règle d'impression en bas du fichier.
- `edition.js` — lit la mise en page et le texte, puis construit les pages de l'aperçu.
- Le changement d'écran se fait avec l'ancre dans l'adresse
  (`#deposer`, `#rassembler`, `#apercu`).
