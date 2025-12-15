import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mocks/mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Retrieves the main data of a user.
 * Uses either mock data or the API depending on the configuration.
 *
 * @param {number} userId - Unique identifier of the user.
 * @returns {Promise<Object>} User main data.
 */
export async function getUserMainData(userId) {
  if (USE_MOCK) {
    const user = USER_MAIN_DATA.find((u) => u.id === userId);
    return user;
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}`);
    const data = await res.json();
    return data.data;
  }
}

/**
 * Retrieves the daily activity data of a user.
 *
 * @param {number} userId - Unique identifier of the user.
 * @returns {Promise<Object>} User activity data.
 * @throws {Error} If mock activity data cannot be found.
 */
export async function getUserActivity(userId) {
  if (USE_MOCK) {
    const userActivity = USER_ACTIVITY.find((u) => u.userId === userId);
    if (!userActivity)
      throw new Error(`Activité pour l'utilisateur ${userId} introuvable`);
    return userActivity;
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/activity`);
    const data = await res.json();
    return data.data;
  }
}

/**
 * Retrieves the average session duration data of a user.
 *
 * @param {number} userId - Unique identifier of the user.
 * @returns {Promise<Object>} User average session data.
 * @throws {Error} If mock average session data cannot be found.
 */
export async function getUserAverageSessions(userId) {
  if (USE_MOCK) {
    const userAverage = USER_AVERAGE_SESSIONS.find((u) => u.userId === userId);
    if (!userAverage)
      throw new Error(
        `Sessions moyennes pour l'utilisateur ${userId} introuvables`
      );
    return userAverage;
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`);
    const data = await res.json();
    return data.data;
  }
}

/**
 * Retrieves the performance data of a user by activity type.
 *
 * @param {number} userId - Unique identifier of the user.
 * @returns {Promise<Object>} User performance data.
 * @throws {Error} If mock performance data cannot be found.
 */
export async function getUserPerformance(userId) {
  if (USE_MOCK) {
    const userPerformance = USER_PERFORMANCE.find((u) => u.userId === userId);
    if (!userPerformance)
      throw new Error(`Performance de l'utilisateur ${userId} introuvable`);
    return userPerformance;
  } else {
    const res = await fetch(`${API_BASE_URL}/user/${userId}/performance`);
    const data = await res.json();
    return data.data;
  }
}
