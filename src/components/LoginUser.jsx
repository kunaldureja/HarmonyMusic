import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../css/signin.css";
// import "jquery";
import querystring from "query-string";
const LoginUser = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, currentUser } = useAuth();
  // console.log(signup);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    // console.log("clciked");
    e.preventDefault();
    const AuthURL =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: "c539060f36c843d18519b13486895062",
        scope:
          "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",
        redirect_uri: "http://localhost:3000",
      });
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      //   await createUserWithEmailAndPassword(
      //     auth,
      //     "test434@test25ww33.com",
      //     "qwerty123"
      //   );
      setError("Logged In");
      // alert("correct");

      window.location = AuthURL;
    } catch (err) {
      // alert("wrong");
      setError("failed to log in");
      console.log(err);
    }
    setLoading(false);
  }

  window.addEventListener("onload", function () {
    setTimeout(function () {
      document
        .getElementsByClassName(".loader-wrapper")[0]
        .setAttribute("hidden", "true");
    }, 1000);
  });

  return (
    // <div>
    //   <Card style={{ padding: "40px", maxWidth: "1000px" }}>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Login</h2>
    //       {/* {currentUser && JSON.stringify(currentUser)} */}
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control type="email" ref={emailRef} required />
    //         </Form.Group>
    //         <Form.Group id="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control type="password" ref={passwordRef} required />
    //         </Form.Group>

    //         <Button className="w-100 mt-4" type="submit" disabled={loading}>
    //           Login
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     Need an account? <Link to="/signup">Sign up</Link>
    //   </div>
    // </div>
    <>
      <div id="logoBg"></div>
      <div id="logo" class="glow-ball"></div>
      <div class="wrapper">
        <main id="login-main" class="form-signin m-auto">
          {/* <img
          id="logo"
          class=""
          src="logo.png"
          alt=""
          width="150px"
          height="150px"
          border-radius="50%"
          background-color="#fff"
          box-shadow="
    0 0 60px 30px #fff, 
    0 0 100px 60px #f0f, 
    0 0 140px 90px #0ff
    "
        /> */}

          <form class="signin-form">
            <div class="text-center">
              <h1 class="" style={{ margin: "0px 100px 50px 100px" }}>
                LOGIN
              </h1>
            </div>

            <div class="signin-field">
              <h2>Email address</h2>
              <input
                type="email"
                class="form-input text-input"
                id="floatingInput text-input"
                placeholder=""
                autocomplete="off"
                ref={emailRef}
              />
            </div>
            <div class="signin-field">
              <h2>Password</h2>
              <input
                type="password"
                class="form-input text-input"
                id="floatingPassword"
                placeholder=""
                ref={passwordRef}
              />
            </div>

            <div class="text-center">
              <button
                class="signin-field button-85"
                type="submit"
                onClick={handleSubmit}
              >
                Dive into the World of Music
              </button>
            </div>
          </form>
        </main>

        {/* <div class="loader-wrapper">
        <ul>
          <li>H</li>
          <li>A</li>
          <li>R</li>
          <li>M</li>
          <li>O</li>
          <li>N</li>
          <li>Y</li>
        </ul>
      </div> */}
      </div>
    </>
  );
};

export default LoginUser;
