const { faker } = require('@faker-js/faker');
const { admin, db } = require('./firebaseadmin'); 

async function generateAndStoreData(petsCount = 30) {
  const batch = db.batch(); 

  for (let i = 0; i < petsCount; i++) {
    const petRef = db.collection("pets").doc();

    const petData = {
      name: faker.person.firstName(), 
      identificationNumber: faker.string.uuid(), 
      species: faker.helpers.arrayElement(["Câine", "Pisica", "Papagal", "Iepure"]), 
      breed: faker.animal.dog(), 
      gender: faker.helpers.arrayElement(["Mascul", "Femelă"]), 
      color: faker.color.human(),
      birthday: faker.date.past({ years: 10 }).toISOString().split("T")[0], 
      weight: faker.number.float({ min: 1, max: 40, precision: 0.1 }), 
      vet: faker.person.fullName(), 
      owner: {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
      },
    };

    batch.set(petRef, petData); 


    const filesCount = faker.number.int({ min: 1, max: 7 });

    for (let j = 0; j < filesCount; j++) {
      const fileRef = db.collection("files").doc(); 

      const fileData = {
        petId: petRef.id, 
        petIdentificationNumber: petData.identificationNumber, 
        filedate: faker.date.recent({ days: 100 }).toISOString().split("T")[0], 
        symptom: faker.lorem.words(3),
        diagnostic: faker.lorem.sentence(),
        treatment: faker.lorem.sentence(),
        recomandations: faker.lorem.sentence(),
        doctor: faker.person.fullName(), 
      };

      batch.set(fileRef, fileData); 
    }
  }


  await batch.commit();
  console.log(` ${petsCount} animale si fisele lor medicale au fost adaugate în Firestore.`);
}


generateAndStoreData()
  .then(() => console.log("Generare date completa!"))
  .catch((error) => console.error("Eroare la generarea datelor:", error));
