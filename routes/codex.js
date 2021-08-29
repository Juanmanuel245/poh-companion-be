/*
    Rutas de Room
    host + /api/codex
*/
const { Router } = require('express');
const { createCodex, getCodexByMeta, getCodex, getCodexes } = require('../controllers/codex');
const { validateJWT } = require('../middlewares/jwtValidator');

const router = Router();

// Obtener todos los instructivos
router.get('/codexes', getCodexes);

// Obtener instructivo
router.get('/:id', getCodex);

// Obtener instructivos que coincidan con las palabras de busqueda
router.post('/find', getCodexByMeta);


// Todas las rutas por debajo de esta linea deben pasar por el JWT
router.use( validateJWT );

// Crear un nuevo instructivo
router.post( '/add', createCodex );

module.exports = router;