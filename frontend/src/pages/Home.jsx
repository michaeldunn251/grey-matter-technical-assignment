import { RecentSearches } from "../components/RecentSearches";
import { ResultsTable } from "../components/ResultsTable";

import './Home.css'

export function Home({backendUrl, recentlySearched, setRecentlySearched, recentResults, setRecentResults}) {

    // MARK: Function that submits the user-submitted URL to the backend for parsing
    async function submitUrl() {
        
        const errorMessageContainer = document.getElementById("error-container");

        // Get the submitted URL from the input field
        let submittedURL = document.getElementById("urlEntry").value;

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
        
        // If "errors" is within the json (or the status is not 200), then print the error instead
        if ("error" in response || request.status !== 200) {

            // Set the error message DOM node's text to the error
            let errorMessage = document.getElementById("error-message");
            errorMessage.innerText = `ERROR: ${response.error}`;

            // Un-hide the error-container div if there's an error
            errorMessageContainer.hidden = false;
        }

        else {
            // Add the results to the recentResults array (in reverse order to have the newest item first)
            setRecentResults((currentResults) => [response, ...currentResults])

            // Clear out the input field for clarity
            document.getElementById("urlEntry").value = "";

            // Toggle the error container back to hidden (in the case it is showing)
            errorMessageContainer.setAttribute('hidden', 'true');

        }
    }

    return (
        <div id="home-container">
            <h1>Grey Matter Technical Assignment</h1>
            <input type="text" id="urlEntry" placeholder="Enter URL to get page insights"></input>
            <div id="error-container">
                <p id="error-message"></p>
            </div>
            <button id="fetch-button" type="submit" onClick={submitUrl}>Fetch Page Insights</button>
            <RecentSearches recentlySearched={recentlySearched}></RecentSearches>
            <ResultsTable recentResults={recentResults}></ResultsTable>
        </div>
    )
}