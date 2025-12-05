import { RecentSearches } from "../components/RecentSearches";
import { ResultsTable } from "../components/ResultsTable";

import './Home.css'

export function Home({backendUrl, recentlySearched, setRecentlySearched, recentResults, setRecentResults}) {

    // MARK: Function that submits the user-submitted URL to the backend for parsing
    async function submitUrl() {
        
        // Get the submitted URL from the input field
        let submittedURL = document.getElementById("urlEntry").value

        // Save the recentlySearched URL within the array (in reverse order to have the newest item first)
        setRecentlySearched((currentArray) => [submittedURL, ...currentArray])

        // Create the request body, which will contain the url the user entered
        const requestBody = {
            url: submittedURL
        };

        // Make a POST request to the /api/parseUrl endpoint with the request body
        const request = await fetch(`${backendUrl}/api/parseUrl`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        }); 

        // Await the Promise, the response will be in JSON
        let response = await request.json()
        
        // Add the results to the recentResults array (in reverse order to have the newest item first)
        setRecentResults((currentResults) => [response, ...currentResults])
    }

    return (
        <div id="home-container">
            <input type="text" id="urlEntry"></input>
            <button onClick={submitUrl}>Fetch Page Insights</button>
            <RecentSearches recentlySearched={recentlySearched}></RecentSearches>
            <ResultsTable recentResults={recentResults}></ResultsTable>
        </div>
    )
}