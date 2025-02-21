// Type
import { Request, Response, NextFunction } from "express";

// Validate
import Joi from "joi";
import { loginSchema } from "../configs/joi.config";

// Handle exception
import { NotFoundException } from "../responses/error.response";
import { OkResponse } from "../responses/success.response";

// Service
import AuthService from "../services/auth.service";

export default class AuthController {
    public static async login(req: Request, res: Response, _: NextFunction) {
        try {
            // Validate request body
            const value = await loginSchema.validateAsync(req.body);

            new OkResponse({
                message: "Login successfully",
                metadata: await AuthService.login(
                    value.username,
                    value.password
                ),
            }).send(res);
        } catch (error) {
            if (error instanceof Joi.ValidationError) {
                throw new NotFoundException(
                    "Username and password is required"
                );
            } else throw error;
        }
    }
}
