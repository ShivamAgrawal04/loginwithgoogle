import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    const bearer = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    const finalToken = token || bearer;

    if (!finalToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(finalToken, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized or invalid token",
    });
  }
};

export default auth;
