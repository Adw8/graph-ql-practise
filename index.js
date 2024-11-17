import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games
    },
    game(_, args){
      const id = args.id;
      return db.games.find((game) => game.id === id);
    },
    reviews () {
      return db.reviews
    },
    review(_, args) {
      const id = args.id;
      return db.reviews.find((review) => review.id === id);
    },
    authors () {
      return db.authors
    },
    author(_, args){
      const id = args.id;
      return db.authors.find((author) => author.id === id);
    }
  },

  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    }
  },

  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    }
  },

  Review: {
    author(parent) {
      return db.authors.find((author)=> author.id === parent.author_id)
    },
    game(parent) {
      return db.games.find((game)=> game.id === parent.game_id)
    }
  },

  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },

    addGame(_, args) {
      let id = Math.floor(Math.random() * 10000).toString();
      let game = {...args.game, id: id}
      db.games.push(game);
      return game
    },

    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return {...g, ...args.edits}
        }
        return g;
      });

      return db.games.find((g) => g.id === args.id);
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: {port: 4000}
});

console.log("server started at port", 4000);
