// Import modules using ES6 syntax

import { fetchUserByUsername, fetchUserById, fetchAllSets, fetchSetById, fetchSetByName, fetchAllUsers } from '../services/api.js';
import { findMissingPieces, matchInventoryToSets, findCollaborators } from '../utils/inventoryUtils.js';

// Export function using ES6 syntax
export const getBuildableSets = async (req, res) => {

    // Get username from request parameters
    const username = req.params.username;

    // Fetch user inventory using the fetchUserByUsername function from api.js
    const userSummary = await fetchUserByUsername(username);

    const userDetails = await fetchUserById(userSummary.id);

    // Fetch all available sets using the fetchAllSets function from api.js
    const allSets = await fetchAllSets();

    let buildableSets = [];

    // For each LEGO set, fetch the required pieces and compare with user's inventory
    for (let legoSet of allSets.Sets) {
        // Fetch the required pieces for the set using the fetchSetById function from api.js
        const setDetails = await fetchSetById(legoSet.id);

        // Compare the required pieces with the user's inventory        
        if (matchInventoryToSets(userDetails, setDetails)) {
            buildableSets.push(legoSet);
        }
    }

    // Return the list of buildable sets
    res.json(buildableSets);
};


// Find missing peases to build a set
export const getMissingPieces = async (req, res) => {
    // Get username from the rquest parameters
    const username = req.params.username; 

    // Get setname from the request parameters
    const setName = req.params.setname;

    // Fetch user summary from the user by username api
    const userSummary = await fetchUserByUsername(username); 

    // Fetch user details from the user by id api
    const userDetails = await fetchUserById(userSummary.id); 

    // Fetch set summary from the set by name api
    const setSummary = await fetchSetByName(setName); 

    // Fetch set details from the set by id api
    const setDetails = await fetchSetById(setSummary.id);

    let missingPieces = findMissingPieces(userDetails, setDetails.pieces);

    res.json(missingPieces);
}


// Find collaborators to build a set
export const getCollaborators = async (req, res) => {
    // Get username from the rquest parameters
    const username = req.params.username; 

    // Get setname from the request parameters
    const setName = req.params.setname;

    // Fetch user summary from the user by username api
    const userSummary = await fetchUserByUsername(username); 

    // Fetch user details from the user by id api
    const userDetails = await fetchUserById(userSummary.id); 

    // Fetch set summary from the set by name api
    const setSummary = await fetchSetByName(setName); 

    // Fetch set details from the set by id api
    const setDetails = await fetchSetById(setSummary.id);

    // Fetch all users from the all users api
    const allUsers = await fetchAllUsers(); 

    // Create a list of missing pieces for a given set
    let missingPieces = findMissingPieces(userDetails, setDetails.pieces);

    let collaborators = []; 

    for (let missingPiece of missingPieces) {

        let usersForPiece = [];

        for (let user of allUsers.Users) {
                        
            // No need to check the inventory of the current user
            if (user.username !== username) {

                // Fetch user details to find the inventory of the user
                let userDetails = await fetchUserById(user.id);
                
                // Find the list of users who can collaborate with any given missing piece
                let userForPiece = findCollaborators(userDetails, missingPiece); 

                // Check if userForPiece is not null before pushing into usersForPiece array
                if(userForPiece) {
                    usersForPiece.push(userForPiece);
                }
            }
        }

        // If there are any users who can contribute this piece, add them to the list of collaborators
        if (usersForPiece.length > 0) {
            collaborators.push({
                pieceId: missingPiece.pieceId,
                colorId: missingPiece.colorId,
                missingPieces: missingPiece.missingCount,
                usersForPiece: usersForPiece
            });
        } 
        else {
            collaborators.push({
                pieceId: missingPiece.pieceId,
                colorId: missingPiece.colorId,
                missingPieces: missingPiece.missingCount,
                usersForPiece: "There are no users to collaborate with"
            });
        }

    }

    res.json(collaborators); 

}