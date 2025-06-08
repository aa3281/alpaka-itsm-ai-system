# Alpaka ITSM AI System
> Intelligent Incident Resolution with AI Assistance

The purpose of this project is to develop a cost-effective, AI-powered MS-Teams integrated assistant to enhance the IT Support activities of the organisation. 

The business outcome is to:
1. Reduce ticket resolution times
2. Empower L1 support to handle more incidents independently
3. Improve overall service quality

The solution should be easy-to-use, secure, and use Azure cloud services.

## Why is it Named Alpaka?
The problem statement title for the hackathon is "Intelligent Incident Resolution with AI Assistance".

So, in my head the acronym is "IIRewAA".

This, in turn, reminded me of the phrase, "Alpaca iriwa!" which they teach you to say in Alpaca World in South Korea. (I'm not Korean, I just like Alpacas.)

Therefore, I named the project "Alpaka".

## Demo and Screenshot
![demo](/docs/alpaka-demo.gif)

Here is a working live demo : [COMING SOON]

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

### Target State Solution Architecture
![c4-target-ssolution-architecture](/docs/Figure%203%20-%20C4%20Target%20State%20Solution%20Architecture.drawio.png)

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

## Feedback and Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. All contributions are welcome!

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork it 
2. Create your feature branch (`git checkout -b feat/amazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazingFeature`)
5. Create a new Pull Request

## Acknowledgements / References
- https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/tool-sdk-overview
- https://www.3cs.ch/on_the_architecture_of_it-service_management_tools
- https://www.trisotech.com/panorama-360/
- https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview?tabs=docss
- https://learn.microsoft.com/en-us/azure/search/search-get-started-rag
- https://learn.microsoft.com/en-us/azure/search/search-get-started-portal-import-vectors?tabs=sample-data-storage%2Cmodel-aoai%2Cconnect-data-storage
- https://learn.microsoft.com/en-us/rest/api/searchservice/
- https://learn.microsoft.com/en-us/azure/search/tutorial-rag-build-solution-maximize-relevance
- https://learn.microsoft.com/en-us/azure/search/semantic-search-overview
- https://medium.com/data-science/retrieval-augmented-generation-rag-from-theory-to-langchain-implementation-4e9bd5f6a4f2
- https://towardsdatascience.com/getting-started-with-langchain-a-beginners-guide-to-building-llm-powered-applications-95fc8898732c/?source=post_page-----4e9bd5f6a4f2---------------------------------------
