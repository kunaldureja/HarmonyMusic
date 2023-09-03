import { getFirestore } from "firebase/firestore";
import app from "../firebase.js";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
// Initialize Firebase

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function addNewUser(User) {
  try {
    const docRef = await setDoc(doc(db, `Users/${User.uid}`), {
      Email: "Dummy",
      Name: "User",
      UID: User.uid,
      Playlists: ["Liked"],
      LikedSongs: [],
    });
    console.log("Document written");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function createNewPlaylist(User, playlist, oldPlaylists) {
  try {
    const playlistRef = await addDoc(collection(db, `Playlists`), {
      Name: playlist,
      SongsID: [],
    });
    oldPlaylists.push(playlistRef.id);
    console.log(oldPlaylists);
    await updateDoc(doc(db, `Users/${User.uid}`), {
      Playlists: oldPlaylists,
    });
    console.log("Document written");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatePlaylistSongs(
  playlistId,
  newSongs,
  newPlaylists,
  songId
) {
  try {
    const playlistRef = await updateDoc(doc(db, `Playlists/${playlistId}`), {
      SongsID: newSongs,
    });
    console.log(songId);
    const songupdate = await setDoc(doc(db, `Songs/${songId.id}`), {
      title: songId.title,
      albumUrl: songId.albumUrl,
      artist: songId.artist,
      Playlists: newPlaylists,
      id: songId.id,
      isSpotify: songId.isSpotify,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// const q = query(collection(db, "cities"), where("capital", "==", true));

export async function getPlaylists(user) {
  const docRef = doc(db, `Users/${user}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().Playlists;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return [];
  }
}

export async function getSongsInPlaylists(playlist) {
  const docRef = doc(db, `Playlists/${playlist}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().SongsID;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return [];
  }
}

export async function getSongInfo(songID) {
  const docRef = doc(db, `Songs/${songID}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return [];
  }
}

export async function checkLiked(songID) {
  const docRef = doc(db, `Playlists/Liked`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    if (docSnap.data().SongsID.indexOf(songID) > -1) return true;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    // return false;
  }
  return false;
}
