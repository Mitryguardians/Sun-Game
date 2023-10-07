import plateform from "./game_plateforme.js";

const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');

const tileSize = 10;
const numRows = 128;
const numCols = 128;

canvas.width = tileSize * numCols;
canvas.height = tileSize * numRows;
const gravity = 0.5;

class Map {
  constructor() {
    this.mapData = this.initializeMap();
  }

  initializeMap() {
    const map = [];

    for (let row = 0; row < numRows; row++) {
      const rowArray = [];
      for (let col = 0; col < numCols; col++) {
        if (row === 0 || row === numRows - 1 || col === 0 || col === numCols - 1) {
          rowArray.push(1);
        } else {
          rowArray.push(0);
        }
      }
      map.push(rowArray);
    }

    return map;
  }

  draw() {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        ctx.fillStyle = this.mapData[row][col] === 1 ? 'red' : 'white';
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }
}

class Player {
  constructor() {
    this.width = 30;
    this.height = 100;
    this.position = {
      x: canvas.width / 2,
      y: canvas.height - this.height / 2
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.jumpStrength = 10;
    this.isJumping = false;
  }

  draw() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );
  }

  jump() {
    if (!this.isJumping) {
      this.velocity.y = -this.jumpStrength;
      this.isJumping = true;
    }
  }

  right() {
    this.velocity.x = 5;
  }

  left() {
    this.velocity.x = -5;
  }
  
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    if (this.position.y + this.height / 2 >= canvas.height) {
      this.position.y = canvas.height - this.height / 2;
      this.velocity.y = 0;
      this.isJumping = false;
    } else if (this.position.y - this.height / 2 <= 0) {
      this.position.y = this.height / 2;
      this.velocity.y = 0;
      this.isJumping = false;
    }
    if(this.position.x + this.width /2 >= canvas.width){
      this.position.x = canvas.width - this.width /2;
      this.isJumping = true;
    }else if(this.position.x - this.width /2 <= 0){
      this.position.x = this.width /2;
      this.isJumping = true;
    }
    // Gravity
    this.velocity.y += gravity;
  }
}

const spwnplateform = new plateform(20, 30, { x: 10, y: 1200 })
const gameMap = new Map();
const player = new Player();
function updateGame() {
  player.update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameMap.draw();
  player.draw();
  requestAnimationFrame(updateGame);
  spwnplateform.draw(ctx);
}

addEventListener('keydown', (e) => {
  console.log(e.code);
  if (e.code === 'Space') {
    player.jump();
  }
  if (e.key === 'd' || e.key === 'D') {
    player.right();
  }
  if (e.key === 'q' || e.key === 'Q') {
    player.left();
  }
});

addEventListener('keyup', (e) => {
  if ((e.key === 'd' || e.key === 'D' || e.key === 'q' || e.key === 'Q') && player.velocity.x !== 0) {
    player.velocity.x = 0;
  }
});

updateGame();
