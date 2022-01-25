

**"MyBlog" User authentication system**

MyBlog is a conceptual blogging app where each user is able to maintain their
own blog, and this repository contains a user authentication system where users
can create their own user accounts and maintain their own private sessions using
express-session.

In order to run your own local version of the server, first install
Node.js and NPM, then run

> npm install

On the root directory. This will automatically install all of the
necessary NPM libraries. Next, create the following environment
variables on your machine containing 

Next, do the following:
- Install PostgreSQL and make sure it is running.
- Create the following environment variables with the relevant values:
	- MYBLOG_DATABASE (Containing the name of your Postgres db)
	- MYBLOG_HOST (The IP address of your server, you can also use localhost)
	- MYBLOG_IP_TEST (The public IP address of your machine, for testing on localhost)
	- MYBLOG_PASSWORD (The password of your Postgres server)
	- MYBLOG_PORT (The port# your Postgres server is running on)
	- MYBLOG_USER (The user of your Postgres db)

Finally, run

> node database/generateDbSchema.js

to populate your database with the necessary tables.

Your MyBlog server should now be running.

**Be aware that this project stores user data relating to their local time zones, and**
**it also scans IP addresses to determine which time zone a connection is originating from.**

