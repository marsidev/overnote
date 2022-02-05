<div align="center">

  # <img src="https://raw.githubusercontent.com/marsigliadev/overnote/main/packages/app/public/favicon.ico" height="30px"/> [Overnote](https://radiant-mountain-30055.herokuapp.comm)
  
  ***A simple notes app***
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#built-with">Built with</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</details>

## About the project

**Overnote** is a simple notes app. It allows you to create, edit, customize and delete notes. 
This project is a result of a [FullStack Bootcamp](https://www.youtube.com/watch?v=wTpuKOhGfJE&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7) directed by [@midudev](https://github.com/midudev/).
The UI is inspired on [Google Keep](https://keep.google.com/), my favorite notes app.

<p align="right"><a href="#top">Back to top 🔼</a></p>

## Getting started

Add the following environment variables to your `.env` file in `/packages/api`:
- `MONGODB_URI=<your-mongodb-uri>`
- `JWT_SECRET=<your-jwt-secret>`
- `JWT_DAYS_TO_EXPIRE=<your-jwt-days-to-expire>`

Add the following environment variables to your `.env` file in `/packages/app`:
- `SKIP_PREFLIGHT_CHECK=true`

Install dependencies

```javascript
$ yarn
```

Run the app
  
```javascript
$ yarn build && yarn start
```

Run as development

```javascript
$ yarn build && yarn dev
```

Open the app in your browser (http://localhost:8888)

  Note that this is a mono-repo project, so you need to build the app before running it because the build folder is served by the api server.

  Alternatively, you can run the app and the api server separately with the following:
  - Execute in terminal 1: `$ yarn run dev`
  - Execute in terminal 2: `$ yarn run start:app`
  - Open the app in your browser (http://localhost:3000)

<p align="right"><a href="#top">Back to top 🔼</a></p>

## Built with

  - [React](https://reactjs.org/)
  - [Webpack](https://webpack.js.org/)
  - [Babel](https://babeljs.io/)
  - [Chakra UI](https://chakra-ui.com/)
  - [React Router v6](https://reacttraining.com/react-router/web/guides/quick-start)
  - [Framer Motion](https://framer.com/motion)
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)

<p align="right"><a href="#top">Back to top 🔼</a></p>

## Contributing

Any contributions you make are greatly appreciated. If you have a suggestion that would make this better, please fork the repo and create a Pull Request. You can also simply [open an issue](https://github.com/marsigliadev/overnote/issues/new).

<p align="right"><a href="#top">Back to top 🔼</a></p>

## Contact

  **Luis Marsiglia**
  - [Twitter](https://twitter.com/marsigliacr)
  - [Email](mailto:marsiglia.business@gmail.com)

<p align="right"><a href="#top">Back to top 🔼</a></p>