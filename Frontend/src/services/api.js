const USE_MOCK = true;
const API_BASE_URL = "http://localhost:3000";

const USER_MAIN_DATA = [
  {
    id: 12,
    userInfos: { firstName: "Karl", lastName: "Dovineau", age: 31 },
    todayScore: 0.12,
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50,
    },
  },
  {
    id: 18,
    userInfos: { firstName: "Cecilia", lastName: "Ratorez", age: 34 },
    score: 0.3,
    keyData: {
      calorieCount: 2500,
      proteinCount: 90,
      carbohydrateCount: 150,
      lipidCount: 120,
    },
  },
];

const USER_ACTIVITY = [
  {
    userId: 12,
    sessions: [
      {
        day: "2020-07-01",
        kilogram: 80,
        calories: 240,
      },
      {
        day: "2020-07-02",
        kilogram: 80,
        calories: 220,
      },
      {
        day: "2020-07-03",
        kilogram: 81,
        calories: 280,
      },
      {
        day: "2020-07-04",
        kilogram: 81,
        calories: 290,
      },
      {
        day: "2020-07-05",
        kilogram: 80,
        calories: 160,
      },
      {
        day: "2020-07-06",
        kilogram: 78,
        calories: 162,
      },
      {
        day: "2020-07-07",
        kilogram: 76,
        calories: 390,
      },
    ],
  },
  {
    userId: 18,
    sessions: [
      {
        day: "2020-07-01",
        kilogram: 70,
        calories: 240,
      },
      {
        day: "2020-07-02",
        kilogram: 69,
        calories: 220,
      },
      {
        day: "2020-07-03",
        kilogram: 70,
        calories: 280,
      },
      {
        day: "2020-07-04",
        kilogram: 70,
        calories: 500,
      },
      {
        day: "2020-07-05",
        kilogram: 69,
        calories: 160,
      },
      {
        day: "2020-07-06",
        kilogram: 69,
        calories: 162,
      },
      {
        day: "2020-07-07",
        kilogram: 69,
        calories: 390,
      },
    ],
  },
];

const USER_AVERAGE_SESSIONS = [
  {
    userId: 12,
    sessions: [
      {
        day: 1,
        sessionLength: 30,
      },
      {
        day: 2,
        sessionLength: 23,
      },
      {
        day: 3,
        sessionLength: 45,
      },
      {
        day: 4,
        sessionLength: 50,
      },
      {
        day: 5,
        sessionLength: 0,
      },
      {
        day: 6,
        sessionLength: 0,
      },
      {
        day: 7,
        sessionLength: 60,
      },
    ],
  },
  {
    userId: 18,
    sessions: [
      {
        day: 1,
        sessionLength: 30,
      },
      {
        day: 2,
        sessionLength: 40,
      },
      {
        day: 3,
        sessionLength: 50,
      },
      {
        day: 4,
        sessionLength: 30,
      },
      {
        day: 5,
        sessionLength: 30,
      },
      {
        day: 6,
        sessionLength: 50,
      },
      {
        day: 7,
        sessionLength: 50,
      },
    ],
  },
];

function simulateNetworkDelay(data, delay = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export async function getUserMainData(userId) {
  if (USE_MOCK) {
    const user = USER_MAIN_DATA.find((u) => u.id === userId);
    return simulateNetworkDelay(user);
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}`);
    const data = await res.json();
    return data.data;
  }
}

export async function getUserActivity(userId) {
  if (USE_MOCK) {
    const userActivity = USER_ACTIVITY.find((u) => u.userId === userId);
    if (!userActivity)
      throw new Error(`Activité pour user ${userId} introuvable`);
    return simulateNetworkDelay(userActivity);
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
    const data = await res.json();
    return data.data;
  }
}

export async function getUserAverageSessions(userId) {
  if (USE_MOCK) {
    const userAverage = USER_AVERAGE_SESSIONS.find((u) => u.userId === userId);
    if (!userAverage)
      throw new Error(`Sessions moyennes pour user ${userId} introuvables`);
    return simulateNetworkDelay(userAverage);
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
    const data = await res.json();
    return data.data;
  }
}
