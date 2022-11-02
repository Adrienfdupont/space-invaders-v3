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
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 1,
    },

    {
      id: 2,
      speed: 1.1,
      reload: 19000,
      reward: 12,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 2,
    },

    {
      id: 3,
      speed: 1.2,
      reload: 18000,
      reward: 15,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 3,
    },

    {
      id: 4,
      speed: 1.3,
      reload: 17000,
      reward: 19,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 4,
    },

    {
      id: 5,
      speed: 1.4,
      reload: 16000,
      reward: 24,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 5,
    },

    {
      id: 6,
      speed: 1.5,
      reload: 15000,
      reward: 29,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 6,
    },

    {
      id: 7,
      speed: 1.6,
      reload: 14000,
      reward: 36,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 7,
    },

    {
      id: 8,
      speed: 1.7,
      reload: 13000,
      reward: 43,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 8,
    },

    {
      id: 9,
      speed: 1.8,
      reload: 12000,
      reward: 52,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 9,
    },

    {
      id: 10,
      speed: 1.9,
      reload: 11000,
      reward: 65,
      image: {
        path: "../public/images/aliens/alien.png",
        width: 50,
        height: 37,
      },
      levelId: 10,
    },
  ],

  ships: [
    {
      id: 1,
      image: {
        path: "../public/images/ships/ship-lv1.png",
      },
      reload: 2000,
      levelId: 1,
    },

    {
      id: 2,
      image: {
        path: "../public/images/ships/ship-lv2.png",
      },
      reload: 1800,
      levelId: 3,
    },

    {
      id: 3,
      image: {
        path: "../public/images/ships/ship-lv3.png",
      },
      reload: 1600,
      levelId: 5,
    },

    {
      id: 4,
      image: {
        path: "../public/images/ships/ship-lv4.png",
      },
      reload: 1400,
      levelId: 7,
    },

    {
      id: 5,
      image: {
        path: "../public/images/ships/ship-lv5.png",
      },
      reload: 1200,
      levelId: 9,
    },
  ],

  missiles: [
    {
      id: 1,
      image: {
        path: "../public/images/missiles/missile-lv1.png",
      },
      speed: 0.4,
      levelId: 1,
    },

    {
      id: 2,
      image: {
        path: "../public/images/missiles/missile-lv2.png",
      },
      speed: 0.5,
      levelId: 5,
    },

    {
      id: 3,
      image: {
        path: "../public/images/missiles/missile-lv3.png",
      },
      speed: 0.6,
      levelId: 9,
    },
  ],
  backgrounds: [
    {
      id: 1,
      image: {
        path: "../public/images/backgrounds/earth-system.jpg",
      },
      title: "Earth system",
      levelId: 1,
    },
    {
      id: 2,
      image: {
        path: "../public/images/backgrounds/alongside-voyager.jpg",
      },
      title: "Alongside Voyager",
      levelId: 1,
    },
    {
      id: 3,
      image: {
        path: "../public/images/backgrounds/solar-eclipse.jpg",
      },
      title: "Solar eclipse",
      levelId: 1,
    },
    {
      id: 4,
      image: {
        path: "../public/images/backgrounds/ice-belt.jpg",
      },
      title: "Ice belt",
      levelId: 1,
    },
    {
      id: 5,
      image: {
        path: "../public/images/backgrounds/inhabited-planet.jpg",
      },
      title: "Inhabited planet",
      levelId: 1,
    },
    {
      id: 6,
      image: {
        path: "../public/images/backgrounds/interstellar-cloud.jpg",
      },
      title: "Interstellar cloud",
      levelId: 1,
    },
    {
      id: 7,
      image: {
        path: "../public/images/backgrounds/rock-belt.jpg",
      },
      title: "Rock belt",
      levelId: 1,
    },
  ],
};
