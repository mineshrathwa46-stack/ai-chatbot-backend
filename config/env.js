import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "..", ".env");

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error("Failed to load .env file:", result.error);
}

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is not defined in environment variables.");
}

export default result;
