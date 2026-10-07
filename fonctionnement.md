# AnalogicZine

Ce fichier dit à quoi sert l'app et comment elle est censée marcher.
L'écran (`index.html`, `styles.css`) ne fait encore que montrer ce parcours.
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

Trois temps, dans cet ordre. On peut revenir en arrière.
L'impression n'a de sens qu'une fois les images rassemblées,
mais l'écran d'impression existe déjà pour qu'on voie le format.

### 1. Déposer

On pose les scans d'une pellicule développée.
Les fichiers restent sur l'appareil tant qu'on n'a pas décidé où les garder.
Le champ est là ; il ne prévisualise pas encore les images.

### 2. Rassembler

Une IA proposera des catégories et des groupes.
On pourra déplacer une image, renommer un groupe, en retirer une.
Rien de tout ça n'est calculé aujourd'hui : les piles à l'écran sont des emplacements vides.

La règle de rassemblement n'est pas décidée. Pistes, sans choix :

- par sujet
- par lumière
- dans l'ordre de la pellicule
- selon ce qui tient ensemble sur une double page

On tranche ça avant de brancher un modèle. Pas avant.

### 3. Imprimer

Le rassemblement devient une mise en page.
Format de départ : A5, quatre pages — couverture, une image pleine,
une page de groupe, un colophon.
Peu de texte. Les images d'abord.

Le bouton « Imprimer » n'envoie que ces pages (le reste de l'app est masqué à l'impression).
Le cahier changera quand on saura comment les images se groupent :
nombre de pages, une ou deux images par page, légendes ou non.

---

## Ce qu'on ne fait pas tant que ce n'est pas décidé

- Où vivent les images (sur l'appareil seulement, ou quelque part en ligne).
- Quel service d'IA, et avec quelles images on accepte de les lui envoyer.
- Les légendes : rien, une date, un lieu, une ligne libre.
- Le papier final : A5 est un point de départ, pas un choix fermé.

---

## Où c'est dans le code

- `index.html` — les trois écrans. Un commentaire en tête renvoie ici.
- `styles.css` — l'apparence, et la règle d'impression en bas du fichier.
- Pas de JavaScript, à part `print()` sur le bouton. Le changement d'écran
  se fait avec l'ancre dans l'adresse (`#deposer`, `#rassembler`, `#imprimer`).
