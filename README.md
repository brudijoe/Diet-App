# Diet-App

> With this app you can check your diet process.

### **Stack used:**  
* MongoDB - Document database
* Express(.js) - Node.js web framework
* React(.js) - Client-side JavaScript framework
* Node(.js) - JavaScript web server 
* Recharts - Chart Library
* Auth0 - Authorization/Authentication platform

## Quick Start

To start you need to add an .env file with your own database credentials in the Diet-App folder. Plus you need credentials for auth0.

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:9000 and client on http://localhost:3000
```

## **Screenshots:**

**Home/Landing Page**
![Overview Diet-App](./client/src/images/Demo.png?raw=true)

## TODOs

## Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page but you will need a credit card for verify your persona because this app uses auth0.

## App Info

### Author

Ingo Speckens

### Version

1.0.0

### License

This project is licensed under the ISC License