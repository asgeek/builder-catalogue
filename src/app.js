import express from 'express';

import inventoryRoutes from './routes/inventoryRoutes.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use(inventoryRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));