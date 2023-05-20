## Requirements
* Node 8
* Git
* Mongodb

## Common setup

Clone the repo and install the dependencies.

```bash
npm install
```

## Steps for read-only access

To start the express server and convert TS file to JS in folder "build", run the following

```bash
npm run dev
```

To rebuild app when you would grab files, run the following
```bash
npm run build
```

To clear app, run the following
```bash
npm run clear
```
Open [http://localhost:3000](http://localhost:3000) and take a look around.


## Steps for read and write access (recommended)

Step 1: Open `.env` and inject your values so it looks like this

```
PORT=3000
SERVER_PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/<database_name>
NODE_ENV= development | production
SECRET_KEY=<specify_key>
REFRESH_KEY=<specify_key>
AUTH_TYPE=jwt
```

Step 2: To start the express server, run the following
```bash
npm run dev
```
