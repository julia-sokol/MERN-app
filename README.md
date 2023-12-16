# Cookery Book App

## Technology Stack

**Backend:** Node.js + Express.js<br />
**Frontend:** React.js<br />
**Database System:** MongoDB

## Installation Steps

1. Clone this repository to your local machine, which will act as the server.
2. Download and install Node.js from nodejs.org/en/download
3. In order to create a MongoDB cloud database, do the following steps:
- Create account on https://www.mongodb.com/cloud/atlas/register
- Create a new project -> create a new database cluster deployment -> save your username and password.
- Connect to your new cluster with MongoDB Driver -> copy connection string and paste it into the MONGO_URI field in the `MERN-app/backend/.env` file.
- Change the <password> field to the password set during the database cluster deployment creation phase.
4. Create a secret key, for example using a random password generator, and paste it into the SECRET field in the `MERN-app/backend/.env` file.
5. Change directory to MERN-app/backend/ and run `npm run dev` on the command line.
6. In another terminal, change directory to MERN-app/frontend/ and run `npm start` on the command line.
7. Sign up in the browser at localhost:3000
    
