import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { useFetch } from 'app/api';

export default nextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			id: 'credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
				password: { label: 'Password', type: 'password', placeholder: '************' },
			},
			async authorize(credentials: any) {
				// Add logic here to look up the user from the credentials supplied
				try {
					const res = await useFetch.post(`account/token/`, {
						email: credentials?.email,
						password: credentials?.password,
					});
					// Any object returned will be saved in `user` property of the JWT
					if (res) {
						return res.data;
					}
					// If you return null then an error will be displayed advising the user to check their details.
					else {
						return null;
					}
				} catch (e: any) {
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter1
					throw new Error(
						e?.response?.data?.detail ||
							'Hola, There was an error on user authentication'
					);
				}
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }: any) {
			session.user = token.user;
			return session;
		},
		async redirect({ baseUrl }) {
			return baseUrl;
		},
		async signIn() {
			return true;
		},
	},
	pages: {
		signIn: '/',
		error: '/404', // Error code passed in query string as ?error=
	},
});
