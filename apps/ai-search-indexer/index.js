// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Importing the @azure/search-documents library
const { SearchIndexClient, SearchClient, AzureKeyCredential, odata } = require("@azure/search-documents");

// Importing the index definition and sample data
const itsmData = require('./itsmresolutions.json');
const indexDefinition = require('./itsmresolutions_quickstart_index.json');

// Load the .env file if it exists
require("dotenv").config();

// Getting endpoint and apiKey from .env file
const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main() {
    console.log(`Running Azure AI Search Javascript quickstart...`);
    if (!endpoint || !apiKey) {
        console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
        return;
    }

    // Creating an index client to create the search index
    const indexClient = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));

    // Getting the name of the index from the index definition
    const indexName = indexDefinition["name"];

    console.log('Checking if index exists...');
    await deleteIndexIfExists(indexClient, indexName);

    console.log('Creating index...');
    let index = await indexClient.createIndex(indexDefinition);
    console.log(`Index named ${index.name} has been created.`);

    // Creating a search client to upload documents and issue queries
    const searchClient = indexClient.getSearchClient(indexName);

    console.log('Uploading documents...');
    // Ensure all fields expected as strings in the index are strings in the data
    const documents = itsmData['value'].map(doc => {
        return {
            ...doc,
            TicketNumber: doc.TicketNumber != null ? String(doc.TicketNumber) : undefined,
            Project: doc.Project != null ? String(doc.Project) : undefined,
            Category: doc.Category != null ? String(doc.Category) : undefined,
            Severity: doc.Severity != null ? String(doc.Severity) : undefined,
            Priority: doc.Priority != null ? String(doc.Priority) : undefined,
            TaskType: doc.TaskType != null ? String(doc.TaskType) : undefined,
            Status: doc.Status != null ? String(doc.Status) : undefined,
            TicketOwner: doc.TicketOwner != null ? String(doc.TicketOwner) : undefined,
            AssignedTo: doc.AssignedTo != null ? String(doc.AssignedTo) : undefined,
            Summary: doc.Summary != null ? String(doc.Summary) : undefined,
            DateSubmitted: doc.DateSubmitted != null ? String(doc.DateSubmitted) : undefined,
            StatusUpdated: doc.StatusUpdated != null ? String(doc.StatusUpdated) : undefined,
            ResolutionDate: doc.ResolutionDate != null ? String(doc.ResolutionDate) : undefined,
            TargetDate: doc.TargetDate != null ? String(doc.TargetDate) : undefined,
            TrackTime: doc.TrackTime != null ? String(doc.TrackTime) : undefined,
            LatestComments: doc.LatestComments != null ? String(doc.LatestComments) : undefined
        };
    });
    let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(documents);
    const succeededCount = indexDocumentsResult.results.filter(r => r.succeeded).length;
    console.log(`Uploaded ${succeededCount} of ${indexDocumentsResult.results.length} documents successfully.`);

    // waiting one second for indexing to complete (for demo purposes only)
    sleep(1000);

    console.log('Querying the index...');
    console.log();
    await sendQueries(searchClient);
}

async function deleteIndexIfExists(indexClient, indexName) {
    try {
        await indexClient.deleteIndex(indexName);
        console.log('Deleting index...');
    } catch {
        console.log('Index does not exist yet.');
    }
}

async function sendQueries(searchClient) {
    // Query 1
    console.log('Query #1 - search everything:');
    let searchOptions = {
        includeTotalCount: true,
        select: ["TicketNumber", "Project", "Category", "Severity", "Priority", "TaskType", "Status", "TicketOwner", "AssignedTo", "Summary", "DateSubmitted", "StatusUpdated", "ResolutionDate","TargetDate","TrackTime","LatestComments"]
    };

    let searchResults = await searchClient.search("*", searchOptions);
    for await (const result of searchResults.results) {
        console.log(`${JSON.stringify(result.document)}`);
    }
    console.log(`Result count: ${searchResults.count}`);
    console.log();


    // // Query 2
    // console.log('Query #2 - search with filter, orderBy, and select:');
    // let state = 'FL';
    // searchOptions = {
    //     filter: odata`Address/StateProvince eq ${state}`,
    //     orderBy: ["Rating desc"],
    //     select: ["HotelId", "HotelName", "Rating"]
    // };

    // searchResults = await searchClient.search("wifi", searchOptions);
    // for await (const result of searchResults.results) {
    //     console.log(`${JSON.stringify(result.document)}`);
    // }
    // console.log();

    // Query 3
    console.log('Query #3 - search for incidents in TaskType or Summary:');
    searchOptions = {
        select: ["TicketNumber", "TaskType", "Summary", "Status", "Severity"],
        searchFields: ["TaskType", "Summary"]
    };

    searchResults = await searchClient.search("incident", searchOptions);
    for await (const result of searchResults.results) {
        console.log(`${JSON.stringify(result.document)}`);
    }
    console.log();

    // Query 4
    console.log('Query #4 - facet and search on Severity:');
    searchOptions = {
        facets: ["Severity"],
        select: ["TicketNumber", "Severity", "Summary", "TaskType"],
        searchFields: ["Severity"]
    };

    searchResults = await searchClient.search("*", searchOptions);
    for await (const result of searchResults.results) {
        console.log(`${JSON.stringify(result.document)}`);
    }
    console.log();

    // Query 5
    console.log('Query #5 - facet and search on TaskType:');
    searchOptions = {
        facets: ["TaskType"],
        select: ["TicketNumber", "TaskType", "Summary", "Severity"],
        searchFields: ["TaskType"]
    };

    searchResults = await searchClient.search("*", searchOptions);
    for await (const result of searchResults.results) {
        console.log(`${JSON.stringify(result.document)}`);
    }
    console.log();

    // Query 6
    console.log('Query #6 - show latest comments for tickets:');
    searchOptions = {
        select: ["TicketNumber", "Summary", "LatestComments", "Status", "TaskType"],
        searchFields: ["LatestComments"]
    };

    searchResults = await searchClient.search("*", searchOptions);
    for await (const result of searchResults.results) {
        console.log(`${JSON.stringify(result.document)}`);
    }
    console.log();

//     // Query 5
//     console.log('Query #5 - Lookup document:');
//     let documentResult = await searchClient.getDocument(key='3')
//     console.log(`HotelId: ${documentResult.HotelId}; HotelName: ${documentResult.HotelName}`)
//     console.log();
 }

function sleep(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    } while (d2 - d < ms);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});