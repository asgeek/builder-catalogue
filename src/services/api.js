import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const BASE_URL = process.env.API_URL;

/**
 * Fetch all sets from the catalogue.
 * @returns {Promise<Array>} A promise that resolves to an array of sets.
 */
export const fetchAllSets = async () => {
    const response = await axios.get(`${BASE_URL}/api/sets`);
    if (!response.status == '200') {
        throw new Error('Failed to fetch sets');
    }
    return response.data;
}

/**
 * Fetch full data for a single set by its ID.
 * @param {string} setId - The ID of the set.
 * @returns {Promise<Object>} A promise that resolves to the set data.
 */
export const fetchSetById = async (setId) => {
    const response = await axios.get(`${BASE_URL}/api/set/by-id/${setId}`);
    if (!response.status == '200') {
        throw new Error(`Failed to fetch set with ID: ${setId}`);
    }
    return response.data;
}

/**
 * Fetch summary for a single set by its name.
 * @param {string} setName - The name of the set.
 * @returns {Promise<Object>} A promise that resolves to the set summary.
 */
export const fetchSetByName = async (setName) => {

    console.log(setName);
    const response = await axios.get(`${BASE_URL}/api/set/by-name/${setName}`);
    if (!response.status == '200') {
        throw new Error(`Failed to fetch set with name: ${setName}`);
    }
    return response.data;
}

/**
 * Fetch all users
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const fetchAllUsers = async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    if (!response.status == '200') {
        throw new Error(`Failed to fetch all users`);
    }
    return response.data;
}

/**
 * Fetch full data for a single user by its ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const fetchUserById = async (userId) => {
    const response = await axios.get(`${BASE_URL}/api/user/by-id/${userId}`);
    if (!response.status == '200') {
        throw new Error(`Failed to fetch user with ID: ${userId}`);
    }
    return response.data;
}

/**
 * Fetch full data for a single user by its username.
 * @param {string} username - The username of the user.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 */
export const fetchUserByUsername = async (username) => {
    const response = await axios.get(`${BASE_URL}/api/user/by-username/${username}`);
    if (!response.status == '200') {
        throw new Error(`Failed to fetch user with username: ${username}`);
    }
    return response.data;    
}