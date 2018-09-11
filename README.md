# Multiplayer Gold Rush
## Introduction
This repo contains a frontend and backend for a multiplayer Gold Rush game. It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. The backend exposes a REST API but also sends messages over websockets using SocketIO. 

## Demo
<a href="client/src/images/demo.gif"><img src="https://i.imgflip.com/2hoat5.gif" title="made at imgflip.com"/></a>
[A demo of our game](client/src/images/demo.gif)

## Playing the game
1. download the repo
2. create a docker ()
3. In the terminal, go to the client folder and run the React app "yarn start"
4. At the very beginning, you need to comment out part of the Player entity in the /server/src/games/entities:
    @Column()
    userId: number
5. In another terminal, go to the server folder and run "yarn watch"
6. In the third terminal, go to the server folder and run "nodemon ."
7. After the tables are created, uncomment part 4.
8. sign up as a new user.
9. copy your ip address (find in the terminal after running yarn start in part 3) and paste it in the '/client/src/constants.js' file as a baseUrl.
10. share your ip address with your friend.
9. Enjoy playing the game

## To do
1. fix the commenting and uncommenting mentioned in part 4 and 7 in the Playing the game section
2. make a Material-UI model  which appears after the game finishes and shows the winner.
3. Make a difficulty level (easy, medium, hard)
   - Easy: the current game
   - Medium: the number of bombs are doubled
   - Hard: the location of gold/bombs/diamond will be change after a short time (even without clicking any mouse button)
4. Ask for player's name and show them on top
5. More than two users can play the game together

