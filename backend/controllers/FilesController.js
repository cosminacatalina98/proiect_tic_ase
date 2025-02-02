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

  exports.getFilebyId = async (req, res)=> {
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
  
  };

  
  exports.updateFile = async (req, res)=> {
  const fileId = req.params.id;
  const updatedFileData = req.body;
  
  try {
  
    await db.collection("files").doc(fileId).update(updatedFileData );
    res.status(200).json({ message: "Fisa a fost actualizata cu succes" });
  } catch (error) {
    console.error("Eroare la actualizarea fisei:", error);
    res.status(500).json({ error: "Eroare la actualizarea fisei" });
  }
};


exports.deleteFile = async (req, res)=> {
  const fileId = req.params.id;
  
  try {
  
    await db.collection("files").doc(fileId).delete();
    res.status(200).json({ message: "Fisa stearsa cu succes" });
  } catch (error) {
    console.error("Eroare la stergerea fisei:", error);
    res.status(500).json({ error: "Eroare la stergerea fisei" });
  }
};
  