# Readable App

Welcome to Readable! This is an application with the goal of learning the core concepts of Redux. It's build using the create-react-app toolset.
<br>
You can create posts, comments, like them, delete them, sort them by vote, date and so on. Think of a "mini-reddit".

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

```
Git installed
Node and NPM installed
```

### Installing

Open the console and follow these steps:

Git clone the repo & cd to file

```
git clone git@github.com:vsagrista/readable.git
```

Now open another terminal tab

```
cd api-server
npm install
```

Wait for NPM to download the node libraries
Then:

```
node server
```

Now the server is running, go to the first tab you opened and do the same with the front end folder:

```
cd frontend
npm install
npm start
```

The last command will automatically open the app in the brower. Once it does, you will see the home view, with some posts and categories that come from the API by default (api-server). Play around with it, type something, upvote or delete. Enjoy!

## Built With

* ReactJS - The web framework used
* Using create-react-app - React app boilerplate tool 
* Redux - State management React library
