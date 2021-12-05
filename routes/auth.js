/* Routas de usuarios / Auth
   host + /api/auth
*/   

const {Router} = require('express');
const {check} = require('express-validator')
const {createUser, userLogin, revToken} = require('../controllers/auth')
const {validateFields} = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Ingresa un email válido').isEmail(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({min: 6}),
    validateFields
  ],
   createUser );

router.post(
  '/login',
  [
    check('email', 'Ingresa un email válido').isEmail(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({min: 6}),
    validateFields
  ],
   userLogin );

router.get('/renew', validateJWT, revToken );

module.exports = router;