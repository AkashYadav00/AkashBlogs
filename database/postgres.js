const { Client } = require("pg")

const pgClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "blogs_db"
});

const MAX_BLOGS_ALLOWED = 100; // chosen an arbitary number


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
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        const result = await pgClient.query("SELECT * FROM Blog;");
        return result.rows;
    } catch (error) {
        console.error("Error selecting all rows from Blog table:", error);
        return [];
    }
}

async function findBlogFromId(id) {
    try {
        const result = await pgClient.query({
            text: `SELECT * FROM Blog where id=$1;`,
            values: [id]
        });
        console.log("inside findBlogFromId, result.rows = " + JSON.stringify(result.rows));
        return result.rows;
    } catch (error) {
        console.error("Error selecting all rows from Blog table:", error);
        return [];
    }
}

async function insertBlogIntoDatabase(title, content) {
    try {
        const created_at = new Date().toISOString();
        const query = {
            text: `
                INSERT INTO Blog (title, content, created_at)
                VALUES ($1, $2, $3)
            `,
            values: [title, content, created_at]
        };
        await pgClient.query(query);
        console.log("Blog inserted successfully");
    } catch (error) {
        console.error("Error inserting blog in Blog table:", error);
    }
}

async function init() {
    console.log("inside postgres");
    connectToDatabase()
        .then(() => {
            return createTable();
        })
        .catch(error => {
            console.error("Error:", error);
            throw new Error("Error while connecting Postgres");
        });
        console.log(" postgres completed");
}


module.exports = { 
    findBlogFromId,
    init, 
    insertBlogIntoDatabase,
    selectAllFromBlog,
 };




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