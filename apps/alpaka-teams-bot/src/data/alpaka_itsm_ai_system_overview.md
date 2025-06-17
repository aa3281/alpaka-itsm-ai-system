# Alpaka ITSM AI System
> Intelligent Incident Resolution with AI Assistance

The purpose of this project is to develop a cost-effective, AI-powered MS-Teams integrated assistant to enhance the IT Support activities of the organisation. 

The business outcome is to:
1. Reduce ticket resolution times
2. Empower L1 support to handle more incidents independently
3. Improve overall service quality

The solution should be easy-to-use, secure, and use Azure cloud services.

## Key Features

The following architecture building blocks are in scope of this project

- Set of RESTful APIs:
	1. Take a new incident and return probable resolutions based on semantic similarity with historical incidents (semantic reranking)
	2. Return past tickets with high similarity to the given incident using vector-based search
	3. Natural language interface for agents to query past issues or resolutions
- Web-based UI chatbot or MS Teams-integrated agent
- Interactive exploration of historical data or common solutions using natural language queries
- Optional advanced functionality such as **root cause pattern detection** and **proactive alerting** based on cluster analysis of historical ticket trends.

## Solution Architecture

The Architecture Vision Document is available here [test](/docs/Architecture%20Vision%20Document.pdf)

## Requirements
- Azure Open AI deployment
- Azure AI Search resource

## Development
Easily set up a local development environment.

1. Clone the repo
    ```git clone git@github.com:aa3281/alpaka-itsm-ai-system.git```
2. Install the NPM packages 
    ```npm install```
3. Update the following values in apps > ms-teams-agent > alpaka-teams-bot > env > .env.playground.user file.
    ```
    SECRET_AZURE_OPENAI_API_KEY=<your-key>
    AZURE_OPENAI_ENDPOINT=<your-endpoint>
    AZURE_OPENAI_DEPLOYMENT_NAME=<your-deployment>
    ```

## Built With
- Javascript
- Bicep
 
## To-Do
- [x] Create MS Teams Integrated bot scaffolding
- [x] Ensure bot responds to parametric data
- [ ] Create indexer and upload custom data embeddings to vector database
- [ ] Implement vector-based search
- [ ] Implement semantic reranking
- [ ] Implement prompt augmentation and response generation

