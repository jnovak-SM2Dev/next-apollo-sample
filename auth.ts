import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getClient } from "./apolloClient";
import { gql } from "@apollo/client";

const sampleQuery = gql`
  query Dragon($dragonId: ID!) {
    dragon(id: $dragonId) {
      id
      name
      type
    }
  }
`;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("AUTHORIZING...");
        const { data } = await getClient().query({
          query: sampleQuery,
          variables: {
            dragonId: "5e9d058759b1ff74a7ad5f8f",
          },
        });
        console.log("Data: ", data);

        return {
          id: data.dragon.id,
          name: data.dragon.name,
          email: "sampleuser@test.com",
        };
      },
    }),
  ],
});
