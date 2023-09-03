import { ref, uploadBytes } from "firebase/storage";
import { FirebaseStorage } from "../firebase";

export const uploadFile = (file, path, name) => {
  const storage = FirebaseStorage;

  const storageRef = ref(storage, path + name);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(`Uploaded ${name} at ${path}`);
  });
};
