import { body, param, query } from "express-validator";

export const productCreateRules = [
  body("name").isString().isLength({ min: 2, max: 120 }),
  body("price").isFloat({ gt: 0 }),
  body("description").optional().isString().isLength({ max: 2000 }),
  body("category").optional().isString().isLength({ max: 120 }),
  body("images").optional().isArray(),
  body("images.*").optional().isURL(),
  body("stock").optional().isInt({ min: 0 }),
];

export const productUpdateRules = [
  param("id").isMongoId(),
  body("name").optional().isString().isLength({ min: 2, max: 120 }),
  body("price").optional().isFloat({ gt: 0 }),
  body("description").optional().isString().isLength({ max: 2000 }),
  body("category").optional().isString().isLength({ max: 120 }),
  body("images").optional().isArray(),
  body("images.*").optional().isURL(),
  body("stock").optional().isInt({ min: 0 }),
];

export const paginationRules = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

export const cartAddRules = [
  body("productId").isMongoId(),
  body("quantity").isInt({ min: 1 }),
];

export const cartUpdateRules = [
  body("items").isArray({ min: 1 }),
  body("items.*.productId").isMongoId(),
  body("items.*.quantity").isInt({ min: 0 }),
];

export const paymentVerifyRules = [
  body("razorpay_order_id").isString().notEmpty(),
  body("razorpay_payment_id").isString().notEmpty(),
  body("razorpay_signature").isString().notEmpty(),
  body("orderId").isMongoId(), // our Order _id
];
