import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

export const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const result = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUser(validatedData);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const result = await getCurrentUser(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};