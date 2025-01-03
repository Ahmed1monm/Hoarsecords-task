import * as path from "path";
import dotenv from "dotenv";

dotenv.config();
const root_dir = path.join(__dirname, "..");

const config = {
    root_dir,
    port: process.env.PORT || 3000,
};

export default config;
