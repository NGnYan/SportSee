export function transformFactory(type = "none") {
  const transforms = {
    none: (userData) => userData,

    activity: (data) => {
      if (!data || !data.sessions) return [];
      return data.sessions.map((session, index) => ({
        day: index + 1,
        kilogram: session.kilogram,
        calories: session.calories,
      }));
    },

    sessions: (data) => {
      if (!data || !data.sessions) return [];
      const days = ["L", "M", "M", "J", "V", "S", "D"];
      return data.sessions.map((s, i) => ({
        day: days[i],
        sessionLength: s.sessionLength,
      }));
    },

    performance: (performance) => {
      if (!performance || !performance.data) return [];
      const kindFR = {
        cardio: "Cardio",
        energy: "Énergie",
        endurance: "Endurance",
        strength: "Force",
        speed: "Vitesse",
        intensity: "Intensité",
      };

      return performance.data.map((item) => ({
        subject:
          kindFR[performance.kind[item.kind]] || performance.kind[item.kind],
        value: item.value,
      }));
    },

    score: (userData) => {
      if (!userData) return 0;
      const score = userData.todayScore ?? userData.score ?? 0;
      return score < 1 ? Math.round(score * 100) : Math.round(score);
    },
  };

  return transforms[type] || transforms.none;
}
