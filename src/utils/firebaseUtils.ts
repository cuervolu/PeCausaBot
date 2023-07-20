// firebaseUtils.ts
import { getDatabase, ref, push, DataSnapshot, get } from "firebase/database";

// Función para añadir una nueva respuesta a la base de datos
export async function addResponseToFirebase(command: string, response: string) {
  const db = getDatabase();
  const responseRef = ref(db, command);
  push(responseRef, response);
}

// Función para obtener una respuesta aleatoria de la base de datos
export async function getRandomResponseFromFirebase(command: string): Promise<string> {
  const db = getDatabase();
  const responseRef = ref(db, command);
  const dataSnapshot: DataSnapshot = await get(responseRef);
  const responses: string[] = [];

  dataSnapshot.forEach((childSnapshot) => {
    responses.push(childSnapshot.val());
  });

  if (responses.length === 0) {
    return "No hay insultos disponibles en este momento. Si tampoco soy tan avanzado, pe causa.";
  }

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

