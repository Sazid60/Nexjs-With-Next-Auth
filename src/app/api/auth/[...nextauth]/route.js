import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    required: true,
                    placeholder: "You email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true,
                    placeholder: "Enter Password",
                },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                if (!credentials) {
                    return null;
                }
                if (email) {
                    const currentUser = users.find((user) => user.email === email)
                    if (currentUser) {
                        if (currentUser.password === password) {
                            return currentUser;
                        }
                    }
                }
                return null
            }
        })
    ]
}
const handler = NextAuth(authOptions)

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'securepassword'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'alicepass789'
    },
    {
        id: 4,
        name: 'Bob Williams',
        email: 'bob.williams@example.com',
        password: 'bobspassword'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'charliepass2024'
    }
];


export { handler as GET, handler as POST }