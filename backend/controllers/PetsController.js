const { db } = require("../firebaseadmin");

exports.addPet = async (req, res)=> {
    const petData = req.body;
  
    if (
      !petData.name ||
      !petData.identificationNumber ||
      !petData.species ||
      !petData.breed ||
      !petData.gender ||
      !petData.color ||
      !petData.birthday ||
      !petData.vet ||
      !petData.weight ||
      !petData.owner ||
      !petData.owner.name ||
      !petData.owner.address ||
      !petData.owner.phone ||
      !petData.owner.email
    ) {
      return res.status(400).json({ error: "Toate câmpurile sunt obligatorii!" });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(petData.owner.email)) {
      return res.status(400).json({ error: "Email invalid!" });
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(petData.owner.phone)) {
      return res.status(400).json({ error: "Telefon invalid! Trebuie să aibă exact 10 cifre." });
    }
  
   
    if (isNaN(petData.weight) || petData.weight <= 0) {
      return res.status(400).json({ error: "Greutatea trebuie să fie un număr pozitiv!" });
    }
  
  
    const today = new Date();
    const birthDate = new Date(petData.birthday);
    if (birthDate > today) {
      return res.status(400).json({ error: "Data nașterii nu poate fi în viitor!" });
    }
  
  
  
  
  
  
    try {
      console.log("Date primite din frontend:", petData); 
      const docRef = await db.collection("pets").add(petData);
      res.status(201).json({ id: docRef.id, message: "Animalul a fost adaugat cu succes!" });
    } catch (error) {
      console.error("Eroare la salvarea datelor:", error);
      res.status(500).json({ error: "Eroare la salvarea datelor." });
    }
  };