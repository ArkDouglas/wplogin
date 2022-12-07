// Login.jsx

// replace fetchAPI with whatever you're using to connect to WPGraphQL.
const data = await fetchAPI(
    `query loginClients {
    loginClients {
      clientId
      authorizationUrl
      provider
      name
    }
  }
  `
);

export default  async function Login() {
    return (
        <>
            {
                data?.loginClients.map(
                    (client) => (
                        <a key={client.clientId} href={client.authorizationUrl}>
                            {__('Login with: ', 'my-handle') + client.name}
                        </a>
                    )
                )
            }
        </>
    )
}