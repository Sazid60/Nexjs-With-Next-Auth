import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
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
    ],

    callbacks: {
        async session({ session, token }) {
            session.user.type = token.type
            return session
        },
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.type = user.type
            }
            return token
        }
    }
}
const handler = NextAuth(authOptions)

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        type: 'admin',
        password: 'password123',
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        type: 'moderator',
        password: 'securepassword',
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        type: 'member',
        password: 'alicepass789',
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 4,
        name: 'Bob Williams',
        email: 'bob.williams@example.com',
        type: 'member',
        password: 'bobspassword',
        image: 'https://picsum.photos/200/300'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        type: 'member',
        password: 'charliepass2024',
        image: 'https://picsum.photos/200/300'
    }
];


export { handler as GET, handler as POST }