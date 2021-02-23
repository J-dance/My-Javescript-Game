Project Title: Grid memory game

This is my first game project and was programmed using Javascript, HTML and SCSS. The games objective is to get to the finish position shown as a bed within the grid. The user must navigate the grid using the arrow keys on the keyboard. The player must avoid landing on the same position as the 'bad' grey tiles, which are hidden after a set time period. Landing on the 'bad' tiles results in loosing a life. At the begining of the game the player has 3 lives. Once all three lives are gone the game is over and resets to level one.

Technologies used are HTMl, SCSS and Javascript. 
All HTML is written in the index.HTML file. 
All Javascript is written in the script.js file.
The assets folder contains all the images used and the SCSS/CSS files. Style sheets were created for the following game components: variables, typography (fonts), layout, buttons and these are all linked in the styles.scss file, which in turn is linked to the index.html file.

Functionality: 
An event listener is used for the arrow key inputs. A switch case is then enables whih determines where on the grid the player moves to. The new position is checked against the 'bad' tile positions and the finish position. If the finish position is reached, the current level variable is updated and the next level loaded. If the 'bad' tile position is a match then the player looses a life. The updated lives are checked with an if statement. If the lives are equal to zero then game over diplays and the level is set to one. If it is greater than zero the curent level resets.

The level information is stored in an array of objects. Each array index is a level object. Each level object jhad keys with the level information e.g. number of grid tiles, start position and the 'bad' tile positions.


Author: Jojo Dance 02/2021