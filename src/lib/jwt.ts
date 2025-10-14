import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export const jwtUtils = {
  sign: (payload: object) => jwt.sign(payload, SECRET, { expiresIn: "1h" }),
  verify: (token: string) => {
    try {
      return jwt.verify(token, SECRET);
    } catch {
      return null;
    }
  },
};
