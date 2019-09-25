# The Shortcut Coding Challenge

This project is technical exercise for Shortcut company.
Project covers challenge named 'Streamin Twitter Tweets'

## The Challenge:

### Streaming Twitter Tweets

A client wants to build a web-based application (and relevant infrastructure) to stream Twitter tweets to end-users in real-time.

## How to run project

In the project directory first run command: `yarn install`. This will install all dependencies of this project.

To test project please run command: `yarn test`. This command launches test runner and tests whether project passes tests.

Before running project you need to paste `API_KEY`, `API_SECRET_KEY`, `ACCESS_TOKEN` and `ACCESS_TOKEN_SECRET` values into `.env` file. You can also place those values right into `process.env`. To obtain those values please visit [Twitter Developer](https://developer.twitter.com/) website.

To run project please run command: `yarn develop`. This command launches server and client of the project. Open [http://localhost:4000](http://localhost:4000) to view project in the browser.

## Scope of exercise

This project connects to Twitter stream API and retrieves tweets in realtime.

User can view unfiltered stream by accessing [http://localhost:4000/stream](http://localhost:4000/stream), or use search to view stream for keyword. There is also available list of streams based on popular keywords.

On serverside there is used [Express](https://www.npmjs.com/package/express) and Http to initialize server. To build connection between server and client there is used Websocket dependency [WS](https://www.npmjs.com/package/ws). For streaming tweets there is used [Twit](https://www.npmjs.com/package/twit) dependency.

On clientside there is used [React](https://www.npmjs.com/package/react) through [Create-react-app](https://github.com/facebook/create-react-app) CLI to serve app for user. Routes are managed by [react-router-dom](https://github.com/facebook/create-react-app). Data from backend is served through browsers native Websocket. Styles are created through SCSS and they are processed by [node-sass](https://www.npmjs.com/package/node-sass).

Testing is done through [Jest](https://www.npmjs.com/package/jest) test runner.

## Summary

Hope you will enjoy using this app as much as I enjoyed building it.
