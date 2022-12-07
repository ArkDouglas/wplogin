//pages/api/user.js

import jwt from "jsonwebtoken";
function checkExpired(accessToken) {
  const decodedToken = jwt.decode(accessToken);
  // Expiry time is in seconds, but we need milliseconds so we do *1000
  const expiresAt = new Date(decodedToken["exp"] * 1000);
  const now = new Date();
  if (now < expiresAt) {
    //  Not expired
    return false;
  } else {
    //  Expired
    return true;
  }
}

async function refreshAuthToken(refreshToken) {
  // replace fetchAPI with whatever you're using to connect to WPGraphQL.
  console.log("userchecking ");
  const data = await fetchAPI(
    `mutation Login($refreshToken: String!) {
      refreshToken(input: {refreshToken: $refreshToken}) {
        authToken
        success
      }
    }`,
    {
      variables: {
        refreshToken,
      },
    }
  );

  return data?.refreshToken;
}

export default function withIronSessionApiRoute() {
  function userRoute(req, res) {
    res.send({ user: req.session.user });
  }
  (req, res) => {
    // Infer max cookie from request;
    return {
      password: process.env.SECRET_COOKIE_PASSWORD,
      cookieName: "wp-graphql-headless-login-session",
    };
  }
};
