import { ref, getDownloadURL } from "firebase/storage";
import { FirebaseStorage } from "../firebase";

const storage = FirebaseStorage;

export const downloadFile = (path) =>
  getDownloadURL(ref(storage, path))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      console.log(url);
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
    })
    .catch((error) => {
      // Handle any errors
    });
