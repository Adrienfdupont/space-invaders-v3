class GameManager {
  static getPlayerPoints() {
    if (!localStorage.getItem("playerPoints")) {
      localStorage.setItem("playerPoints", "300");
    }
    return localStorage.getItem("playerPoints");
  }

  static getLevelPoints(level) {
    for (const gameDataLevel of gameData.levels) {
      if (gameDataLevel.id === level) {
        return gameDataLevel.points;
      }
    }
  }

  static getPlayerLevel() {
    let playerLevel = 1;
    for (const gameDataLevel of gameData.levels) {
      if (GameManager.getPlayerPoints() >= gameDataLevel.points) {
        playerLevel = gameDataLevel.id;
      }
    }
    return playerLevel;
  }
}
