"use strict";

var playerData;
registerPlayer();

updateBackground();

const shipImg = document.querySelector("#ship");
shipImg.src = playerData.alien.image.path;

// --------------------------- afficher et cacher les paramètres de jeu -------------------------------

const openButton = document.querySelector("#open-button");
const settingsDiv = document.querySelector("#settings");
openButton.onclick = () => {
  settingsDiv.classList.replace("translate-x-full", "translate-x-0");
};

const closeButton = document.querySelector("#close-button");
closeButton.onclick = () => {
  settingsDiv.classList.replace("translate-x-0", "translate-x-full");
};

// ---------------- afficher le niveau du joueur et sa progression dans le niveau ---------------------

const playerLevel = playerData.level.id;
const playerPoints = playerData.points;
const currentLevelPoints = playerData.level.points;
const nextLevelPoints = gameData.levels[playerLevel].points;
const progressValue =
  (100 * (playerPoints - currentLevelPoints)) /
  (nextLevelPoints - currentLevelPoints);

const levelSpans = document.querySelectorAll(".level");
levelSpans.forEach((element) => {
  element.innerHTML = "Level " + playerLevel;
});

const levelProgressionDivs = document.querySelectorAll(".level-progression");
levelProgressionDivs.forEach((element) => {
  element.style.width = progressValue + "%";
});

// -------------------- afficher les cartes cliquables dans les paramètres -----------------------------

const alienCardContainer = document.querySelector("#alien-card-container");
drawCard(alienCardContainer, "alien", ["reward"]);

const shipCardContainer = document.querySelector("#ship-card-container");
drawCard(shipCardContainer, "ship", ["reload"]);

const missileCardContainer = document.querySelector("#missile-card-container");
drawCard(missileCardContainer, "missile", ["speed"]);

const bgCardContainer = document.querySelector("#bg-card-container");
drawCard(bgCardContainer, "background", ["title"]);

// --------------------------------- affichage des cartes cliquables -----------------------------------

function drawCard(container, entity, specs) {
  let containerWidth = 0;
  gameData[entity + "s"].forEach((element) => {
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
      "bg-[url('" + element.image.path + "')]",
      "bg-contain",
      "bg-no-repeat",
      "bg-center"
    );
    // spécificités selon l'entité
    if (entity === "missile") {
      image.classList.add("rotate-45");
    }
    if (entity === "background") {
      image.classList.replace("bg-contain", "bg-cover");
    }
    card.appendChild(image);

    // afficher les specs
    const specsP = document.createElement("p");

    specs.forEach((spec) => {
      if (entity !== "background") {
        specsP.innerHTML = capitalizeFirstLetter(spec) + " : ";
      }
      specsP.innerHTML += element[spec] + "<br>";
    });
    card.appendChild(specsP);

    // indiquer si la carte est sélectionnable
    isCardAvailable(card, element);

    // indiquer si utilisé par le joueur
    isCardSelected(card);
  });
  container.style.width = containerWidth + "px";
}

function isCardAvailable(card, arrayElement) {
  if (arrayElement.levelId > playerData.level.id) {
    makeCardUnavailable(card, arrayElement.levelId);
  } else {
    makeCardAvailable(card);
  }
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
    "top-0"
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
    "cursor-default"
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
    "cursor-default"
  );
  card.appendChild(level);
}

function makeCardAvailable(card) {
  card.classList.add("cursor-pointer");
  card.onclick = () => {
    addCardToPreferences(card);
  };
}

function isCardSelected(card) {
  if (parseInt(card.dataset.entityId) === playerData[card.dataset.entity].id) {
    card.classList.replace("border-grey", "border-alien-green");
  } else {
    card.classList.replace("border-alien-green", "border-grey");
  }
}

function updateBackground() {
  const bgDiv = document.querySelector("#bg");
  const bgSrc = playerData.background.image.path;
  bgDiv.style.backgroundImage = "url('" + bgSrc + "')";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// --------------------------------- gestion du localstorage ------------------------------------------

function registerPlayer() {
  if (!localStorage["playerData"]) {
    playerData = {
      points: 0,
      level: gameData.levels[0],
      alien: gameData.aliens[0],
      ship: gameData.ships[0],
      missile: gameData.missiles[0],
      background: gameData.backgrounds[0],
    };
    savePlayerData();
  } else {
    playerData = JSON.parse(localStorage["playerData"]);
  }
}

function addCardToPreferences(card) {
  const entity = card.dataset.entity;
  const entityId = parseInt(card.dataset.entityId);
  if (playerData[entity].id !== entityId) {
    gameData[entity + "s"].forEach((element) => {
      if (element.id === entityId) {
        playerData[entity] = element;
        savePlayerData();
      }
    });
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    isCardSelected(card);
  });

  if (entity === "background") {
    updateBackground();
  }
}

function savePlayerData() {
  localStorage["playerData"] = JSON.stringify(playerData);
}
