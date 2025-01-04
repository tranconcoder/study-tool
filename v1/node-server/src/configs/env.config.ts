import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
    path: `.env.${NODE_ENV}`,
    override: true,
});

// Server configuration
export const HOST = process.env.HOST || "0.0.0.0";
export const PORT = Number(process.env.PORT) || 3000;
