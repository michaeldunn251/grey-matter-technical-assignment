// Import ExpressJS for backend server
import express from "express";
import type { Request, Response } from "express";

// Import dotenv to access environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Import CORS to allow Cross-Origin Resource 
import cors from "cors";

const port: Number = Number(process.env.BACKEND_PORT) || 8000;
const frontendUrl: string = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();

// Middleware code outline taken from the express.js website https://expressjs.com/en/guide/writing-middleware.html 
const myLogger = function (req: Request, res: Response, next: Function) {

    // res.on('finish') syntax taken from here: https://stackoverflow.com/questions/51058621/get-response-status-code-in-a-middleware
    res.on('finish', () => {
        console.log(`URL: ${req?.originalUrl} | Method: ${req?.method} | Status: ${res?.statusCode}`)
    })
    next()
}

// Middleware for logging requests made to the server
app.use(myLogger)

// Middleware for parsing JSON of incoming requests
app.use(express.json())

console.log(`frontendurl: ${frontendUrl}`)

// Set CORS options to allow requests from the frontend
const corsOptions: cors.CorsOptions = {
    origin: [frontendUrl],
    methods: 'GET,POST,OPTIONS'
}
app.use(cors(corsOptions))

app.get("/", (req: Request, res: Response) => {
    res.send("Grey Matter");
})

app.post("/api/parseUrl", (req: Request, res: Response) => {
    console.log(req.body)
    res.send({"response": req.body?.url});
})

app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})