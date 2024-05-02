# Node Express Server with TypeScript and Joi

This repository contains a Node.js Express server implemented in TypeScript, utilizing Joi for validation. It also integrates with the Rick and Morty API for data.

## Setup Guide

### Prerequisites

- Node.js installed on your machine (https://nodejs.org/)
- Yarn package manager (https://yarnpkg.com/)
- Git (https://git-scm.com/) (optional)

### Installation

1. Clone the repository:

``` bash
git clone https://github.com/your-username/express-typescript-joi.git
```

Or download the repository manually and extract it.

2. Navigate to the project directory:
``` bash
cd express-typescript-joi
```

3. Install dependencies using Yarn:
```
yarn install
```

## Running the Server Locally

1. Start the development server:
```
yarn dev
```

This command will compile TypeScript files and start the server using nodemon, which will automatically restart the server when changes are detected.
2. You should see output similar to the following:
```bash
yarn run v1.22.19
$ nodemon src/index.ts
Listening: http://localhost:5000
```

This indicates that the server is running locally on port 5000.
You can change it by adding the .env files the .env.example is present to help you setup environment variables
3. You can now access the server by visiting http://localhost:5000 in your web browser or using tools like Postman.

This project is deployed on the vercel

<a href="https://nodejs-server-kappa.vercel.app/" target="_blank">Cartoonify API </a>

```bash
https://nodejs-server-kappa.vercel.app/
```

Using the API
Once the server is running locally or deployed, you can access the following endpoints:

- /characters  : Returns a list of characters from the Rick and Morty API. ( Pagination Implemented )
- /characters/:id  : Returns details of a specific character by ID.

Go around and explore the API's in the Postman Schema

<a href="https://www.postman.com/lunar-resonance-819866/workspace/side-projects/request/24279670-f4ba7209-6d6d-42b2-9a4f-555fcc97d20b?tab=overview" target="_blank">Postman Schema</a>


```bash
https://www.postman.com/lunar-resonance-819866/workspace/side-projects/request/24279670-f4ba7209-6d6d-42b2-9a4f-555fcc97d20b?tab=overview
```


