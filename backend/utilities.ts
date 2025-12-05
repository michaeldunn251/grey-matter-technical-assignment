// Import Cheerio to allow parsing of HTML
import * as cheerio from 'cheerio';

import type { Request, Response } from "express";

// Import dotenv to access environment variables
import * as dotenv from "dotenv";

// Import Supabase's createClient
import { createClient, PostgrestError } from '@supabase/supabase-js'

// Get the port/frontendUrl from .env
dotenv.config();
export const port: Number = Number(process.env.BACKEND_PORT) || 8000;
export const frontendUrl: string = process.env.FRONTEND_URL || "http://localhost:5173";

// Create a new Supabase client with the initalization commands provided on the Supabase website.
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_API_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware code outline taken from the express.js website https://expressjs.com/en/guide/writing-middleware.html 
export function activityLogger (req: Request, res: Response, next: Function) {

    // res.on('finish') syntax taken from here: https://stackoverflow.com/questions/51058621/get-response-status-code-in-a-middleware
    res.on('finish', () => {
        console.log(`URL: ${req?.originalUrl} | Method: ${req?.method} | Status: ${res?.statusCode}`)
    })
    next()
}

// Define an interface for the return type of the getHtmlPageContent function
export interface PageData {
    url: string,
    pageTitle: string,
    metaDescription: string,    
    headerArray: string[],
    screenshotUrl: string
}

// MARK: Function for validating the input URLs, returns a boolean of the status
export function validateUrl(userInputUrl: string): boolean {
    
    try {

        // Create a URL object, if the userInputUrl is invalid, it will throw an error.
        let urlObject = new URL(userInputUrl);
        console.log(urlObject)

        // If the URL object has an invalid protocol, then return false
        if (urlObject.protocol == "https:" || urlObject.protocol == "http:") {
            return true;
        }
        else {
            return false;
        }
    } 
    
    // In the case that the submitted value isn't a URL, catch the error and return false
    catch (error) {
        return false
    }
}

// MARK: Function for obtaining the HTML page data (title, meta description, and headers)
export async function getHtmlPageContent(validUrl: string): Promise<PageData> {

    // Make a GET request to obtain the page's HTML
    let htmlResponse = await fetch(validUrl, {
        method: "GET"
    })

    // Wait for the Promise to resolve, then load the text of the fetched page into a Cheerio object
    let htmlContent: string = await htmlResponse.text();
    let loadedDocument = cheerio.load(htmlContent)
    
    // Get the page title from the title tag, and extract the text
    let pageTitle: string = loadedDocument("title").text();

    // Find the meta description in the meta[name="description"] tag and exract it's content
    let metaDescription: string = loadedDocument("meta[name='description']").attr()?.content || "";

    // Find the total number of H1 headers, and traverse through each one
    let numHeaders: number = loadedDocument("h1").length;
    let headerArray: string[] = [];
    for (let i = 0; i < numHeaders; i++) {

        // For each H1, extract the node's text and add it to the headerArray
        let currentHeader: string = loadedDocument("h1").eq(i).text();
        headerArray.push(currentHeader)      
    }

    // NOTE: Mock screenshot API called here, which would return the pageScreenshot
    let pageScreenshot: string = "https://dummyimage.com/800x600/000/fff.png&text=Screenshot";

    // Finally, return the url (which was the input valid URL), pageTitle, metaDescription, headerArray, and screenshotUrl
    return {url: validUrl, pageTitle, metaDescription, headerArray, screenshotUrl: pageScreenshot}
}

// MARK: Function for adding pageData to the SupaBase 'page_insights' table
export async function addToDatabase(pageData: PageData): Promise<string | undefined> {
    
    // Insert the pageData into page_insights
    let { error } = await supabase
                            .from('page_insights')
                            .insert({
                                url: pageData.url, 
                                title: pageData.pageTitle, 
                                description: pageData.metaDescription, 
                                h1s: pageData.headerArray, 
                                screenshot_url: pageData.screenshotUrl 
                            });
    
    // If there were no errors, "undefined" will be returned, otherwise, the errors will be returned to be displayed on the frontend.
    return error?.message;
}