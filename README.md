# galvanize-group-project-1

AF Fitness Tracker App

Uses nginx as a reverse proxy to serve up 5 full stack components developed by the team.

Set up your sql seed data in the init.sql file.

Use `docker-compose up --build` to build and run the images.

Changes to your node dependencies or to the seed data will likely require a rebuild to take effect. In addition, will likely require dropping volumes first.

Use `docker-compose down -v` to drop your volumes. Note that this removes all data in them, so non-seeded database entries go away.

Mac users may get a permissions error relating to the entrypoint.sh files. You will need to use the following command for each one `chmod +x entrypoint.sh`. I'll leave it up to you to see if there is a way to do it to all at once.

Look at the nginx.conf file if unsure about your component's URL path. The location entry that has your docker container name is the path.

When connecting your backend to your database, look at the environment variables in the docker-compose file to see what your username/password are. The host will be the container name.

If you want to use a different database than postgres, just make sure you understand how to change the docker-compose first.

I will give further instructions on validating users through the SSO once it is more setup. But the basics are that you will scan their headers for a token, then send that token to the sso_backend to verify it and return the user data. At that point, you should either issue your own token or you will need to validate each request you get.
