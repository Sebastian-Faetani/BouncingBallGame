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
    this.ballSpeed = 200;
    this.background = "beige";

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

    this.bg = this.add.image(400, 300, this.background);

    this.deathZone = this.physics.add.image(400, 587, "deathZone").refreshBody().setDepth(1).setImmovable(true).setCollideWorldBounds(true);
    // this.deathZone.create(400, 587, "deathZone").refreshBody().setDepth(1).setImmovable(true).setCollideWorldBounds(true);

    this.pala = this.physics.add.sprite(400, 520, "pala").setImmovable(true).setCollideWorldBounds(true);
    
    
    this.ball = this.physics.add.image(300, 400, "pelota").setBounce(1, 1).setCircle(25).setCollideWorldBounds(true);

    this.obstacleGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.obstacleGroup, this.ball);
    this.physics.add.collider(this.pala, this.deathZone);
    this.physics.add.collider(
      this.ball, 
      this.deathZone,
      this.lose,
      null,
      this
      );
    this.physics.add.collider(
      this.pala, 
      this.ball,
      this.bounceReader,
      null,
      this
      );

    this.ball.setVelocity(this.ballSpeed, -this.ballSpeed);

    this.levelText = this.add.text(20, 20, "NIVEL: 1", {
      fontSize: "128px",
      fontStyle: "impact",
      fill: "#FFFFFF"

    }).setDepth(1);

    this.bounceText = this.add.text(20, 50, "REBOTES: 0", {
      fontSize: "32px",
      fontStyle: "impact",
      fill: "#FFFFFF"
    }).setDepth(1);
  
  
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

  bounceReader (ball, pala) {
    this.bounces++;
    this.bounceText.setText("REBOTES: " + this.bounces);
    if (this.bounces >= 10) {
      this.newLevel();
    };
  }

  newLevel() {
    this.bounces = 0;
    this.level++;
    this.levelText.setText("NIVEL: " + this.level);
    this.ballSpeed = this.ballSpeed * 1.1;
    this.ball.setVelocity(this.ballSpeed, -this.ballSpeed);
    
    const randomBgPick = Phaser.Math.RND.between(0, 17);
    const randomBgCloset = ["black", "brown", "darkBlue", "darkGreen", "darkGrey", "darkPurple","fuxia", "lightBlue", "lightPink", "lightPurple", "oceanBlue", "perry", "pink", "purp", "red", "salmon", "weirdPurp", "notPhrog"];
    const bgPicked = randomBgCloset[randomBgPick];

    this.bg.setTexture(bgPicked);

    console.log(bgPicked);

    this.newObstacle();

    if (this.level > 20) {
      this.physics.pause();
      this.win = this.add.image(400, 300, "victory").setInteractive().on("pointerdown", () => this.scene.restart())
    };
  }

  newObstacle() {
    const randomX = Phaser.Math.RND.between(100, 800);
    const randomY = Phaser.Math.RND.between(100, 300);
    const randomObstacleSelector = Phaser.Math.RND.between(0, 2);
    const randomObstacleTypes = ["small", "medium", "big"];
    const randomObstacle = randomObstacleTypes[randomObstacleSelector];

    const obstacle = this.obstacleGroup.create(randomX, randomY, randomObstacle).refreshBody(

    );

  }

  lose() {
    this.physics.pause();
    this.gameOver = true;
    if (this.gameOver = true) {
      this.lose = this.add.image(400, 300, "defeat").setInteractive().on("pointerdown", () => this.scene.restart());
    }
  }
}

