# Grey Matter Technical Assignment

## Description
A full-stack web application that analyzes webpage data based on a user-provided URL.

* **Backend**
    * Built with TypeScript using ExpressJS for routing and Cheerio for HTML parsing.
* **Frontend**
    * Developed with React and styled using basic CSS.
* **Hosting**
    * **Backend:** Deployed as a Docker container on Google Cloud Run.
    * **Frontend:** Hosted on Netlify.
        * Both platforms support CI/CD, enabling seamless deployments without downtime.

## Setup Instructions
**Visit:** https://grey-matter-technical-assignment.netlify.app/

**To run locally:**

1. Clone the repository:
    - **git clone https://github.com/michaeldunn251/grey-matter-technical-assignment.git**

2. Start the frontend:
    - Navigate to the frontend directory (./frontend).
    - Run: **npm install** to install frontend dependencies.
    - Then, start the frontend with: **npm run dev**

3. Start the backend:
    - Navigate to the backend directory (./backend).
    - Fill in the environment variables in the **.env.example** file, then remove the ".example".
    - Run: **npm install** to install backend dependencies.
    - Then, start the backend with: **npx tsx server.ts**

## Environment Variable Setup
To setup the environment variables, fill in the **SUPABASE_URL** and the **SUPABASE_API_KEY** with your Supabase Project URL and Supabase API key respectively.

Then, rename the file to ".env", removing the ".example".

## Notes and Assumptions
It is assumed that the user has already created the "page_insights" table within their Supabase account, and that it contains the expected columns. Table creation is completed with the SQL statement given in the assignment description:

```sql
create table page_insights (
    id uuid primary key default gen_random_uuid(),
    url text not null,
    title text,
    description text,
    h1s text[],
    screenshot_url text,
    created_at timestamp default now()
);
```

## What I'd Improve With More Time
One feature that would significantly enhance the usefulness and relevance of this tool is user authentication and storing previously analyzed URLs. After working with Supabase's database features, I'm eager to delve deeper into their authentication tools.

Additionally, I would improve URL validation and write specific unit/system tests to ensure that edge cases are being thoroughly addressed. These improvements would also allow me to improve error handling while returning more descriptive error messages to the user.

## Activity Diagram
<img src="./Grey Matter Technical Assignment Activity Diagram.png">