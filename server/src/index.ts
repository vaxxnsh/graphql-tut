import express  from "express";
import { ApolloServer, ApolloServerOptions } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import axios from "axios";


const PORT = 8000;

type Todos =  {
    id: string
    title: string
    completed: boolean
}

const typeDefs = `
  type Todos {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todos!]!
  }
`;

const resolvers = {
  Query: {
    getTodos: async () => {
      const res = await axios.get<Todos[]>("https://jsonplaceholder.typicode.com/todos");
      return res.data.map(({ id, title, completed }) => ({ id, title, completed }));
    },
  },
};



async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    app.use(cors());
    app.use(express.json());
    await server.start();
    app.use("/graphql",expressMiddleware(
        server,
    ))
    app.listen(PORT,() => {
        console.log("Started server on the PORT : ",PORT);
    })
}

startServer();