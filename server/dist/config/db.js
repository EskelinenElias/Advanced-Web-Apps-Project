"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDB(address) {
    try {
        // Connect to database
        const db = await mongoose_1.default.connect(address);
        return db.connection;
    }
    catch (error) {
        // Log error and throw new database connection error
        console.error(error);
        throw new Error(`Failed to connect to database at ${address}`);
    }
}
;
exports.default = connectToDB;
