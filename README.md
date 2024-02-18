# AkashBlogs
This is the blogging platform for ziffi games




# Postgres Commands
 psql -U postgres
 CREATE DATABASE blogs_db;
 \list: to list all the databases
  DROP DATABASE blogs; : to drop the database

  const pgClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "blogs_db"
});


# Redis-cli commands
redis-cli
KEYS * : to sow all the keys

const HOST = "127.0.0.1";
const PORT = "6379";


var redisClient = redis.createClient({
    port: PORT,
    host: HOST,
    // password  : 'redispassword',
});


# TODOs
1. Create a Constants.js file and push all the constants over there
2. Improve logging (info, debug, error)
3. Add metrics and store it in separate db.
  a. Operational Metrics: Success or Failure response. Latency metrics.
  b. Business Intelligence Metrics: PageViews, UniqueVisitors, BounceRate, SessionDuration, TopPerfoming Posts, etc
4. Add unit tests
5. Add integration tests
6. Move from local databases to cloud databases (Free option: https://render.com/)
7. Deploy application
8. Setup alarms and monitoring
9. Improve UI
    a. There are some components like back button where code is duplicated. Create a separate component.
    b. Color theme, animation, etc
    c. Home page themes.
    d. Light and dark theme
10. Take care of edge cases like when db (postgres or redis) is disconnected. 
11. Security: Authentication & Authorization of users, removing secrets from code.