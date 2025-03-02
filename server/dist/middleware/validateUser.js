"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUser(req, res, next) {
    // Check user data
    if (!req.user || !req.user._id || !req.user.username) {
        // Failure: invalid request, invalid user data
        console.error("Invalid request: invalid user data", req.user);
        res.status(400).json({ message: 'Invalid request' });
        return false;
    }
    // Call next function
    next();
}
exports.default = validateUser;
