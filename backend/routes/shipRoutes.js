const express = require('express');
const { check } = require('express-validator');
const {
  getShipDetails,
  getAllShips,
  createShip
} = require('../controllers/shipController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/details', getShipDetails);
router.get('/', getAllShips);

router.post('/', [
  check('name', 'Ship name is required').not().isEmpty(),
  check('imo', 'Valid IMO number is required').matches(/^[0-9]{7}$/),
  check('type', 'Ship type is required').not().isEmpty(),
  check('flag', 'Flag country is required').not().isEmpty(),
  check('yearBuilt', 'Year built is required').isNumeric(),
  check('grossTonnage', 'Gross tonnage is required').isNumeric(),
  check('deadWeight', 'Deadweight tonnage is required').isNumeric(),
  check('length', 'Length is required').isNumeric(),
  check('beam', 'Beam is required').isNumeric(),
  check('owner', 'Owner information is required').not().isEmpty()
], createShip);

module.exports = router;