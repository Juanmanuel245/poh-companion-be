/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/fieldValidator');
const { validateJWT } = require('../middlewares/jwtValidator');

router.post(
                '/new', 
                [
                    check('password', 'El password tiene que tener minimo 6 caracteres').isLength({ min: 6}),
                    validarCampos
                ],
                createUser
            );

router.post(
                '/', 
                [
                    validarCampos
                ],
                loginUser
            );

router.get('/renew', validateJWT ,renewToken);

module.exports = router;