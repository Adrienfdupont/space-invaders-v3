class GameManager {
  static getGameData = async () => {
    return fetch("../game-data.json").then((response) => response.json());
  };

  static getPlayerPoints() {
    if (!localStorage.getItem("playerPoints")) {
      localStorage.setItem("playerPoints", "0");
    }
    return localStorage.getItem("playerPoints");
  }

  static getPlayerLevel() {
    let level = 1;
    GameManager.getGameData().then((data) => {
      for (const playerLevel of data.playerLevels) {
        if (GameManager.getPlayerPoints() >= playerLevel.points) {
          level = playerLevel.id;
        }
      }
    });
    return level;
  }
}
