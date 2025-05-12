import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { id, ...userData } = req.body;
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
  const allowedFields = Object.keys(USER).filter(field => field !== 'id');
  
  const invalidFields = Object.keys(userData).filter(
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
    field => !Object.keys(userData).includes(field)
  );
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  const { email, phone, password } = userData;
  
  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({
      error: true,
      message: "Email must be from @gmail domain"
    });
  }
  
  if (!/^\+380\d{9}$/.test(phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone must be in format +380XXXXXXXXX"
    });
  }
  
  if (typeof password !== 'string' || password.length < 4) {
    return res.status(400).json({
      error: true,
      message: "Password must be a string with at least 4 characters"
    });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { id, ...userData } = req.body;
  const allowedFields = Object.keys(USER).filter(field => field !== 'id');
  
  const invalidFields = Object.keys(userData).filter(
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

  if (Object.keys(userData).length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one field must be present for update"
    });
  }

  if ('email' in userData && !userData.email.endsWith('@gmail.com')) {
    return res.status(400).json({
      error: true,
      message: "Email must be from @gmail domain"
    });
  }
  
  if ('phone' in userData && !/^\+380\d{9}$/.test(userData.phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone must be in format +380XXXXXXXXX"
    });
  }
  
  if ('password' in userData && 
      (typeof userData.password !== 'string' || userData.password.length < 4)) {
    return res.status(400).json({
      error: true,
      message: "Password must be a string with at least 4 characters"
    });
  }

  next();
};

export { createUserValid, updateUserValid };