"use strict";

// afficher et cacher les paramètres de jeu
const openButton = document.querySelector("#open-button");
const closeButton = document.querySelector("#close-button");
const settingsSection = document.querySelector("#settings");

openButton.onclick = () => {
  settingsSection.classList.replace("translate-x-full", "translate-x-0");
};
closeButton.onclick = () => {
  settingsSection.classList.replace("translate-x-0", "translate-x-full");
};

// afficher le niveau du joueur et sa progression dans le niveau
const levelSpans = document.querySelectorAll(".level");
const levelProgressionDivs = document.querySelectorAll(".level-progression");

const playerLevel = GameManager.getPlayerLevel();
const playerPoints = GameManager.getPlayerPoints();
const currentLevelPoints = GameManager.getLevelPoints(playerLevel);
const nextLevelPoints = GameManager.getLevelPoints(playerLevel + 1);
const progressValue =
  (100 * (playerPoints - currentLevelPoints)) /
  (nextLevelPoints - currentLevelPoints);

levelSpans.forEach((element) => {
  element.innerHTML = playerLevel;
});

levelProgressionDivs.forEach((element) => {
  element.style.width = progressValue + "%";
});

// afficher les cartes cliquables d'aliens dans les paramètres
const alienCardContainer = document.querySelector("#alien-card-container");
console.log(alienCardContainer);
