# Show MAK

## About

### Description

Show MAK is a group project developed by Abdulkadir Musse, Mao Kitamura, and Kaunain Karmali designed to help users decide which tv show to start binge-watching next! Users can use the search bar to find TV Shows. Multiple custom lists can be created to add or remove shows. Users can upvote or downvote shows to affect their top 10 list.

### Key features

The following features exist:
* Search for TV shows to fetch shows from the TVmaze API
* Includes error handling to alert the user if no results are found or errors occur when making fetch calls
* API loading states displayed to user 
* Create multiple favourites list
* Add and remove shows from one or more lists
* Upvote and downvote shows 

### Project status

I am constantly looking to improve this project; therefore, this project is currently in development. 

Currently working on the following features:
* Improving user accessibility (i.e. to improve UX when using keyboard or a screen-readers)
* Creating a model to display TV show details
* Making small bug fixes 
* Making the site more pixel perfect!

## Getting started

Begin using the app by performing the following:

1. Clone down this repository. You will need `node` or `nodemon` and `npm` installed globally on your machine.

2. Begin running the app in your terminal
  * Run `npm i` to install dependencies
  * Run `npm start` while in the client folder

3. To visit and use the app:
  * Go to `localhost:3000` on your browser
  * Create a list
  * Search shows in the search bar
  * Add a show!

## Technology used

The following technology was used in the development of Show MAK:
* HTML5
* CSS
* JavaScript (ES6)
* React
* Styled components library
* TVmaze API

## Reflection

### How we got started

The project is a group project developed at Juno College's Web Development Bootcamp. Our client is a TV Shows fan (just as we are!) and was looking for an app to help them search for their next show to binge watch.

### Technical challenge

Our technical challenge was managing the app's architecture and data infrastructure to ensure our team was working harmoniously. To overcome this challenge, we developed a flowchart of the app's infrastructure to provide the team with a clear view of the app (see flowchart below). After getting a clear view of the app, we made key decisions regarding the app's data flow. This ensured a smooth workflow within our team.

![Show MAK data architechture flowchart](https://github.com/proj-four/project-four/blob/main/src/assets/projectArchitectureFlowchart.png)

## Licence

MIT License

Copyright (c) 2021 Kaunain Karmali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
