const express = require('express');
const app = express();
const { PORT } = require('../config/config');
const mocksRouter = require('./routes/mocks.router');
const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI, PORT } = process.env;
const setupSwagger = require('./config/swagger');
setupSwagger(app);


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB establecida'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));


app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api/mocks', mocksRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
