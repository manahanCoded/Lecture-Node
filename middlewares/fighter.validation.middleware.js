import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { id, ...fighterData } = req.body;
  const requiredFields = ['name', 'power', 'defense'];
  const allowedFields = Object.keys(FIGHTER).filter(field => field !== 'id');
  
  const invalidFields = Object.keys(fighterData).filter(
    field => !allowedFields.includes(field)
  );
  
  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Invalid fields: ${invalidFields.join(', ')}`
    });
  }

  if (id) {
    return res.status(400).json({
      error: true,
      message: "Id should not be present in request body"
    });
  }

  const missingFields = requiredFields.filter(
    field => !Object.keys(fighterData).includes(field)
  );
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  const { power, defense, health = FIGHTER.health } = fighterData;
  
  if (typeof power !== 'number' || power < 1 || power > 100) {
    return res.status(400).json({
      error: true,
      message: "Power must be a number between 1 and 100"
    });
  }
  
  if (typeof defense !== 'number' || defense < 1 || defense > 10) {
    return res.status(400).json({
      error: true,
      message: "Defense must be a number between 1 and 10"
    });
  }
  
  if (typeof health !== 'number' || health < 80 || health > 120) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120"
    });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { id, ...fighterData } = req.body;
  const allowedFields = Object.keys(FIGHTER).filter(field => field !== 'id');
  
  const invalidFields = Object.keys(fighterData).filter(
    field => !allowedFields.includes(field)
  );
  
  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Invalid fields: ${invalidFields.join(', ')}`
    });
  }

  if (id) {
    return res.status(400).json({
      error: true,
      message: "Id should not be present in request body"
    });
  }

  if (Object.keys(fighterData).length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one field must be present for update"
    });
  }

  if ('power' in fighterData && 
      (typeof fighterData.power !== 'number' || fighterData.power < 1 || fighterData.power > 100)) {
    return res.status(400).json({
      error: true,
      message: "Power must be a number between 1 and 100"
    });
  }
  
  if ('defense' in fighterData && 
      (typeof fighterData.defense !== 'number' || fighterData.defense < 1 || fighterData.defense > 10)) {
    return res.status(400).json({
      error: true,
      message: "Defense must be a number between 1 and 10"
    });
  }
  
  if ('health' in fighterData && 
      (typeof fighterData.health !== 'number' || fighterData.health < 80 || fighterData.health > 120)) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120"
    });
  }

  next();
};

export { createFighterValid, updateFighterValid };