import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import querystring from "query-string";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return alert("passwords dont match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      //   await createUserWithEmailAndPassword(
      //     auth,
      //     "test434@test25ww33.com",
      //     "qwerty123"
      //   );
      // setError("Created");
      window.location = AuthURL;
    } catch (err) {
      // setError("failed");
      alert("not created");
      console.log(err);
    }
    setLoading(false);
  }
  return (
    // <div>
    //   <Card style={{ padding: "40px", maxWidth: "1000px" }}>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Sign up</h2>
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
    //         <Form.Group id="password-confirm">
    //           <Form.Label>Password Confirm</Form.Label>
    //           <Form.Control type="password" ref={passwordConfirmRef} required />
    //         </Form.Group>

    //         <Button className="w-100 mt-4" type="submit" disabled={loading}>
    //           Sign up
    //         </Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     Already have an account? <Link to="/login"> Login</Link>
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
                SIGN UP
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
            <div class="signin-field">
              <h2>Confirm Password</h2>
              <input
                type="password"
                class="form-input text-input"
                id="floatingPassword"
                placeholder=""
                ref={passwordConfirmRef}
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
      </div>
    </>
  );
};

export default Signup;
