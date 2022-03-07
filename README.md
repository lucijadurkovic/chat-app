# Chat App

Real-time communication app, built with React.js and a messaging service [Scaledrone](https://www.scaledrone.com/).

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs neccesary dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage
In order to join one of the available chat rooms, first you must enter an arbitrary username and pick a room in which you wish to participate in the conversation.
In each room there is a list of online members who can see the messages, and each member is assigned a random color and a random avatar from the [Bigheads](https://bigheads.io/) library.
The messages are being send via the Scaledrone channel which also takes note of members leaving and joining the room.
