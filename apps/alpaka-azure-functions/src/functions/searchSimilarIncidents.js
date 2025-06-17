const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");
const config = require("../../config.js");

const endpoint = config.COSMOS_DB_ENDPOINT;
const key = config.COSMOS_DB_KEY;
const databaseId = config.COSMOS_DB_DATABASE;
const containerId = config.COSMOS_DB_CONTAINER;

app.http("search-similar-incidents", {
  methods: ["GET", "POST"],
  authLevel: "function",
  handler: async (request, context) => {
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    let query = request.query?.query;

    if (!query) {
      try {
        const body = await request.json();
        query = body?.query;
      } catch (e) {
        query = null; // no valid JSON body
      }
    }

    query = query || "SELECT * FROM c";
    try {
      const { resources } = await container.items.query(query).fetchAll();
      context.log(`Cosmos DB query returned ${resources.length} documents`);
      return { status: 200, jsonBody: resources };
    } catch (err) {
      context.log("Cosmos DB query failed", err);
      return { status: 500, body: "Error querying Cosmos DB" };
      ``;
    }
  },
});
