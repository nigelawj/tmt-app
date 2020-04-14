# tmt-app
TMT25 - Test application for the development of a Trail Making Test, a neuropsychological test to help determine if a subject has dementia.

The contents of this Git Repository consist of all files up to the preparation for deployment on Heroku.
The production build can be found hosted [here](https://serene-beach-06053.herokuapp.com/)

# Running the application
Node.JS is required. 

1) In the main folder, run 'npm install' to install back-end dependencies.
2) cd into client folder and run 'npm install' again to install client dependencies.
3) To test in a development environment, run 'npm run dev' in the main folder to load a custom script.

# Notes
- 'dotenv' instead of 'config' should be used to handle env. variables
- config files containing MongoURI are not commited; config files (default.json) will need to be created

Thank you TraversyMedia for guiding me alongside the development of this app!
