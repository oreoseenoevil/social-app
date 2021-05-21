# MERN Boilerplate

## Description

A MERN Social App:
Features:
Frontend and Backend Authentication (jwt)
Admin & User can view, update, and delete profile. (Only admin can delete other user)
Follow & Unfollow: WIP()

## Clone this Repo

```
git clone https://github.com/oreoseenoevil/social-app.git
cd mern-boilerplate
```

## Setup .env file

```
copy env.example .env
```

## Configure or Add your MONGODB URI, API & SECRET

```
  * MONGO_URI => for configuration
  * PORT & BASE_SERVER_URL & BASE_API_URL & BASE_CLIENT_URL
  * CLOUD_NAME & CLOUD_API_KEY & CLOUD_API_SECRET => cloudinary configuration
```

## Setting up .babelrc

```json
{
  [
    "module-resolver": {
      "root": ["./client"],
      "alias": {
        "@App": "./client/app/Ui/App"
        // You can add more directories to be more aesthetic
        // (i.e.) import { App } from '@App
      }
    }
  ]
}
```

## Install

Some basic Git commands are:

```
npm install
```

```
yarn install
```

## Run the application for development

```
npm start
```

```
yarnstart
```

## Heroku Deployment

```
> Move devDependencies to dependencies
> Create a Procfile in the root directory of your application with the following command **web: npm run start:production**
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)

### Code Formatter

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Prettier - Code formatter in VSCode
- Add the following snippet:

```json
{
  "editor.formatOnSave": true,
  "prettier.singleQuote": true,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.eol": "\n",
  "prettier.jsxSingleQuote": true,
  // Enable this once you're on the client folder/react
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```
