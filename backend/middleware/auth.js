
const { admin } = require('../firebaseadmin');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];  

  if (!token) {
    return res.status(403).json({ error: "Nu a fost furnizat un token" });
  }

  try {
  
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;  
    next();  
  } catch (error) {
    console.error("Eroare verificare token:", error);
    res.status(401).json({ error: "Token invalid sau expirat" });
  }
};

module.exports = { verifyToken };



