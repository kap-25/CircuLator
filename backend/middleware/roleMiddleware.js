// Role-based access control

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated."
      });
    }

    if (req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({
        message: "Access denied: Insufficient privileges."
      });
    }
  };
};

module.exports = roleMiddleware;
