//c539060f36c843d18519b13486895062  8cdc4a0ef82343168bad7555bd827689
const express = require("express");
const spotifyWebAPI = require("spotify-web-api-node");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { spotifyClient, spotifySecret } = require("../src/secrets");
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", function (req, res) {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebAPI({
    redirectUri: "http://localhost:3000",
    clientId: spotifyClient,
    clientSecret: spotifySecret,
    refreshToken,
  });

  // console.log(spotifyApi);
  console.log("hi");

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      // console.log('The access token has been refreshed!',data);
      res.json({
        access_token: data.access_token,
        expires_in: data.expires_in,
      });
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
    });
});
app.post("/login", (req, res) => {
  const code = req.body.code;
  //console.log(code);
  const spotifyApi = new spotifyWebAPI({
    redirectUri: "http://localhost:3000",
    clientId: spotifyClient,
    clientSecret: spotifySecret,
  });
  console.log(req.method);
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        access_token: data.body.access_token,
        refresh_token: data.body.refresh_token,
        expires_in: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("server err", err);
      res.sendStatus(500);
    });
});

app.listen(3001, function () {
  console.log("listening on port 3001");
});
