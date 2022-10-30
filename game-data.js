const gameData = {
  levels: [
    {
      id: 1,
      points: 0,
    },

    {
      id: 2,
      points: 100,
    },

    {
      id: 3,
      points: 200,
    },

    {
      id: 4,
      points: 400,
    },

    {
      id: 5,
      points: 800,
    },

    {
      id: 6,
      points: 1600,
    },

    {
      id: 7,
      points: 3200,
    },

    {
      id: 8,
      points: 6400,
    },

    {
      id: 9,
      points: 12800,
    },

    {
      id: 10,
      points: 25600,
    },
  ],

  aliens: [
    {
      id: 1,
      speed: 1,
      reload: 20000,
      reward: 10,
      levelId: 1,
    },

    {
      id: 2,
      speed: 1.1,
      reload: 19000,
      reward: 12,
      levelId: 2,
    },

    {
      id: 3,
      speed: 1.2,
      reload: 18000,
      reward: 15,
      levelId: 3,
    },

    {
      id: 4,
      speed: 1.3,
      reload: 17000,
      reward: 19,
      levelId: 4,
    },

    {
      id: 5,
      speed: 1.4,
      reload: 16000,
      reward: 24,
      levelId: 5,
    },

    {
      id: 6,
      speed: 1.5,
      reload: 15000,
      reward: 29,
      levelId: 6,
    },

    {
      id: 7,
      speed: 1.6,
      reload: 14000,
      reward: 36,
      levelId: 7,
    },

    {
      id: 8,
      speed: 1.7,
      reload: 13000,
      reward: 43,
      levelId: 8,
    },

    {
      id: 9,
      speed: 1.8,
      reload: 12000,
      reward: 52,
      levelId: 9,
    },

    {
      id: 10,
      speed: 1.9,
      reload: 11000,
      reward: 65,
      levelId: 10,
    },
  ],

  ships: [
    {
      id: 1,
      imagePath: "../public/images/ships/ship-lv1.png",
      reload: 2000,
      levelId: 2,
    },

    {
      id: 2,
      imagePath: "../public/images/ships/ship-lv2.png",
      reload: 1800,
      levelId: 4,
    },

    {
      id: 3,
      imagePath: "../public/images/ships/ship-lv3.png",
      reload: 1600,
      levelId: 6,
    },

    {
      id: 4,
      imagePath: "../public/images/ships/ship-lv4.png",
      reload: 1400,
      levelId: 8,
    },

    {
      id: 5,
      imagePath: "../public/images/ships/ship-lv5.png",
      reload: 1200,
      levelId: 10,
    },
  ],

  missiles: [
    {
      id: 1,
      speed: 0.4,
      levelId: 3,
    },

    {
      id: 2,
      speed: 0.5,
      levelId: 6,
    },

    {
      id: 3,
      speed: 0.6,
      levelId: 9,
    },
  ],
};
