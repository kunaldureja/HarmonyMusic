import { ref, listAll, getDownloadURL } from "firebase/storage";
import { FirebaseStorage } from "../firebaseConfig";

const storage = FirebaseStorage;

// Create a reference under which you want to list

export const listItems = (path) => {
  console.log("listItems called");
  const listRef = ref(storage, "/");

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      let playlistFiles = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(ref(storage, itemRef));

        console.log(`${itemRef.name}   ${url}`);
        let data = {
          name: itemRef.name,
          url: url,
        };
        return data;
        // .then((url) => {
        //
        //     console.log(data)
        // })

        // All the items under listRef.
      });
      // console.log(playlistFiles);
      // return playlistFiles;
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

listItems("/");
