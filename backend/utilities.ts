// Import Cheerio to allow parsing of HTML
import * as cheerio from 'cheerio';

// Define an interface for the return type of the getHtmlPageContent function
interface PageData {
    pageTitle: string,
    metaDescription: string,    
    headerArray: string[],
}

// MARK: Function for validating the input URLs, returns a boolean of the status
export function validateUrl(userInputUrl: string): boolean {
    
    // NOTE: current URL validation requires scheme (https://)
    try {
        let validatedUrl = new URL(userInputUrl);
        return true;
    } 
    
    // In the case that the submitted value isn't a URL, catch the error and return false
    catch (error) {
        return false
    }
}

// MARK: Function for obtaining the HTML page data (title, meta description, and headers)
export async function getHtmlPageContent(validUrl: string): Promise<PageData> {

    // Make a GET request to obtain the page's HTML
    let htmlResponse: Response = await fetch(validUrl, {
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

    // Finally, return the pageTitle, metaDescription, and headerArray
    return {pageTitle, metaDescription, headerArray}
}