// src/middlewares/validation.middleware.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { Request, Response, NextFunction } from "express";
import ClientErrors from "../errors/clientErrors.ts";

function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const clientError=new ClientErrors()
    // تبدیل body به کلاس مربوطه
    const dtoInstance = plainToInstance(type, req.body);


    // ولیدیشن
    const errors = await validate(dtoInstance, {
      whitelist: true, // فقط فیلدهای موجود در DTO رو قبول کنه
      forbidNonWhitelisted: true, // اگر فیلدی اضافی باشه خطا بده
    });


    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        messages: Object.values(err.constraints || {})
      }));
      clientError.data=[]
      clientError.errors=formattedErrors

      res.status(400).json(clientError);

      // res.status(400).json({
      //   success: false,
      //   message: "Validation failed",
      //   errors: formattedErrors
      // });
    }

    // اگر مشکلی نبود بریم مرحله بعد
    req.body = dtoInstance;
    next();
  };
}

export default validationMiddleware;
