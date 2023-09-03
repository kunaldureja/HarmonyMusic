import {
  addNewUser,
  createNewPlaylist,
  updatePlaylistSongs,
  getPlaylists,
  getSongsInPlaylists,
} from "./firestoreDatabase/firestoreFunctions";

import { uploadFile } from "./firebaseStorage/uploadFile.js";
// addNewUser({ uid: "testUser" });
let arr = ["song1"];

// document.elementFromPoint(x, y).click();
// createNewPlaylist({ uid: "testUser" }, "myplaylist", arr);
// updatePlaylistSongs("CpmKqvw7HCWS27RaQ5n9", arr, arr, "mysong");
// let a = async () => {
//   const data = await getSongsInPlaylists("CpmKqvw7HCWS27RaQ5n9");
//   console.log(data);
// };
// a();
// console.log();
// uploadFile("1234", "myfile", "ok");
