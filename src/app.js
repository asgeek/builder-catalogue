import express from 'express';
// Corrected the path for inventoryRoutes

// The error was due to incorrect path to 'inventoryRoutes'. 
// It should be relative path './routes/inventoryRoutes' instead of 'routes/inventoryRoutes'
import inventoryRoutes from './routes/inventoryRoutes.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Your routes
app.use(inventoryRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));