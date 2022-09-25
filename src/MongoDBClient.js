const { MongoClient, ServerApiVersion } = require('mongodb');

// TODO: loads env variables again just in case. avoid duplication
require('dotenv').config();

// TODO: harcoded here for now. Needs to in props of course
const username = process.env.MONGO_USERNAME;
const pass = process.env.MONGO_PASS;
const url = process.env.MONGO_URL;
const uri = `mongodb+srv://${username}:${pass}@${url}/?retryWrites=true&w=majority`;

class MongoDBClient {
  constructor() {
    this.connection = null;
  }

  /**
     * returns connected client
     * @returns MongoDBClientPromise
     */
  async #connect() {
    if (this.connection) { return this.connection; }
    this.connection = await new MongoClient(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      },
    ).connect();
    return this.connection;
  }

  /**
     * Close mongo client connection
     * @returns void
     */
  async closeConnection() {
    await this.connection.close();
    this.connection = null;
  }

  /**
     * Returns connection to specified mongo database
     * @param {string} dbName
     */
  async db(dbName) {
    if (!this.connection) {
      await this.#connect();
    }
    return this.connection.db(dbName);
  }
}

module.exports = MongoDBClient;
