import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

// Load environment variables from .env file
dotenv.config();

const BASE_URL = process.env.API_URL;

const myCache = new NodeCache();

/**
 * Fetch all sets from the catalogue.
 * @returns {Promise<Array>} A promise that resolves to an array of sets.
 */
export const fetchAllSets = async () => {
    // Try to get the data from the cache
    let data = myCache.get("allSets");

    if (data == undefined) {
        // Data is not in the cache, fetch it from the API
        const response = await axios.get(`${BASE_URL}/api/sets`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch sets');
        }
        data = response.data;

        // Store the data in the cache for future use
        myCache.set("allSets", data, 3600); // Cache for 1 hour
    }
    return data;
}

/**
 * Fetch full data for a single set by its ID.
 * @param {string} setId - The ID of the set.
 * @returns {Promise<Object>} A promise that resolves to the set data.
 */
export const fetchSetById = async (setId) => {
    // Try to get the data from the cache
    let data = myCache.get(`set_${setId}`);

    if (data == undefined) {
        // Data is not in the cache, fetch it from the API
        const response = await axios.get(`${BASE_URL}/api/set/by-id/${setId}`);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch set with ID: ${setId}`);
        }
        data = response.data;

        // Store the data in the cache for future use
        myCache.set(`set_${setId}`, data, 3600); // Cache for 1 hour
    }
    return data;
}

/**
 * Fetch summary for a single set by its name.
 * @param {string} setName - The name of the set.
 * @returns {Promise<Object>} A promise that resolves to the set summary.
 */
export const fetchSetByName = async (setName) => {
    // Try to get the data from the cache
    let data = myCache.get(`set_${setName}`);

    if (data == undefined) {
        // Data is not in the cache, fetch it from the API
        const response = await axios.get(`${BASE_URL}/api/set/by-name/${setName}`);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch set with name: ${setName}`);
        }
        data = response.data;

        // Store the data in the cache for future use
        myCache.set(`set_${setName}`, data, 3600); // Cache for 1 hour
    }
    return data;
}

/**
 * Fetch all users
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const fetchAllUsers = async () => {
    // Try to get the data from the cache
    let data = myCache.get("allUsers");

    if (data == undefined) {
        // Data is not in the cache, fetch it from the API
        const response = await axios.get(`${BASE_URL}/api/users`);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch all users`);
        }
        data = response.data;

        // Store the data in the cache for future use
        myCache.set("allUsers", data, 3600); // Cache for 1 hour
    }
    return data;
}

/**
 * Fetch full data for a single user by its ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const fetchUserById = async (userId) => {
    // Try to get the data from the cache
    let data = myCache.get(`user_${userId}`);

    if (data == undefined) {
        // Data is not in the cache, fetch it from the API
        const response = await axios.get(`${BASE_URL}/api/user/by-id/${userId}`);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch user with ID: ${userId}`);
        }
        data = response.data;

        // Store the data in the cache for future use
        myCache.set(`user_${userId}`, data, 3600); // Cache for 1 hour
    }
    return data;
}

/**
 * Fetch full data for a single user by its username.
 * @param {string} username - The username of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const fetchUserByUsername = async (username) => {
    // Try to get the data from the cache
    let data = myCache.get(`user_${username}`);

    if (data == undefined) {
        // Data is not in the cache, fetch it from the API
        const response = await axios.get(`${BASE_URL}/api/user/by-username/${username}`);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch user with username: ${username}`);
        }
        data = response.data;

        // Store the data in the cache for future use
        myCache.set(`user_${username}`, data, 3600); // Cache for 1 hour
    }
    return data;
}