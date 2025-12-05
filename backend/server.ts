// Import ExpressJS for backend server
import express from "express";
import type { Request, Response } from "express";

// Import dotenv to access environment variables
import * as dotenv from "dotenv";
dotenv.config();

let port: Number = Number(process.env.BACKEND_PORT) || 8000;

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

app.get("/", (req: Request, res: Response) => {
    res.send("Grey Matter");
})

app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})