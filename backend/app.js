
const express = require('express');
const app = express();
const httpLogger = require('morgan');
const cors = require('cors');
//const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const { admin, db } = require('./firebaseadmin.js'); 

require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/', routes);

app.use(httpLogger('dev'));
app.use(cors()) 
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 
const { verifyToken } = require('./middleware/auth'); 




const SECRET_KEY = process.env.SECRET_KEY; 

if (!SECRET_KEY) {
  console.error("SECRET_KEY nu este definit! Verifică fișierul .env.");
  process.exit(1);
}

app.post("/api/login", async (req, res) => {
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
});



app.post("/api/signup", async (req, res) => {
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
});



app.post("/api/pets",verifyToken,  async (req, res) => {
  const petData = req.body;

  try {
    console.log("Date primite din frontend:", petData); 
    const docRef = await db.collection("pets").add(petData);
    res.status(201).json({ id: docRef.id, message: "Animalul a fost adaugat cu succes!" });
  } catch (error) {
    console.error("Eroare la salvarea datelor:", error);
    res.status(500).json({ error: "Eroare la salvarea datelor." });
  }
});


app.get("/api/pets",  async (req, res) => {
  try {
    const snapshot = await db.collection("pets").get();
    const pets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(pets);
  } catch (error) {
    console.error("Eroare la citirea datelor:", error);
    res.status(500).json({ error: "Eroare la citirea datelor." });
  }
});



app.get("/api/pets/:id", async (req, res) => {
  const petId = req.params.id; 
  try {
  
    const petDoc = await db.collection("pets").doc(petId).get();

  
    if (!petDoc.exists) {
      return res.status(404).json({ message: "Animalul nu a fost gasit!" });
    }

      res.status(200).json({
      id: petDoc.id,   
      ...petDoc.data(), 
    });
  } catch (error) {
    console.error("Eroare la citirea datelor:", error);
    res.status(500).json({ error: "Eroare la citirea datelor." });
  }
});



app.delete("/api/pets/:id",verifyToken, async (req, res) => {
  const petId = req.params.id;
  
  try {
  
    await db.collection("pets").doc(petId).delete();
    res.status(200).json({ message: "Pacient sters cu succes" });
  } catch (error) {
    console.error("Eroare la stergerea pacientului:", error);
    res.status(500).json({ error: "Eroare la stergerea pacientului" });
  }
});

app.put("/api/pets/:id",verifyToken, async (req, res) => {
  const petId = req.params.id;
  const updatedPetData = req.body;
  
  try {
  
    await db.collection("pets").doc(petId).update(updatedPetData );
    res.status(200).json({ message: "Pacientul a fost actualizat cu succes" });
  } catch (error) {
    console.error("Eroare la actualizarea pacientului:", error);
    res.status(500).json({ error: "Eroare la actualizarea pacientului" });
  }
});

app.post("/api/file",verifyToken, async (req, res) => {
  const fileData = req.body;
  try {
    
    console.log("Date primite din frontend:", fileData); 
    const fileWithPetData = {
      ...fileData,
      petId: fileData.petId, 
      petIdentificationNumber: fileData.petIdentificationNumber, 
  };

    const docRef = await db.collection("files").add(fileWithPetData);
    res.status(201).json({ id: docRef.id, message: "Fisa a fost adaugata cu succes!" });
  } catch (error) {
    console.error("Eroare la salvarea datelor:", error);
    res.status(500).json({ error: "Eroare la salvarea datelor." });
  }
});

app.get("/api/files/:id", async (req, res) => {
  const petId = req.params.id; 

  try {
    const snapshot = await db.collection("files")
      .where("petId", "==", petId) 
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Nu au fost gasite fise pentru acest animal." });
    }

    const files = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(files);
    
  } catch (error) {
    console.error("Eroare la citirea fiselor:", error);
    res.status(500).json({ error: "Eroare la citirea fiselor." });
  }
});


app.get("/api/file/:id", async (req, res) => {
  const fileId = req.params.id; 
  try {
  
    const fileDoc = await db.collection("files").doc(fileId).get();

  
    if (!fileDoc.exists) {
      return res.status(404).json({ message: "Fisa nu a fost gasita!" });
    }

      res.status(200).json({
      id: fileDoc.id,   
      ...fileDoc.data(), 
    });
  } catch (error) {
    console.error("Eroare la citirea datelor:", error);
    res.status(500).json({ error: "Eroare la citirea datelor." });
  }

});



app.put("/api/file/:id",verifyToken,  async (req, res) => {
  const fileId = req.params.id;
  const updatedFileData = req.body;
  
  try {
  
    await db.collection("files").doc(fileId).update(updatedFileData );
    res.status(200).json({ message: "Fisa a fost actualizata cu succes" });
  } catch (error) {
    console.error("Eroare la actualizarea fisei:", error);
    res.status(500).json({ error: "Eroare la actualizarea fisei" });
  }
});

app.delete("/api/file/:id",verifyToken,  async (req, res) => {
  const fileId = req.params.id;
  
  try {
  
    await db.collection("files").doc(fileId).delete();
    res.status(200).json({ message: "Fisa stearsa cu succes" });
  } catch (error) {
    console.error("Eroare la stergerea fisei:", error);
    res.status(500).json({ error: "Eroare la stergerea fisei" });
  }
});





app.listen(port, () => {

  console.log(`Example app listening on port ${port}!`)
});


console.log(" SECRET_KEY:", SECRET_KEY ? " SETAT" : "LIPSEȘTE!");


