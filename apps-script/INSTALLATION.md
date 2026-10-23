# Installation – Réservations Google (≈ 15 min, depuis un ordinateur)

À faire par Miro sur son Mac, connecté au compte Google du restaurant (`bella.napoli.bulle@gmail.com`) dans une **fenêtre de navigation privée**.
Luigi n'a qu'une chose à faire : valider la connexion sur son téléphone (« Est-ce bien vous ? » → **Oui**).

## 1. Créer le tableau
1. Aller sur https://sheets.new (connecté au compte du resto).
2. Renommer le fichier : **Réservations Bella Napoli**.

## 2. Coller le script
1. Menu **Extensions → Apps Script**.
2. Dans `Code.gs`, tout effacer, coller le contenu de `apps-script/Code.gs`.
3. Cliquer sur **+** à côté de « Fichiers » → **HTML** → nommer `Page` (sans .html) → coller le contenu de `apps-script/Page.html`.
4. Enregistrer (icône disquette).

## 3. Autoriser (une seule fois)
1. En haut, choisir la fonction **sheet** puis **Exécuter**.
2. « Autorisation requise » → **Examiner les autorisations** → choisir le compte du resto.
3. « Google n'a pas validé cette application » → **Paramètres avancés** → **Accéder à Réservations Bella Napoli (non sécurisé)** → **Autoriser**.
   (Normal : c'est un script perso, pas une appli publique.)
4. Vérifier dans le tableau : un onglet **Réservations** avec les en-têtes est apparu.

## 4. Mettre en ligne
1. **Déployer → Nouveau déploiement** → roue dentée → **Application Web**.
2. Description : `Réservations site`.
3. **Exécuter en tant que : Moi** (bella.napoli.bulle@gmail.com).
4. **Qui a accès : Tout le monde**.
5. **Déployer** → copier l'**URL de l'application Web** (se termine par `/exec`).

## 5. Brancher le site
1. Dans `assets/js/main.js`, coller l'URL : `var RESA_ENDPOINT = 'https://script.google.com/macros/s/…/exec';`
2. Merger la branche `resa-google` dans `main` et pousser.

## 6. Tester
1. Faire une réservation test sur le site avec son propre e-mail.
2. Vérifier que `bella.napoli.bulle@gmail.com` reçoit « 🍕 Nouvelle réservation ».
3. Cliquer **Accepter ou refuser** → **Accepter** → vérifier l'e-mail de confirmation reçu.
4. Supprimer la ligne de test dans le tableau.
5. Se déconnecter du compte Google du resto.

## Côté Luigi (sur son téléphone)
- Notifications Gmail activées sur l'app Gmail (normalement déjà le cas).
- Il peut aussi installer **Google Sheets** pour voir toutes les réservations.

## Bon à savoir
- Limite Gmail gratuite : 100 e-mails/jour → environ 50 réservations par jour (1 e-mail à Luigi + 1 au client).
- Modifier le script plus tard : **Déployer → Gérer les déploiements → crayon → Version : Nouvelle version**, sinon l'URL ne prend pas les changements.
- Une fois en place, l'abonnement Premium Wix et le sous-domaine `reservation.` ne servent plus.
