# AkashBlogs
This is the blogging platform for ziffi games




# Postgres Commands
 psql -U postgres
 CREATE DATABASE blogs_db;
 \list: to list all the databases
  DROP DATABASE blogs; : to drop the database


# Redis-cli commands
redis-cli
KEYS * : to sow all the keys


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