const Ship = require('../models/Ship');
const { validationResult } = require('express-validator');

// Mock ship data (in lieu of Equasis integration)
const mockShipData = [
  {
    name: "EVERGREEN",
    imo: "9811000",
    type: "Container Ship",
    flag: "Panama",
    yearBuilt: 2018,
    grossTonnage: 219000,
    deadWeight: 199000,
    length: 400,
    beam: 59,
    owner: "Evergreen Marine Corp",
    operator: "Evergreen Line",
    status: "Active"
  },
  {
    name: "MAERSK NEXUS",
    imo: "9359026",
    type: "Container Ship",
    flag: "Denmark",
    yearBuilt: 2014,
    grossTonnage: 151000,
    deadWeight: 146000,
    length: 366,
    beam: 48,
    owner: "Maersk Line",
    operator: "Maersk Line",
    status: "Active"
  },
  {
    name: "BLUE WHALE",
    imo: "9557291",
    type: "Bulk Carrier",
    flag: "Liberia",
    yearBuilt: 2011,
    grossTonnage: 91000,
    deadWeight: 81000,
    length: 292,
    beam: 45,
    owner: "Pacific Basin Shipping",
    operator: "Pacific Basin Shipping",
    status: "Active"
  },
  {
    name: "OCEAN VOYAGER",
    imo: "9231688",
    type: "Tanker",
    flag: "Marshall Islands",
    yearBuilt: 2009,
    grossTonnage: 81000,
    deadWeight: 115000,
    length: 249,
    beam: 44,
    owner: "Teekay Shipping",
    operator: "Teekay Tankers",
    status: "Active"
  },
  {
    name: "NORTHERN STAR",
    imo: "9198991",
    type: "Cruise Ship",
    flag: "Bahamas",
    yearBuilt: 2001,
    grossTonnage: 92000,
    deadWeight: 12000,
    length: 294,
    beam: 32,
    owner: "Star Cruises",
    operator: "Star Cruises",
    status: "Active"
  }
];


exports.getShipDetails = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a ship name'
      });
    }

    // Search in mock data (case insensitive)
    const ship = mockShipData.find(
      ship => ship.name.toLowerCase() === name.toLowerCase()
    );

    if (!ship) {
      return res.status(404).json({
        success: false,
        error: 'Ship not found'
      });
    }

    res.status(200).json({
      success: true,
      data: ship
    });
  } catch (err) {
    next(err);
  }
};


exports.getAllShips = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: mockShipData.length,
      data: mockShipData
    });
  } catch (err) {
    next(err);
  }
};


exports.createShip = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    
    const ship = await Ship.create(req.body);

    res.status(201).json({
      success: true,
      data: ship
    });
  } catch (err) {
    next(err);
  }
};