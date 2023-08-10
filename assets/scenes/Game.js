export default class Game extends Phaser.Scene {
  level;
  bounces;
  gameOver;
  constructor() {
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.level = 1;
    this.bounces = 0;


  }

  preload() {
    this.load.image("pala", "./assets/image/pala.png");
    this.load.image("pelota", "./assets/image/pelota.png");
    this.load.image("deathZone", "./assets/image/deathZone.png");

    this.load.image("small", "./assets/image/obstacleSchmall.png");
    this.load.image("medium", "./assets/image/obstacleMedium.png");
    this.load.image("big", "./assets/image/obstacleBig.png");
    this.load.image("lShape", "./assets/image/obstacleLShape.png");
    this.load.image("tShape", "./assets/image/obstacleTShape.png");

    this.load.image("victory", "./assets/image/victoryScreen.png");
    this.load.image("defeat", "./assets/image/phrogFail.jpg");

    this.load.image("beige", "./assets/image/beigeBG.png");
    this.load.image("black", "./assets/image/blackBG.png");
    this.load.image("brown", "./assets/image/brownBG.png");
    this.load.image("darkBlue", "./assets/image/darkBlueBG.png");
    this.load.image("darkGreen", "./assets/image/darkGreenBG.png");
    this.load.image("darkGrey", "./assets/image/darkGreyBG.png");
    this.load.image("darkPurple", "./assets/image/darkPurpleBG.png");
    this.load.image("fuxia", "./assets/image/fuxiaBG.png");
    this.load.image("lightBlue", "./assets/image/lightBlueBG.png");
    this.load.image("lightPink", "./assets/image/lightPinkBG.png");
    this.load.image("lightPurple", "./assets/image/lightPurpleBG.png");
    this.load.image("oceanBlue", "./assets/image/oceanBlueBG.png");
    this.load.image("perry", "./assets/image/perryColorBG.png");
    this.load.image("pink", "./assets/image/pinkBG.png");
    this.load.image("purp", "./assets/image/purpBG.png");
    this.load.image("red", "./assets/image/redBG.png");
    this.load.image("salmon", "./assets/image/salmonBG.png");
    this.load.image("weirdPurp", "./assets/image/weirdPurpBG.png");
    this.load.image("notPhrog", "./assets/image/definetlyNotAPhrog.png");

    }

  create() {
    this.deathZone = this.physics.add.group();
    this.deathZone.create(400, 590, "deathZone").refreshBody().setDepth(1);
    // this.deathZone.setCollideWorldBounds(true);

    this.pala = this.physics.add.sprite(400, 450, "pala");
    this.pala.setCollideWorldBounds(true);
    
    this.pelota = this.physics.add.group({
      immovable: true
    });

    const ball = this.pelota.create(300, 400, "pelota").setBounce(1, 1).setCircle(25);
    ball.setCollideWorldBounds(true);

    this.shapesGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });


    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.shapesGroup, this.pelota);
    this.physics.add.collider(this.pala, this.deathZone);
    this.physics.add.collider(this.pelota, this.deathZone);
    this.physics.add.collider(this.pala, this.pelota);

    let velocidadIni = ball.setVelocity(200, -200);
  
  
  }

  update() {
    //Move player
    if (this.cursors.left.isDown) {
      this.pala.setVelocityX(-400);
    } else 
      if (this.cursors.right.isDown) {
        this.pala.setVelocityX(400);
      } else {
        this.pala.setVelocityX(0);
      }

    if (this.cursors.up.isDown) {
      this.pala.setVelocityY(-400);
      } else {
      if (this.cursors.down.isDown) {
        this.pala.setVelocityY(400);
      } else {
        this.pala.setVelocityY(0);
      }
    }
    
  }

  bounceEffects() {

  }

  lose () {

  }

}

