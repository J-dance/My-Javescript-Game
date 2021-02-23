// ---------------------------------

// Populate grid with div, class = tile and id = tile-xj-yi
// n is number of rows/columns

const createGrid = (n) => {
  let mainGridEl = document.getElementById('main-grid');
  // add grid class
  mainGridEl.classList.add(`grid-${n}x${n}`);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      document.getElementById('main-grid').innerHTML += `<div id="tile-x${j+1}-y${i+1}" class="tile"></div>`;
    }
  }
}

// clear grid area function
const clearGrid = () => {
  document.getElementById('main-grid').innerHTML = '';
}

// remove class previously added to main-grid
const removeGridClass = (n) => {
  let mainGridEl = document.getElementById('main-grid');
  // remove all grid class
  mainGridEl.className = '';
  // add first level grid class
  mainGridEl.classList.add(`main-grid`);
  mainGridEl.classList.add(`grid${n}x${n}`);
}
// ---------------------------------
//  ** Declare Global Variables **
//  define position variable
let position = [];

// define current level variable
let currentLevel = 1;

// player information, set lives to 3 at start and number of moves to 0
const playerInfo = {
  lives: 3,
  numOfMoves: 0
}

// ---------------------------------
// **** Define Level Information ****
//  layout(key): even index = x-coordinate, odd index = y-coordinate
const levelInfo = [
  {
    level: 1,
    layout:[2, 1,
            2, 2,
            2, 3,
            4, 3,
            4, 4,
            4, 5
    ],
    start: [1, 1],
    finish: [5, 5],
    gridNum: 5,
    time: 1500
  },
  {
    level: 2,
    layout:[4, 1,
            2, 2,
            4, 3,
            2, 4,
            4, 5
    ],
    start: [1, 1],
    finish: [5, 5],
    gridNum: 5,
    time: 1000
  },
  {
  level: 3,
    layout:[1, 1,
            2, 1,
            3, 1,
            4, 1,
            5, 1,
            3, 2,
            3, 3,
            3, 4,
            3, 5
    ],
    start: [1, 2],
    finish: [4, 3],
    gridNum: 5,
    time: 1000
  },
  {
  level: 4,
    layout:[1, 2,
            2, 1,
            3, 1,
            4, 1,
            5, 1,
            1, 4,
            2, 4,
            3, 4,
            5, 5,
    ],
    start: [1, 1],
    finish: [4, 3],
    gridNum: 5,
    time: 1000
  },
  {
    level: 5,
    layout:[1, 1,
            4, 1,
            5, 1,
            3, 2,
            2, 3,
            1, 4,
            2, 4,
            4, 4,
            5, 4,
            3, 5
    ],
    start: [5, 5],
    finish: [3, 4],
    gridNum: 5,
    time: 1000
  },
  {
  level: 6,
    layout:[4, 1,
            6, 1,
            1, 2,
            2, 2,
            4, 2,
            5, 2,
            6, 2,
            3, 3,
            5, 4,
            6, 4,
            4, 5,
            5, 5,
            3, 6
    ],
    start: [3, 4],
    finish: [5, 1],
    gridNum: 6,
    time: 1000
  },
  {
    level: 7,
    layout:[1, 1,
            3, 1,
            4, 1,
            4, 2,
            5, 2,
            6, 2,
            1, 3,
            2, 3,
            1, 4,
            4, 4,
            5, 4,
            2, 5,
            5, 5,
            3, 6,
            6, 6
    ],
    start: [1, 6],
    finish: [6, 1],
    gridNum: 6,
    time: 1000
  },
  {
    level: 8,
    layout:[1, 1,
            2, 1,
            3, 1,
            4, 1,
            6, 1,
            8, 1,
            4, 2,
            8, 2,
            1, 3,
            3, 3,
            5, 3,
            7, 3,
            8, 3,
            6, 4,
            1, 5,
            2, 5,
            4, 5,
            6, 5,
            8, 5,
            5, 6,
            1, 7,
            7, 7,
            8, 7,
            2, 8,
            3, 8,
            4, 8,
            6, 8
    ],
    start: [1, 2],
    finish: [1, 8],
    gridNum: 8,
    time: 1100
  }
]

