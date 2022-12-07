import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
// MyApp.getInitialProps = async function (appContext) {
//   const req = appContext.ctx.req;
//   const res = appContext.ctx.res;
//   const session = await getIronSession(req, res, {
//     password: process.env.SECRET_COOKIE_PASSWORD,
//     cookieName: "wp-graphql-headless-login-session",
//   });
//   const DEFAULT_PROPS = {
//     pageProps: {},
//   };

//   if (session.user) {
//     return {
//       ...DEFAULT_PROPS,
//       pageProps: {
//         user: session.user,
//       },
//     };
//   }
// };

export default MyApp;
