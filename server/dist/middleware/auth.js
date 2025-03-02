"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(token, secret) {
    try {
        // Verify the token
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (typeof user === 'string') {
            console.error("JWT verify returned string", user);
            return null;
        }
        // Success: return user
        return user;
    }
    catch (error) {
        // Failure: invalid token
        return null;
    }
}
// Middleware to Verify Token
function authenticate(req, res, next) {
    try {
        // Parse the request
        const token = req.headers.authorization?.split(' ')[1];
        // Validate the request
        // if (!("user"  in req)) {
        //   console.error("Authentication failed: request does not have field 'user'")
        //   // res.status(400).json({ message: 'Invalid request' }); 
        //   // return; 
        // } 
        if (!token) {
            console.error("Authentication failed: request does not contain a token");
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        // Check secret key
        if (typeof process.env.SECRET !== 'string' || !process.env.SECRET) {
            console.error("Could not find secret...");
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        // Verify the token
        const verifiedUser = verifyToken(token, process.env.SECRET);
        if (!verifiedUser) {
            // Failure: invalid token
            console.log("Invalid token");
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        // Success: user authorized
        req.user = verifiedUser;
        next();
    }
    catch (error) {
        // Failure: unknown error
        console.error("Unknown error", error);
        res.status(400).json({ message: 'Internal server error' });
        return;
    }
}
;
