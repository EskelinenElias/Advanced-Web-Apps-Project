"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUser(req, res, next) { }
if (!req.user || !req.user._id || !req.user.username) {
    console.error("Invalid request: invalid user data", req.user);
    res.status(400).json({ message: 'Invalid request' });
    return;
}
