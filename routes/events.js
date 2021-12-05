const {Router} = require('express');
const {validateJWT} = require('../middlewares/validate-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);

//Obtener eventos
router.get('/', getEvents);

//Crear evento
router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validateFields
  ],
  createEvent);

//Actualizar evento
router.put(
  '/:id',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validateFields
  ],
  updateEvent);

//Eliminar evento
router.delete('/:id', deleteEvent);


module.exports = router;