import NextAuth from 'next-auth/next';
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

//verbs se hi file chalti hai due to framework design...
export { handler as GET, handler as POST }