// define array with each index having array of coordinates for each bad tile
let badTileArray = [];

// ---------------------------------
// create tile id's from position coordinate array: [x, y]
const tileIdFromLocation = (coordinate) => {
  return `tile-x${coordinate[0]}-y${coordinate[1]}`;
}

// render start position
const showStartPosition = () => {
  document.getElementById(tileIdFromLocation(levelInfo[currentLevel-1].start)).innerHTML += '<div id="player" class="player tiredEyes"></div>';
}

// render finish position
const showFinishPosition = () => {
  document.getElementById(tileIdFromLocation(levelInfo[currentLevel-1].finish)).innerHTML += '<div class="finish"></div>';
}

// render lives
const showLives = () => {
  document.getElementById('livesCounter').innerHTML = `LIVES: ${playerInfo.lives}`;
}

// Display the current level
const showLevel = () => {
  document.getElementById('levelDisplay').innerHTML = `LEVEL: ${currentLevel}`;
}

// render number of moves
const showNumberMoves = () => {
  document.getElementById('movesCounter').innerHTML = `MOVES: ${playerInfo.numOfMoves}`;
}

// function to reset moves
const resetNumOfMoves = () => {
  playerInfo.numOfMoves = 0;
  showNumberMoves();
}

// add message to instructions
const addMessage = (message) => {
  let x = document.getElementById('instructionsContainer');
  x.innerHTML += `<p class="instructions">${message}</p>`;
}
// show instruction
const showinstructions = () => {
  setTimeout(function(){addMessage("Navigate the grid using the arrow keys")}, 1000);
  setTimeout(function(){addMessage("Objective: Get Freddy to bed ...but watch out!")}, 3000);
  setTimeout(function(){addMessage("Avoid landing on one of the grey tiles at all costs")}, 5000);
  setTimeout(function(){addMessage("Tip: Keep your eyes peeled at the start of each level and try to memorize the grid pattern before it disappears!")}, 7000);
}

// function which removes invisible class from all bad tiles
const removeInvisible = () => {
  let badList = document.querySelectorAll('div.bad');
  
  badList.forEach(tile => {
    tile.classList.remove('invisible');
  })
}

// add swirl
const addSwirl = (badTile) => {

  document.getElementById(tileIdFromLocation(badTile)).classList.add('swirl');
}

// remove swirl image class
const removeSwirl = (badTile) => {
  document.getElementById(tileIdFromLocation(badTile)).classList.remove('swirl');
}

// sliding tile anaimation
const slidingTile = (badTile) => {
  document.getElementById(`x${badTile[0]}-y${badTile[1]}`).classList.add('marginSlide');
}

// remove sliding tile animation class
const removeSlidingTile = (badTile) => {
  document.getElementById(`x${badTile[0]}-y${badTile[1]}`).classList.remove('marginSlide');
}

// add spin
const addSpin = () => {
  document.getElementById('player').classList.add('spin');
}

// add sleeping animation class
const addSleeping = () => {
  document.getElementById('player').classList.add('sleep');
}

// function which adds .invisible class to .bad tiles
const setInvisible = () => {
  // get list of all div elements with .bad
  let badList = document.querySelectorAll('div.bad');
  
  badList.forEach(tile => {
    tile.classList.add('invisible');
  })
}

// add bad tiles to grid with class .bad and populate badTilesArray 
const addBadTiles = () => {
  // reset bad tiles array
  badTileArray = [];
  // Each tile has two values. iterate for each tile
  for (let i = 0; i < levelInfo[currentLevel-1].layout.length / 2; i++) {
    let index = 2 * i;
    let param = levelInfo[currentLevel-1].layout[index];
    let param2 = levelInfo[currentLevel-1].layout[index+1];
    document.getElementById(`tile-x${param}-y${param2}`).innerHTML += `<div id="x${param}-y${param2}" class="bad"></div>`;

    // update bad tiles array
    badTileArray.push([levelInfo[currentLevel-1].layout[index], levelInfo[currentLevel-1].layout[index+1]]);
  };
}

