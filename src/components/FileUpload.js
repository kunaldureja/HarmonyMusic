import { useState } from "react";
import { FirebaseStorage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getSongsInPlaylists,
  updatePlaylistSongs,
} from "../firebase/firestoreDatabase/firestoreFunctions";
import { Button, Modal } from "react-bootstrap";

function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(FirebaseStorage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        // download url

        const newSongs = await getSongsInPlaylists("LocalFiles");

        newSongs.push(file.name);
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const song = {
          title: file.name,
          albumUrl: url,
          artist: "User",
          Playlists: ["LocalFiles"],
          id: file.name,
          isSpotify: false,
        };

        await updatePlaylistSongs("LocalFiles", newSongs, ["LocalFiles"], song);
      }
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [percent, setPercent] = useState(0);
  const modalStyle = {
    backgroundColor: "black",
  };
  // const { scrollYProgress } = useScroll();
  return (
    <>
      <div className="wrapper1-1-2">
        <Button variant="primary" onClick={handleShow}>
          Upload File
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={modalStyle}>
          <div class="wrapper1-1-2">
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload File</button>
          </div>
          <div class="wrapper1-1-2">
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                textAlign: "center",
                padding: "3em",
                opacity: percent / 100 + 0.5,
              }}
            >
              <h1>{percent}%</h1>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FileUpload;
