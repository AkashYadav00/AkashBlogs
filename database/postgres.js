const { Client } = require("pg")

const pgClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "blogs"
});

const MAX_BLOGS_ALLOWED = 1000; // chosen an arbitary number

console.log("inside postgres");

async function connectToDatabase() {
    try {
        await pgClient.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}


async function createTable() {
    try {
        await pgClient.query(`
            CREATE TABLE IF NOT EXISTS Blog (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_by VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_by VARCHAR(100),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table created successfully");
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

/*
This function returns all the blogs. 
Caution: Pagination is required. Make sure blogs count is not too much
*/
async function selectAllFromBlog() {
    try {
        const blogsCount = await pgClient.query("COUNT * FROM Blog");
        if (blogsCount > MAX_BLOGS_ALLOWED) {
            console.error("Too many blogs");
            return;
        }
        const result = await pgClient.query("SELECT * FROM Blog;");
        console.log("All rows from Blog table:", result.rows);
    } catch (error) {
        console.error("Error selecting all rows from Blog table:", error);
    }
}

async function disconnectFromDatabase() {
    try {
        await pgClient.end();
        console.log("Disconnected from the database");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
}

async function insertBlogIntoDatabase(title, content) {
    try {
        const created_by = "admin";
        const updated_by = "admin";
        const created_at = new Date().toISOString();
        const updated_at = new Date().toISOString();
        
        const query = {
            text: `
                INSERT INTO Blog (title, content, created_by, created_at, updated_by, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6)
            `,
            values: [title, content, created_by, created_at, updated_by, updated_at]
        };
        await pgClient.query("");
        console.log("Blog inserted successfully");
    } catch (error) {
        console.error("Error inserting blog in Blog table:", error);
    }
}


connectToDatabase()
    .then(() => {
        return createTable();
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        disconnectFromDatabase();
    });


module.exports = {insertBlogIntoDatabase};




/*

Blog: 
-> title
-> content
-> createdBy
-> createdAt
-> updatedBy
-> updatedAt


CREATE TABLE Blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/