// src/middlewares/validation.middleware.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { Request, Response, NextFunction } from "express";

function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // تبدیل body به کلاس مربوطه
    const dtoInstance = plainToInstance(type, req.body);

    // ولیدیشن
    const errors = await validate(dtoInstance, {
      whitelist: true, // فقط فیلدهای موجود در DTO رو قبول کنه
      forbidNonWhitelisted: true, // اگر فیلدی اضافی باشه خطا بده
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    // اگر مشکلی نبود بریم مرحله بعد
    req.body = dtoInstance;
    next();
  };
}

export default validationMiddleware;
