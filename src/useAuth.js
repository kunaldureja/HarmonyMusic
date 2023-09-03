import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        console.log(res.data);
        window.history.pushState({}, null, "/");
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setExpiresIn(res.data.expires_in);
      })
      .catch((err) => {
        window.location = "/";
        // console.log("use auth err",err);
      });
  }, [code]);

  // useEffect(() => {
  //     if (!refreshToken || !expiresIn) return;
  //     const timeout = setInterval(() => {
  //         axios.post('http://localhost:3001/refresh', { refreshToken }).then(res => {
  //             // console.log(res.data);

  //             setAccessToken(res.data.access_token);
  //             setExpiresIn(res.data.expires_in);

  //         })
  //             .catch((err) => {
  //                 window.location = '/'
  //                 // console.log("use auth err",err);
  //             })
  //     }
  //         , (expiresIn-60)*1000);

  //         return () => clearInterval(timeout);

  // }, [refreshToken, expiresIn])
  return accessToken;
};

export default useAuth;
