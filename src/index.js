"use strict";

// afficher le niveau et la jauge de progession
window.onload = () => {
  const levelValues = document.querySelector("#level-value");
  const playerPoints = GameManager.getPlayerPoints();

  // afficher le niveau
  const playerLevel = GameManager.getPlayerLevel();

  console.log(levelValues);
};
