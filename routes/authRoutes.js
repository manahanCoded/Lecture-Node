import { Router } from "express";
import { userService } from "../services/userService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = userService.search({ email });
      
      if (!user) {
        throw new Error("User not found");
      }
      
      if (user.password !== password) {
        throw new Error("Invalid password");
      }
      
      res.data = user;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };