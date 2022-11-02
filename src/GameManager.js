class GameManager {
  updatePlayerLevel() {
    gameData.levels.forEach((level) => {
      if (playerData.points >= level.points) {
        playerData.level = level;
      }
    });
    savePlayerData();
  }
}
