import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // 1. Get token from header
    // The client typically sends it as 'Authorization: Bearer <TOKEN>'
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, authorization denied." });
    }

    // Extract the token part
    const token = authHeader.split(' ')[1];
    if (!token) {
        // This case should ideally be caught by the startsWith check, but good for explicit safety
        return res.status(401).json({ message: "No token, authorization denied." });
    }

    try {
        // 2. Verify token
        // Use the same secret key used to sign the token
        const decoded = jwt.verify(token, "process.env.JWT_SECRET");

        // 3. Attach user info to request object
        // Now, in your route handlers, you can access req.user
        req.user = decoded; // 'decoded' contains { id: user._id, email: user.email }

        // 4. Proceed to the next middleware/route handler
        next();

    } catch (error) {
        console.error("Token verification failed:", error);
        // Handle different JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired." });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Token invalid." });
        }
        return res.status(500).json({ message: "Failed to authenticate token." });
    }
};

export default verifyToken;