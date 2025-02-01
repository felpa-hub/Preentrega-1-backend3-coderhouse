const express = require('express');
const app = express();
const { PORT } = require('../config/config');
const mocksRouter = require('./routes/mocks.router');

app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api/mocks', mocksRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
