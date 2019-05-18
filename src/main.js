'use strict';

/* global PIXI utils KeyBoard */
let type = 'WebGL';
// Images
const CAT_PATH = 'images/cat.png';
const TILE_PATH = 'images/tileset.png';
const TH_PATH = 'images/treasureHunter.json';
// Aliases
const Application = PIXI.Application;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;
const TextureCache = PIXI.utils.TextureCache;
// const Rectangle = PIXI.Rectangle;

const UNIT = 32;

let keySetup = {
  'A': {
    'down': () => {
      console.log('A is down.');
    },
    'up': () => {
      console.log('A is up.');
    }
  }
};
let keyboard = new KeyBoard();
keyboard.loadSetup(keySetup);

if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}

PIXI.utils.sayHello(type);
// Create a Pixi Application
const option = {
  width: 512, // default: 800
  height: 512, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1 // default: 1
};
let app = new Application(option);

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// load an image and run the `setup` function when it's done
loader
  .add([
    CAT_PATH,
    TILE_PATH,
    TH_PATH
  ])
  .load(setup);

// This `setup` function will run when the image has loaded
let dungeon, treasure, explorer;
function setup () {
  let dungeonTexture = TextureCache['dungeon.png'];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  treasure = new Sprite(resources[TH_PATH].textures['treasure.png']);
  treasure.x = dungeon.width - treasure.width / 2 - 68;
  treasure.y = dungeon.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  let door = new Sprite(resources[TH_PATH].textures['door.png']);
  door.x = UNIT;
  door.y = 0;
  app.stage.addChild(door);

  explorer = new Explorer(app, resources[TH_PATH].textures['explorer.png'], 68, dungeon.height / 2);
  explorer.add();

  let blobList = [];
  for (let i = 0; i < 10; i++) {
    let blob = new Blob(app, resources[TH_PATH].textures['blob.png']);
    blobList.push(blob);
    blob.add();
  }
}

class Explorer {
  constructor (app, texture, x, y) {
    this.app = app;
    this.sprite = new Sprite(texture);
    this.sprite.x = x;
    this.sprite.y = y;
    this.isMove = { 'up': false, 'down': false, 'left': false, 'right': false };
    this.speed = 2;
    this.setControl();
  }
  add () {
    this.app.stage.addChild(this.sprite);
    this.app.ticker.add(delta => this.tick(delta));
  }
  tick () {
    if (this.isMove.up && this.isMove.right) {
      let speed = Math.sqrt(this.speed ^ 2 / 2);
      this.sprite.y -= speed;
      this.sprite.x += speed;
      return;
    }
    if (this.isMove.up && this.isMove.left) {
      let speed = Math.sqrt(this.speed ^ 2 / 2);
      this.sprite.y -= speed;
      this.sprite.x -= speed;
      return;
    }
    if (this.isMove.down && this.isMove.right) {
      let speed = Math.sqrt(this.speed ^ 2 / 2);
      this.sprite.y += speed;
      this.sprite.x += speed;
      return;
    }
    if (this.isMove.down && this.isMove.left) {
      let speed = Math.sqrt(this.speed ^ 2 / 2);
      this.sprite.y += speed;
      this.sprite.x -= speed;
      return;
    }
    if (this.isMove.up) {
      this.sprite.y -= this.speed;
    }
    if (this.isMove.down) {
      this.sprite.y += this.speed;
    }
    if (this.isMove.left) {
      this.sprite.x -= this.speed;
    }
    if (this.isMove.right) {
      this.sprite.x += this.speed;
    }
  }
  setControl () {
    this.control = new KeyBoard({
      'UP': {
        'down': () => {
          this.isMove.up = true;
        },
        'up': () => {
          this.isMove.up = false;
        }
      },
      'DOWN': {
        'down': () => {
          this.isMove.down = true;
        },
        'up': () => {
          this.isMove.down = false;
        }
      },
      'LEFT': {
        'down': () => {
          this.isMove.left = true;
        },
        'up': () => {
          this.isMove.left = false;
        }
      },
      'RIGHT': {
        'down': () => {
          this.isMove.right = true;
        },
        'up': () => {
          this.isMove.right = false;
        }
      }
    });
  }
}

class Blob {
  constructor (app, texture) {
    this.app = app;
    this.sprite = new Sprite(texture);
    this.sprite.x = utils.randomNum(1, 14) * UNIT;
    this.sprite.y = utils.randomNum(1, 14) * UNIT;
    this.moveCount = 0;
    this.move = { 'x': 0, 'y': 0 };
    this.sleepCount = 0;
  }
  add () {
    this.app.stage.addChild(this.sprite);
    this.app.ticker.add(delta => this.tick(delta));
  }
  tick () {
    if (this.sleepCount > 25) {
      this.sleepCount = 0;
    }
    if (this.sleepCount > 0) {
      this.sleepCount++;
      return;
    }
    if (this.moveCount > 20) {
      this.move.x = utils.randomNum(-2, 2);
      this.move.y = utils.randomNum(-2, 2);
      this.moveCount = 0;
      this.sleepCount = 1;
    } else {
      this.moveCount++;
    }
    this.sprite.x += this.move.x;
    if (this.sprite.x < UNIT) {
      this.sprite.x = UNIT;
    }
    if (this.sprite.x > UNIT * 14) {
      this.sprite.x = UNIT * 14;
    }
    this.sprite.y += this.move.y;
    if (this.sprite.y < UNIT) {
      this.sprite.y = UNIT;
    }
    if (this.sprite.y > UNIT * 14) {
      this.sprite.y = UNIT * 14;
    }
  }
}
