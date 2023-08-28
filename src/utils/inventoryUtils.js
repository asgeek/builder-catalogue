export const matchInventoryToSets = (userById, setById) => {

    // Create a map of the user's inventory
    let userInventoryMap = {}; 
    for (let piece of userById.collection) {
        for (let variant of piece.variants) {
            let key = `${piece.pieceId}-${variant.color}`;
            userInventoryMap[key] = variant.count;
        }
    }
    
    // Check if the user has the required pieces for the set
    let canBuild = true;
    for (let piece of setById.pieces) {
        let key = `${piece.part.designID}-${piece.part.material}`;
        if (!userInventoryMap[key] || userInventoryMap[key] < piece.quantity) {
            canBuild = false;
            break;
        }
    }

    return canBuild;
};

export const findMissingPieces = (userCollection, setPieces) => {
    // Initialize an empty array to store missing pieces
    let missingPieces = [];

    // Iterate over each piece in the set
    setPieces.forEach(setPiece => {
        // Find the corresponding piece in the user's collection
        // Ensure userCollection is an array before proceeding
        let userPiece = Array.isArray(userCollection) ? userCollection.find(piece => piece.pieceId === setPiece.part.designID) : undefined;

        // If the piece is not found in the user's collection, add it to the missing pieces
        if (!userPiece) {
            missingPieces.push({
                pieceId: setPiece.part.designID,
                colorId: setPiece.part.material, 
                missingCount: setPiece.quantity
            });
        } else {
            // If the piece is found, check if the user has enough of each color
            let setColor = setPiece.part.material;
            let setUserColor = userPiece.variants.find(variant => variant.color === setColor.toString());

            // If the user doesn't have this color or doesn't have enough, add it to the missing pieces
            if (!setUserColor || setUserColor.count < setPiece.quantity) {
                missingPieces.push({
                    pieceId: setPiece.part.designID,
                    colorId: setColor,
                    missingCount: setUserColor ? setPiece.quantity - setUserColor.count : setPiece.quantity
                });
            }
        }
    })

    console.log(missingPieces);

    // Return the array of missing pieces
    return missingPieces;
}

export const findCollaborators = (user, missingPiece) => {
    
    let userForPiece;

    // Iterate over each piece in the user's collection
    user.collection.forEach(piece => {
        // Check if this piece matches the missing piece
        if (piece.pieceId === missingPiece.pieceId) {
            // If the piece matches, check if the user has the right color
            let colorVariant = piece.variants.find(variant => variant.color === missingPiece.colorId.toString());

            if (colorVariant && colorVariant.count >= missingPiece.missingCount) {
                // If the user has enough pieces of the right color, add this user to the list of users for this piece
                userForPiece = {
                    userId: user.id,
                    userName: user.username,
                    collaboration: colorVariant.count
                };
            }
        }
    });

    return userForPiece; 
}