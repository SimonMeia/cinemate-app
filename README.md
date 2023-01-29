# cinemate-app
## Concept
Cinemate est un réseau social de critiques de films. Le principe du réseau social est un fonctionnement par groupe : vous n'ajoutez pas des amis mais vous rejoignez des groupes. 

Imaginez que vous être étudiant à Yverdon-les-bains, vous habitez Neuchâtel et que vous faite parti d'un club de sport à Bienne. Vous pouvez alors créer / rejoindre un groupe par activité : 1 avec vos collègues d'Yverdon, 1 avec vos amis d'enfance de Neuchâtel et 1 avec vous amis sportifs.

De cette manière vous pouvez voir les avis de vos différents cercles sur les films qui ont reçus une critiques.

## Installation
1. Prérequis:
   - Node.js 13.2+
   - Un token d'API qimg
   - Un token d'API [The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction)
   - Un [API cinemate](https://github.com/SimonMeia/cinemate-api) fonctionnelle 
2. Cloner et pull le repository
    ```
    git pull
    ```
3. Installer les packages
    ```
    npm i
    ```
4. Rendez-vous dans le dossier `/src/environments` et renommez le fichier `environment.sample.ts` en `environment.ts`. Modifiez ensuite les valeurs à l'interieur du fichier avec des token d'API et des URL valides.
5. Exécuter l'application
    ```
    ionic serve
    ```
## Projet développé par
- Simon Meia
- Marilyn Themo
- Alexandre Souto

## Démonstration
Une démonstation du fonctionnement de l'application est disponible [ici](https://youtu.be/hVU-qQ8D-2E)