import type { Request, Response, NextFunction } from "express";


// Check for authorization header in the request and respond with 401 if not p
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (typeof token === 'string' && token.toLowerCase() === `token 12345`) {
    next();
  } else {
    res.status(401).send({
      status: 401,
      error: true,
      message: "Unauthorized access"
    });
  }
};

export default authMiddleware;