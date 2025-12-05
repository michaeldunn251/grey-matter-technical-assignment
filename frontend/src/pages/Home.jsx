
export function Home({backendUrl}) {

    async function submitUrl() {
        
        // Create the request body, which will contain the url the user entered
        const requestBody = {
            url: document.getElementById("urlEntry").value
        };

        // Make a POST request to the /api/parseUrl endpoint with the request body
        const response = await fetch(`${backendUrl}/api/parseUrl`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        }); 

        // DEV
        console.log(response)
    }

    return (
        <div>
            <button onClick={submitUrl}>hi</button>
            <input type="text" id="urlEntry"></input>
        </div>
    )
}