async function getGameData() {
  return fetch("../game-data.json").then((response) => response.json());
}

getGameData().then((json) => console.log(json));
