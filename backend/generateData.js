const { faker } = require('@faker-js/faker');
const { admin, db } = require('./firebaseadmin'); 

function generateRomanianPhoneNumber() {
  return `07${faker.number.int({ min: 10000000, max: 99999999 })}`;
}

async function generateAndStoreData(petsCount = 30) {
  const batch = db.batch(); 

  for (let i = 0; i < petsCount; i++) {
    const petRef = db.collection("pets").doc();

    const symptoms = [ 
      "Letargie", "Pierderea apetitului", "Febră", "Dificultăți de respirație",
      "Strănut frecvent",  "Tuse persistentă",  "Diaree", "Vărsături", "Scurgeri oculare",
      "Scurgeri nazale", "Mâncărime excesivă", "Căderea blănii", "Slăbiciune musculară"
    ];

    const diagnoses = [
      "Otită cronică", "Dermatită alergică", "Infecție urinară", "Gastroenterită acută",
      "Insuficiență renală", "Artrită ", "Parvoviroză", "Otită externă",
      "Probleme dentare", "Leziune ligamentară"
  ];
  
  const treatments = [
      "Administrare antibiotic timp de 7 zile", "Dietă specializată și suplimente",
      "Curățare auriculară zilnică și picături antiinflamatoare",
      "Hidratare intravenoasă și monitorizare timp de 48h",
      "Tratament antiinflamator și repaus articular",
      "Chirurgie pentru eliminarea leziunilor", "Administrare vaccin și izolare",
      "Aplicare cremă antimicotică și monitorizare", "Extracție dentară și antibiotice",
      "Terapie fizică și recuperare asistată"
  ];

  const recommendations = [
    "Evitarea efortului fizic intens timp de 10 zile",
    "Dietă specializată pentru probleme gastrointestinale",
    "Monitorizare zilnică a stării generale și temperaturii",
    "Administrare de probiotice pentru refacerea florei intestinale",
    "Revenire la control după 7 zile pentru reevaluare",
    "Menținerea unei igiene stricte în zona afectată",
    "Evitarea contactului cu alte animale timp de 14 zile",
    "Suplimentare cu vitamine pentru întărirea sistemului imunitar",
    "Efectuarea unei analize de sânge în 2 săptămâni"
];

const speciesBreeds = {
  câine: [
    "Labrador", "Golden Retriever", "Bulldog Francez", "Ciobănesc German", "Beagle",
    "Pug", "Bichon Maltez", "Dachshund", "Rottweiler", "Shih Tzu"
  ],
  pisică: [
    "Siamese", "Maine Coon", "Persană", "Bengaleză", "British Shorthair",
    "Sphynx", "Scottish Fold", "Norvegian de Pădure", "Ragdoll", "Devon Rex"
  ],
  papagal: [
    "Canar", "Lovebird", "Peruș", "Tucan", "Cinteză"
  ],
  iepure: [
    "Olandez Pitic", "Belgian Mare", "Himalayan",  "Angora"
  ]

 
};

const species = faker.helpers.arrayElement(Object.keys(speciesBreeds)); 
const breed = faker.helpers.arrayElement(speciesBreeds[species]); 


    const petData = {
      name: faker.person.firstName(), 
      identificationNumber: faker.string.uuid(), 
      species: species,
      breed:  breed, 
      gender: faker.helpers.arrayElement(["Masculin", "Feminin"]), 
      color: faker.helpers.arrayElement(["Maro", "Alb", "Negru", "Multicolor", "Gri"]), 
      birthday: faker.date.past({ years: 10 }).toISOString().split("T")[0], 
      weight: faker.number.float({ min: 1, max: 40, precision: 0.1 }), 
      vet: faker.person.fullName(), 
      owner: {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        phone: generateRomanianPhoneNumber(),
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
        symptom: faker.helpers.arrayElement(symptoms),
        diagnostic: faker.helpers.arrayElement(diagnoses),
        treatment: faker.helpers.arrayElement(treatments),
        recomandations: faker.helpers.arrayElement(recommendations),
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