// show play agin button
const reset = () => {
  document.getElementById('startContainer').innerHTML += `<div id="resetButton" onclick="playAgainReset()">Play Again?</div>`;
}

// set bad tile to invisible
const addInvisible = (badTile) => {
  document.getElementById(`x${badTile[0]}-y${badTile[1]}`).classList.add('invisible');
}

// reset function for play again button
const playAgainReset = () => {
  document.getElementById('startContainer').innerHTML = '';
  initializeLevel();
}

// set start button to invisible
const startButtonInvisible = () => {
  let x = document.getElementById('startContainer');
  x.innerHTML = '';
}

// show game over message
const showGameOver = () => {
  document.getElementById('main-grid').innerHTML = '';
  setTimeout(displayGameOver, 500);
  setTimeout(reset, 1000);
}

// gameover message display
const displayGameOver = () => {
  document.getElementById('startContainer').innerHTML = `<div class="gameOver">Game Over</div>`;
}

// begin level function runs onclick of start button
const beginLevel = () => {
  startButtonInvisible();
  let x = document.getElementById('instructionsContainer').classList.remove('invisible');
  showinstructions();
}

// clear instructions and initialize level
const clearInstructions = () => {
  let x = document.getElementById('instructionsContainer');
  x.innerHTML = '';
  x.classList.add('invisible');
  initializeLevel();
}

// initialize level: this funciton will be called onclick of start button
const initializeLevel = () => {
  removeGridClass(levelInfo[currentLevel-1].gridNum);
  // set position to start of current level
  position = levelInfo[currentLevel-1].start;
  clearGrid();
  createGrid(levelInfo[currentLevel-1].gridNum);
  showFinishPosition();
  addBadTiles();
  showStartPosition();
  showLives();
  showLevel();
  showNumberMoves();

  // call setInvisible function with time delay
  setTimeout(setInvisible, levelInfo[currentLevel-1].time);
}
// initializeLevel();

// ---------------------------------
// detect arrow key movement (up, right, left, down)
window.addEventListener("keydown", (event) => {
  
  let newPosition = [...position];

  switch (event.key) {
    case 'ArrowUp':
      console.log('you pressed up');
      newPosition[1] += -1;
      clearPosition(position);
      position = renderPosition(newPosition);
      break;

    case 'ArrowLeft':
      console.log('you pressed left');
      newPosition[0] += -1;
      clearPosition(position);
      position = renderPosition(newPosition);
      break;
    
    case 'ArrowRight':
      console.log('you pressed right');
      newPosition[0] += 1;
      clearPosition(position);
      position = renderPosition(newPosition);
      break;
    
    case 'ArrowDown':
      console.log('you pressed down');
      newPosition[1] += 1;
      clearPosition(position);
      position = renderPosition(newPosition);
      break;
    
    default:
      console.log('not an arrow key');
  }
  // increase moves counter
  playerInfo.numOfMoves++;
  showNumberMoves();
}
);

// clear player current position
const clearPosition = (currentPosition) => {
  parentId = document.getElementById(tileIdFromLocation(currentPosition));
  console.log(`from clear position ${tileIdFromLocation(currentPosition)}`);
  childId = document.getElementById(`player`)
  let oldNode = parentId.removeChild(childId);
}

// Check if player has reached edge of grid
const checkPlayerAtEdge = (n, newPosition) => {
  if (newPosition[0] == n+1) {
    newPosition[0] = 1;
  }
  else if (newPosition[0] == 0) {
    newPosition[0] = n;
  }
  // if statement for out of grid moves. set so at other end of grid (y-axis)
  if (newPosition[1] == n+1) {
    newPosition[1] = 1;
    console.log('work3');
  }
  else if (newPosition[1] == 0) {
    newPosition[1] = n;
  }
  return newPosition;
}

