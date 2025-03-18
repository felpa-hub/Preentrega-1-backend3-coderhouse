const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtiene todas las mascotas.
 *     responses:
 *       200:
 *         description: Lista de mascotas.
 */
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crea una nueva mascota.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               owner:
 *                 type: string
 *             required:
 *               - type
 *               - name
 *               - age
 *     responses:
 *       201:
 *         description: Mascota creada correctamente.
 */
router.post('/', async (req, res) => {
  const { type, name, age, owner } = req.body;
  const pet = new Pet({ type, name, age, owner });
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtiene una mascota por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota.
 *     responses:
 *       200:
 *         description: Mascota encontrada.
 *       404:
 *         description: Mascota no encontrada.
 */
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner');
    if (!pet) return res.status(404).json({ message: 'Mascota no encontrada' });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Actualiza una mascota.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota actualizada.
 *       404:
 *         description: Mascota no encontrada.
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ message: 'Mascota no encontrada' });
    res.json(updatedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Elimina una mascota.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a eliminar.
 *     responses:
 *       200:
 *         description: Mascota eliminada.
 *       404:
 *         description: Mascota no encontrada.
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: 'Mascota no encontrada' });
    res.json({ message: 'Mascota eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
