## Game Review GraphQL Server

Reference: <https://www.youtube.com/watch?v=xMCnDesBggM>

- GraphQL server that manages video game reviews
- The server provides a GraphQL API for managing games, authors, and reviews with the following features:
  - Query operations for fetching games, authors, and reviews
  - Relationships between entities (games have reviews, authors have reviews, reviews link to both)
  - Mutation operations for adding, updating, and deleting games
  - Built with Apollo Server for GraphQL handling

The server uses an in-memory database (_db.js) for data storage and implements resolvers for handling all GraphQL operations and relationships.
