// components/Profile.jsx
import useUser from "../lib/hooks/useUser";
export default function Profile()  {
    const { user } = useUser({ redirectTo: '/login' });

if (!user || user.isLoggedIn === false) {
    return <h1>loading...</h1>
}

return (
    <Layout>
        <h1>Your {user?.user?.oauth?.linkedIdentities?.[0]?.provider} profile</h1>

        <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
)
}