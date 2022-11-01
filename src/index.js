"use strict";

registerPlayer();

updateBackground();

// --------------------------- afficher et cacher les paramètres de jeu -------------------------------

const openButton = document.querySelector("#open-button");
const closeButton = document.querySelector("#close-button");
const settingsDiv = document.querySelector("#settings");

openButton.onclick = () => {
  settingsDiv.classList.replace("translate-x-full", "translate-x-0");
};
closeButton.onclick = () => {
  settingsDiv.classList.replace("translate-x-0", "translate-x-full");
};

// ---------------- afficher le niveau du joueur et sa progression dans le niveau ---------------------

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

// -------------------- afficher les cartes cliquables dans les paramètres -----------------------------

const alienCardContainer = document.querySelector("#alien-card-container");
drawCard(alienCardContainer, "aliens", ["reward"]);

const shipCardContainer = document.querySelector("#ship-card-container");
drawCard(shipCardContainer, "ships", ["reload"]);

const missileCardContainer = document.querySelector("#missile-card-container");
drawCard(missileCardContainer, "missiles", ["speed"]);

const bgCardContainer = document.querySelector("#bg-card-container");
drawCard(bgCardContainer, "backgrounds", ["title"]);

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
      "p-1",
      "text-grey",
      "text-sm",
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
    const image = document.createElement("div");
    image.classList.add(
      "h-full",
      "w-full",
      "bg-[url('" + element.imagePath + "')]",
      "bg-contain",
      "bg-no-repeat",
      "bg-center"
    );
    // spécificités selon l'entité
    if (card.dataset.entity === "missiles") {
      image.classList.add("rotate-45");
    }
    if (card.dataset.entity === "backgrounds") {
      image.classList.replace("bg-contain", "bg-cover");
    }
    card.appendChild(image);

    // afficher les specs
    const specsP = document.createElement("p");

    specs.forEach((spec) => {
      if (entity !== "backgrounds") {
        specsP.innerHTML = capitalizeFirstLetter(spec) + " : ";
      }
      specsP.innerHTML += element[spec] + "<br>";
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
    "opacity-50",
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
    "text-7xl",
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
    const registeredId = retrieveEntityId(card.dataset.entity);
    if (card.dataset.entityId === registeredId) {
      card.classList.replace("border-grey", "border-alien-green");
    } else {
      card.classList.replace("border-alien-green", "border-grey");
    }
  });
}

function updateBackground() {
  const bgDiv = document.querySelector("#bg");
  const bgSrc = getPlayerBackground();
  bgDiv.style.backgroundImage = "url('" + bgSrc + "')";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// --------------------------------- gestion du localstorage ------------------------------------------

function retrieveEntityId(entity) {
  return localStorage.getItem(entity);
}

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
    localStorage.setItem("backgrounds", "1");
  }
}

function addCardToPreferences(card) {
  if (localStorage.getItem(card.dataset.entity) !== card.dataset.entityId) {
    localStorage.setItem(card.dataset.entity, card.dataset.entityId);
  }
  showSelectedCards();
  if (card.dataset.entity === "backgrounds") {
    updateBackground();
  }
}

function getPlayerBackground() {
  let bgSrc;
  gameData.backgrounds.forEach((bg) => {
    if (bg.id === parseInt(localStorage.getItem("backgrounds"))) {
      bgSrc = bg.imagePath;
    }
  });
  return bgSrc;
}
