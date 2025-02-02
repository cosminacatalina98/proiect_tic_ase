const { db } = require("../firebaseadmin");


exports.addFile = async (req, res)=>  {
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
  };


  exports.getFilesbyPetId = async (req, res)=> {
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
  };