// render player new position
const renderPosition = (newPosition) => {
  // check if at grid edge
  newPosition = checkPlayerAtEdge(levelInfo[currentLevel-1].gridNum, newPosition);
  
  // create string id for new position
  tileLocation = tileIdFromLocation(newPosition);
  console.log(newPosition);

  // add new player figure to grid
  document.getElementById(tileLocation).innerHTML += '<div id="player" class="player tiredEyes"></div>';

  // check if player has reached finish
  let resultFinish = checkForFinish(newPosition);

  // check if new position == one of .bad tiles
  //  result is true for bad tile/death, false for safe
  let resultBad = checkForBadTile(newPosition);

  // update and return Newposition
  // if player died, this must be returned as start position of current level
  // if reached finish, new position must be next level start
  // else return new position
  if (resultBad == true) {
    return levelInfo[currentLevel-1].start
  }
  else if (resultFinish == true) {
    return levelInfo[currentLevel-1].start;
  }
  else {
    return newPosition;
  }
}

// death function: decrease player lives and reset level to start position
const playerDeath = (position) => {
  // clear position
  clearPosition(position);

  // reset position to start of that level
  position = levelInfo[currentLevel-1].start;
  console.log(`yoyo ${levelInfo[currentLevel-1].start}`);
  setTimeout(showStartPosition, 500);

  // reset moves counter
  resetNumOfMoves();
  
  // flash bad tiles again
  setTimeout(removeInvisible(), 500);
  setTimeout(setInvisible, levelInfo[currentLevel-1].time);

  // decrease lives count
  playerInfo.lives += -1;
  console.log(`you now have ${playerInfo.lives} lives left`);
  showLives();

  // if lives = 0: game over
  if (playerInfo.lives == 0) {
    console.log('**** Game Over ****');
    // show game over message
    showGameOver();

    // reset game
    playerInfo.lives = 3;
    currentLevel = 1;
    // removeGridClass(levelInfo[currentLevel-1].gridNum);
  }
}

// check for .bad position
const checkForBadTile = (position) => {
  let result = false;

  badTileArray.forEach((badTile) => {

    if (badTile[0] == position[0] && badTile[1] == position[1]) {
      console.log("is bad..");

      // show bad tiles
      // removeInvisible();
      document.getElementById(`x${badTile[0]}-y${badTile[1]}`).classList.remove('invisible');
      // add wide eye to player
      document.getElementById('player').classList.remove('tiredEyes');
      document.getElementById('player').classList.add('bigEyes');
      // add sliding tile animation, lasts 1 second
      setTimeout(function(){slidingTile(badTile)}, 500);
      // add swirl image to tile
      setTimeout(function(){addSwirl(badTile)}, 500);    
      // add spin class to player, lasts 2 seconds
      setTimeout(addSpin, 1500);
      // add invisible to bad tile once finished
      setTimeout(function(){addInvisible(badTile)}, 1500);

      // remove margin sliding animation
      setTimeout(function(){removeSlidingTile(badTile)}, 3500);
      // remove swirl image before player death runs
      setTimeout(function(){removeSwirl(badTile)}, 3500);
      // run playerDeath
      setTimeout(function(){playerDeath(position)}, 3500);

      result = true;
    }
  })
  return result;
}

// win function: change current level counter +1 and initialize again
const nextLevel = () => {
  currentLevel += 1;
  console.log(currentLevel);
  resetNumOfMoves();
  initializeLevel();
}

// check if player has reached finish position
const checkForFinish = (position) => {
  let result = false;
  if (position[0] == levelInfo[currentLevel-1].finish[0] && position[1] == levelInfo[currentLevel-1].finish[1]) {
    // show finish message
    console.log('Congratulation!!!.. You Won!');
    // add sleeping eyes
    document.getElementById('player').classList.remove('tiredEyes');
    document.getElementById('player').classList.add('sleepEyes');
    // add sleeping animation
    setTimeout(addSleeping, 500);
    // run next level funciton
    setTimeout(nextLevel, 2500);
    result = true;
  }
  return result;
}


