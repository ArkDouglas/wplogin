// pages/api/auth/[provider].jsx
import { withIronSessionApiRoute } from "iron-session/next";
import { fetchAPI } from "../../../lib/fetchAPI";
export async function authenticate(provider, code, state) {
    const variables = {
        input: {
            provider,
           
                code,

            state
        }
    };

    console.log("provider" + provider)
    console.log("code" +  code)
    console.log("state" +  state)


    // replace fetchAPI with whatever you're using to connect to WPGraphQL.
    const data = await fetchAPI(
        `mutation loginWithOAuth(
  $provider: LoginProviderEnum!, 
  $code:     String!,            
  $state:    String,             
) {
  login(
    input: {
      provider: $provider
      oauthResponse: {
        state: $state,
        code: $code, 
      }
    }
  ) {
    authToken
    authTokenExpiration
    refreshToken
    refreshTokenExpiration
    user { # The authenticated WordPress user.
                id
          name
          email
          username
          avatar {
            url
          }

    }
  }
}`,
        {
            variables: {
                input: variables.input
            }
        }
    );

    return data;
}

const sessionHandler = async (req, res) => {
    try {
        const {
            code, // The Authorization code from the Provider
            state, // The State used to validate request authenticity
            provider, // the catch-all param.
        } = await req.query

        // Authenticate the user with WPGraphQL.
        const data = await authenticate(provider, code, state);


        // We now have the auth/refresh tokens for a validated WPUser, lets store them.

        const user = { isLoggedIn: true, ...data.login }
        console.log('user' + user)
        for (var dd in user.user) {
            console.log("dd :  " + dd)
        }
        req.session.user = { user: user.user };
        await req.session.save();
        for (var dd in req.session.user) {
            console.log("dxd :  " + dd)
        }
        // Redirect the user from the api route back to the app.
        res.redirect('/profile');
    } catch (error) {
        // Do something if authentication fails.
        const { response: fetchResponse } = error;
        console.log("an error occured", error);
        res.status(fetchResponse?.status || 500).json(error);
    }
};


// Example: store the session data with 'next-iron-session'.
export function withSession(handler) {
    return withIronSessionApiRoute(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD,
        cookieName: 'wp-graphql-headless-login-session',

    });
}


export default withSession(sessionHandler);

