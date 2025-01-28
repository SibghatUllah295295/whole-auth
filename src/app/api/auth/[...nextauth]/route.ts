import NextAuth from "next-auth";
import GitHubProviders from 'next-auth/providers/github';
import GoogleProviders from 'next-auth/providers/google';
const options = {
    providers:[
        GitHubProviders({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
           }),
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }:any) {
          return baseUrl
        }
      }
}
const handler =NextAuth(options);
export { handler as GET, handler as POST };
