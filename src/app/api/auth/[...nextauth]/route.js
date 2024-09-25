// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//     secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
//     session: {
//         strategy: "jwt",
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//     },
//     providers: [
//         CredentialsProvider({
//             credentials: {
//                 email: {
//                     label: "Email",
//                     type: "text",
//                     required: true,
//                     placeholder: "You email",
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password",
//                     required: true,
//                     placeholder: "Enter Password",
//                 },
//             },
//             async authorize(credentials) {
//                 const { email, password } = credentials;
//                 if (!credentials) {
//                     return null;
//                 }
//                 if (email) {
//                     const currentUser = users.find((user) => user.email === email)
//                     if (currentUser) {
//                         if (currentUser.password === password) {
//                             return currentUser;
//                         }
//                     }
//                 }
//                 return null
//             }
//         })
//     ],

//     // session e only email and usr name dye so, session e type and other info add korte eta kora lagbe 
//     callbacks: {
//         async session({ session, token }) {
//             session.user.type = token.type
//             return session
//         },
//         async jwt({ token, account, user }) {
//             // Persist the OAuth access_token and or the user id to the token right after signin
//             if (account) {
//                 token.type = user.type
//             }
//             return token
//         }
//     }
// }
// const handler = NextAuth(authOptions)

// const users = [
//     {
//         id: 1,
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         type: 'admin',
//         password: 'password123',
//         image: 'https://picsum.photos/200/300'
//     },
//     {
//         id: 2,
//         name: 'Jane Smith',
//         email: 'jane.smith@example.com',
//         type: 'moderator',
//         password: 'securepassword',
//         image: 'https://picsum.photos/200/300'
//     },
//     {
//         id: 3,
//         name: 'Alice Johnson',
//         email: 'alice.johnson@example.com',
//         type: 'member',
//         password: 'alicepass789',
//         image: 'https://picsum.photos/200/300'
//     },
//     {
//         id: 4,
//         name: 'Bob Williams',
//         email: 'bob.williams@example.com',
//         type: 'member',
//         password: 'bobspassword',
//         image: 'https://picsum.photos/200/300'
//     },
//     {
//         id: 5,
//         name: 'Charlie Brown',
//         email: 'charlie.brown@example.com',
//         type: 'member',
//         password: 'charliepass2024',
//         image: 'https://picsum.photos/200/300'
//     }
// ];


// export { handler as GET, handler as POST }

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/app/lib/connectDB";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
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
          const db = await connectDB();
          const currentUser =await db.collection('users').findOne({ email });
          
         
          if (currentUser) {
            if (currentUser.password === password) {
              return currentUser;
            }
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    })
 
  ],

  callbacks : {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.type = user.type
      }
      return token;
    },
    async session({ session, token }) {
      session.user.type = token.type
      return session;
    },
  }


};

const handler = NextAuth(authOptions);



export { handler as GET, handler as POST };