"use strict";

// inscrire le joueur s'il n'a pas encore joué
registerPlayer();
localStorage.setItem("playerPoints", "500");

// afficher et cacher les paramètres de jeu

const openButton = document.querySelector("#open-button");
const closeButton = document.querySelector("#close-button");
const settingsDiv = document.querySelector("#settings");

openButton.onclick = () => {
  settingsDiv.classList.replace("translate-x-full", "translate-x-0");
};
closeButton.onclick = () => {
  settingsDiv.classList.replace("translate-x-0", "translate-x-full");
};

// afficher le niveau du joueur et sa progression dans le niveau

const levelSpans = document.querySelectorAll(".level");
const levelProgressionDivs = document.querySelectorAll(".level-progression");

const playerLevel = getPlayerLevel();
const playerPoints = getPlayerPoints();
const currentLevelPoints = getLevelPoints(playerLevel);
const nextLevelPoints = getLevelPoints(playerLevel + 1);
const progressValue =
  (100 * (playerPoints - currentLevelPoints)) /
  (nextLevelPoints - currentLevelPoints);

levelSpans.forEach((element) => {
  element.innerHTML = "Level " + playerLevel;
});

levelProgressionDivs.forEach((element) => {
  element.style.width = progressValue + "%";
});

// afficher les cartes cliquables d'aliens dans les paramètres

const alienCardContainer = document.querySelector("#alien-card-container");
drawCard(alienCardContainer, "aliens", ["reward", "speed"]);

// --------------------------------- affichage des cartes cliquables -----------------------------------

function drawCard(container, entity, specs) {
  let containerWidth = 0;
  gameData[entity].forEach((element) => {
    containerWidth += 155;

    // afficher la carte
    const card = document.createElement("div");
    card.dataset.entity = entity;
    card.dataset.entityId = element.id;
    card.classList.add(
      "h-36",
      "border-2",
      "border-grey",
      "p-4",
      "text-grey",
      "text-xs",
      "bg-card-grey",
      "flex",
      "flex-col",
      "justify-between",
      "items-center",
      "relative",
      "card"
    );
    card.style.width = "150px";
    card.style.marginRight = "5px";
    container.appendChild(card);

    // afficher l'image
    const image = document.createElement("img");
    image.src = element.imagePath;
    card.appendChild(image);

    // afficher les specs
    const specsP = document.createElement("p");

    specs.forEach((spec) => {
      specsP.innerHTML += spec + " : " + element[spec] + "<br>";
    });
    card.appendChild(specsP);

    // indiquer si la carte est sélectionnable
    const requiredLevel = getRequiredLevel(card);
    if (requiredLevel > getPlayerLevel()) {
      makeCardUnavailable(card, requiredLevel);
    } else {
      makeCardAvailable(card);
    }

    // indiquer si utilisé par le joueur
    showSelectedCards();
  });
  container.style.width = containerWidth + "px";
}

function getRequiredLevel(card) {
  let requiredLevel;
  gameData[card.dataset.entity].forEach((element) => {
    if (element.id === parseInt(card.dataset.entityId)) {
      requiredLevel = element.levelId;
    }
  });
  return requiredLevel;
}

function makeCardUnavailable(card, requiredLevel) {
  // griser la carte
  const background = document.createElement("div");
  background.classList.add(
    "absolute",
    "bg-black",
    "opacity-30",
    "w-full",
    "h-full",
    "top-0",
    "cursor-not-allowed"
  );
  card.appendChild(background);

  // afficher cadenas
  const lock = document.createElement("i");
  lock.innerHTML = "lock";
  lock.classList.add(
    "material-icons",
    "absolute",
    "top-1/2",
    "left-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "text-5xl",
    "cursor-not-allowed"
  );
  card.appendChild(lock);

  // indiquer niveau requis
  const level = document.createElement("span");
  level.innerHTML = "Lv " + requiredLevel;
  level.classList.add(
    "absolute",
    "left-1/2",
    "top-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "text-white",
    "cursor-not-allowed"
  );
  card.appendChild(level);
}

function makeCardAvailable(card) {
  card.classList.add("cursor-pointer");
  card.onclick = () => {
    addCardToPreferences(card);
  };
}

function showSelectedCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.dataset.entityId === localStorage.getItem(card.dataset.entity)) {
      card.classList.replace("border-grey", "border-alien-green");
    } else {
      card.classList.replace("border-alien-green", "border-grey");
    }
  });
}

// --------------------------------- gestion du localstorage ------------------------------------------

function getPlayerPoints() {
  return localStorage.getItem("playerPoints");
}

function getLevelPoints(level) {
  for (const gameDataLevel of gameData.levels) {
    if (gameDataLevel.id === level) {
      return gameDataLevel.points;
    }
  }
}

function getPlayerLevel() {
  let playerLevel = 1;
  for (const gameDataLevel of gameData.levels) {
    if (getPlayerPoints() >= gameDataLevel.points) {
      playerLevel = gameDataLevel.id;
    }
  }
  return playerLevel;
}

function registerPlayer() {
  if (!localStorage.getItem("playerPoints")) {
    localStorage.setItem("playerPoints", "0");
    localStorage.setItem("aliens", "1");
    localStorage.setItem("ships", "1");
    localStorage.setItem("missiles", "1");
  }
}

function addCardToPreferences(card) {
  if (localStorage.getItem(card.dataset.entity) !== card.dataset.entityId) {
    localStorage.setItem(card.dataset.entity, card.dataset.entityId);
  }
  showSelectedCards();
}
