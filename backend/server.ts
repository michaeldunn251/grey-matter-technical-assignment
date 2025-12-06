// Import helper functions/variables from utilities.ts
import { port, frontendUrl, activityLogger, getHtmlPageContent, validateUrl, PageData, addToDatabase } from "./utilities";

// Import ExpressJS for backend server
import express from "express";
import type { Request, Response } from "express";

// Import CORS to allow Cross-Origin Resource 
import cors from "cors";

const app = express();

// Middleware for logging requests made to the server
app.use(activityLogger);

// Middleware for parsing JSON of incoming requests
app.use(express.json())

// Set CORS options to allow requests from the frontend
const corsOptions: cors.CorsOptions = {
    origin: [frontendUrl],
    methods: 'GET,POST,OPTIONS'
}
app.use(cors(corsOptions))

// MARK: /api/parseUrl endpoint
app.post("/api/parseUrl", (req: Request, res: Response) => {

    // Catch any errors through the parsing process.
    try {

        // Get the URL parameter with optional chaining, since we check validation.
        let userInputUrl = req.body?.url;

        // Request validation, if there's NOT a url within the request body, return a 400 (via falsy value)
        if (!userInputUrl) {
            res.status(400).send({"error": "URL missing from request body."});
            return;
        }

        // Otherwise, if there IS a URL in the request body
        let validUrl = validateUrl(userInputUrl);
        if (!validUrl) {
            res.status(400).send({"error": "Invalid URL."});
            return;
        }

        // Make a GET request for HTML page content
        let htmlPageContent = getHtmlPageContent(validUrl);
        htmlPageContent.then((htmlPageData) => {
            
            // After the fetch attempt, if no data is recieved, return an error.
            if (!htmlPageData) {
                res.status(400).send({"error": "Unable to parse website, please check the URL."});
                return
            }

            // Insert the page data into the database
            let dbAddSuccessStatus = addToDatabase(htmlPageData);
            dbAddSuccessStatus.then((status) => {
                
                // If the database insertion was unsuccessful, then errors will be falsy, so we should return errors to the frontend
                if (status) {
                    res.status(500).send({"error": status});
                }

                // Otherwise, upon successful database insertion, send the pageData to the frontend.
                res.send(htmlPageData);
                return

            })
        })
    }

    // In the case that anything else went wrong, return the error code.
    catch (error) {
        res.status(500).send({"errors": error});
        return
    }   
})

app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})