//server app
const express = require('express');
const app = express();
const httpLogger = require('morgan');
const cors = require('cors');
const admin = require("firebase-admin");
const { db } = require('./firebaseadmin.js'); 

require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/', routes);

app.use(httpLogger('dev'));
app.use(cors()) 
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 


app.post("/api/pets", async (req, res) => {
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


app.get("/api/pets", async (req, res) => {
  try {
    const snapshot = await db.collection("pets").get();
    const pets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(pets);
  } catch (error) {
    console.error("Eroare la citirea datelor:", error);
    res.status(500).json({ error: "Eroare la citirea datelor." });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
