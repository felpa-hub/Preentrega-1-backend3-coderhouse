const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

/**
 * @swagger
 * /adoptions:
 *   get:
 *     summary: Obtiene todas las adopciones.
 *     responses:
 *       200:
 *         description: Lista de adopciones.
 */
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('user').populate('pet');
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /adoptions:
 *   post:
 *     summary: Crea una nueva adopción.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               pet:
 *                 type: string
 *             required:
 *               - user
 *               - pet
 *     responses:
 *       201:
 *         description: Adopción creada correctamente.
 */
router.post('/', async (req, res) => {
  const { user, pet } = req.body;
  const adoption = new Adoption({ user, pet });
  try {
    const newAdoption = await adoption.save();
    res.status(201).json(newAdoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /adoptions/{id}:
 *   get:
 *     summary: Obtiene una adopción por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción.
 *     responses:
 *       200:
 *         description: Adopción encontrada.
 *       404:
 *         description: Adopción no encontrada.
 */
router.get('/:id', async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id).populate('user').populate('pet');
    if (!adoption) return res.status(404).json({ message: 'Adopción no encontrada' });
    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /adoptions/{id}:
 *   delete:
 *     summary: Elimina una adopción.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción a eliminar.
 *     responses:
 *       200:
 *         description: Adopción eliminada.
 *       404:
 *         description: Adopción no encontrada.
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdoption = await Adoption.findByIdAndDelete(req.params.id);
    if (!deletedAdoption) return res.status(404).json({ message: 'Adopción no encontrada' });
    res.json({ message: 'Adopción eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
