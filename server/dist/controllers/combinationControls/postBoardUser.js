"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = require("../../models/board");
const user_1 = require("../../models/user");
// Function to post a new board user
async function postBoardUsers(req, res) {
    try {
        // Validate the request
        if (!req.user || !req.user._id || !req.user.username) {
            console.error("Invalid request: invalid user data", req.user);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        if (!req.params) {
            console.error("Invalid request: can't GET board, board id not provided", req.params);
            res.status(400).json({ message: 'Invalid request' });
            return;
        }
        // Parse the request
        const { boardId, newUsername } = req.params;
        const userId = req.user._id;
        // Find board by board id
        const board = await board_1.Board.findOne({ _id: boardId });
        if (!board) {
            // Failure: board not found
            console.log(`Board ${boardId} not found.`);
            res.status(404).json({ message: "Board not found" });
            return;
        }
        // Board found; check that the user can access the board
        if (!(board.users.some((id) => id.toString() === userId))) {
            // Failure: user has no rights to access board
            console.log(`User has no rights to access board`);
            res.status(403).json({ message: "Can't access board" });
            return;
        }
        // Find the new user 
        console.log(`Adding user ${newUsername}...`);
        const newUser = await user_1.User.findOne({ username: newUsername });
        if (!newUser) {
            // Failure: user not found
            console.error("Can't add user: user not found");
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check if user is already in board
        if (board.users.some((id) => id.toString() === newUser._id.toString())) {
            // Failure: board already has user
            console.log("User not added: user already in board");
            res.status(304).json({ message: "User already added." });
            return;
        }
        // Add user to board
        board.users.push(newUser);
        await board.save();
        // Success: return usernames
        res.status(200).json({ message: "User added successfully", username: newUser.username });
        return;
    }
    catch (error) {
        // Failure: unknown error
        console.error("Error fetching user's boards:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}
exports.default = postBoardUsers;
