const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("SECRET_KEY nu este definit! Verifică fișierul .env.");
  process.exit(1);
}

exports.login = async (req, res)=>  {
  console.log("Cerere primita pe /api/login:", req.body); 
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "Token-ul Firebase este necesar" });
  }

  try {
    
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    
    const jwtToken = jwt.sign({ uid, email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token: jwtToken, user: { uid, email } });
  } catch (error) {
    console.error("Eroare la validarea token-ului Firebase:", error);
    res.status(401).json({ message: "Token Firebase invalid sau expirat" });
  }
};


exports.signup = async (req, res)=>  {
    const { idToken } = req.body;
  
    if (!idToken) {
      return res.status(400).json({ message: "Token-ul Firebase este necesar" });
    }
  
    try {
      
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email } = decodedToken;
  
    
       if (!email.endsWith("@vet.ro")) {
        return res.status(403).json({ message: "Inregistrarea este disponibila doar pentru doctori!" });
      }
  
      const SECRET_KEY = process.env.SECRET_KEY;
      const jwtToken = jwt.sign({ uid, email }, SECRET_KEY, { expiresIn: "1h" });
  
      await db.collection("users").doc(uid).set({ email });
  
      res.json({ token: jwtToken, user: { uid, email } });
    } catch (error) {
      console.error("Eroare la validarea token-ului Firebase:", error);
      res.status(401).json({ message: "Token Firebase invalid sau expirat" });
    }
  };