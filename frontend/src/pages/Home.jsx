
export function Home({backendUrl}) {

    async function submitUrl() {
        
        // Create the request body, which will contain the url the user entered
        const requestBody = {
            url: document.getElementById("urlEntry").value
        };

        // Make a POST request to the /api/parseUrl endpoint with the request body
        const request = await fetch(`${backendUrl}/api/parseUrl`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        }); 

        let response = await request.json()
        console.log(response)
    }

    return (
        <div>
            <input type="text" id="urlEntry"></input>
            <button onClick={submitUrl}>Fetch Page Insights</button>
        </div>
    )
}