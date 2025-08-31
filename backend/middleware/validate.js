import { validationResult } from "express-validator";

export const validate = (rules) => async (req, res, next) => {
  await Promise.all(rules.map((r) => r.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Validation failed", errors: errors.array() });
  }
  next();
};
