import 'phaser';

class Bomb extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bomb');

    }

}

export default class Demo extends Phaser.Scene {

    constructor() {
        super('demo');

    }

    player:  Phaser.Physics.Arcade.Sprite;

    init(): void {
        
      }

      

    preload() {
      
      // Load in images and sprites
      this.load.spritesheet('player', 'player_walk_strip6.png',
      { frameWidth: 35, frameHeight: 57 }); 
        this.load.spritesheet('explosion', 'explosion.png',
            { frameWidth: 48, frameHeight: 48 }
        ); // Made by tokkatrain: https://tokkatrain.itch.io/top-down-basic-set

        this.load.image('brick', 'brickred.png');
        this.load.image('brickgrey', 'brickgrey.png');
        this.load.image('bomb', 'bomb.png');

  
    }

    update(time, delta) {
  

        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
    
  if (this.input.keyboard.addKey('A').isDown)
{
        this.player.setVelocityX(-160);


}
else if (this.input.keyboard.addKey('D').isDown)
{
    this.player.setVelocityX(160);

}
else if (this.input.keyboard.addKey('W').isDown)
{
    this.player.setVelocityY(-160);

}
else if (this.input.keyboard.addKey('S').isDown)
{
    this.player.setVelocityY(160);

} else
{
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
   
}

            

            if ((this.player.body.velocity.x == 0) && (this.player.body.velocity.y == 0)) {
                this.player.anims.stop();
            }

     }

    create() {
        var bricks = this.physics.add.staticGroup(
            {
                defaultKey: 'brick',
                maxSize: 100

            });

        var bricksGrey = this.physics.add.staticGroup(
            {
                defaultKey: 'brickgrey',
                maxSize: 100

            });

        var playerBullets = this.physics.add.group({ classType: Bomb, runChildUpdate: true });
        //var  playerExplosions = this.physics.add.group({ classType: Explosion, runChildUpdate: true });


        // Create world bounds
        this.physics.world.setBounds(0, 0, 600, 600);


        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 80 }),
            frameRate: 40,
            repeat: 0
        });

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if ((x == 0) && (y == 0)) continue;
                var walltype = Math.floor(Math.random() * 3);
                if (walltype == 1) {
                    var brick = bricks.create(x * 60 + 30, y * 60 + 30);
                    this.physics.add.collider(brick,player, enemyHitCallback);
                }
                if ((walltype == 2) && (isOdd(x))) {
                    bricksGrey.create(x * 60 + 30, y * 60 + 30);
                }
            }

        }

       var player = this.physics.add.sprite(0, 0, 'player');
      
       this.player = player;
      // player.setMaxVelocity(100,d100);
       //player.setDamping(true);
       //player.setDrag(0.99,0.99);
       
       player.setDisplaySize(40, 40).setCollideWorldBounds(true);
player.body.setSize(30,45);
player.body.updateCenter();
player.body.setOffset(0,10);
        this.physics.add.collider(bricksGrey,player);





                   // Enables movement of player with WASD keys
                   this.input.keyboard.on('keydown_W', function (event) {
                    player.anims.play('walk', true);
                    player.angle = 270;
    
                });
                this.input.keyboard.on('keydown_S', function (event) {
       
                    player.anims.play('walk', true);
                    player.angle = 90;
                });
                this.input.keyboard.on('keydown_A', function (event) {
              
                    player.anims.play('walk', true);
                    player.angle = 180;
                });
                this.input.keyboard.on('keydown_D', function (event) {
         
                    player.anims.play('walk', true);
                    player.angle = 0;
                });

             

        // var explosion = this.physics.add.sprite(30, 30, 'explosion');
        this.input.keyboard.on('keydown_SPACE', function (event) {
            var bomb = playerBullets.create(player.x,player.y).setActive(true).setVisible(true);
            // var explosion1 = playerExplosions.create(bomb.x, bomb.y).setActive(true).setVisible(false);
            // var explosion2 = playerExplosions.create(bomb.x-60, bomb.y).setActive(true).setVisible(false);
            //var explosion3 = playerExplosions.create(bomb.x+60, bomb.y).setActive(true).setVisible(false);
            //var explosion4 = playerExplosions.create(bomb.x, bomb.y-60).setActive(true).setVisible(false);
            // var explosion5 = playerExplosions.create(bomb.x, bomb.y+60).setActive(true).setVisible(false);



            // this.physics.add.overlap(player, player, this.enemyHitCallback);

            //     
            //  this.physics.add.overlap(bricksGrey,explosion1, function(brick, explosion1) {
            brick.destroy();
        });

        //   item.body.velocity.x = -120;

        

        //  });
        function enemyHitCallback(brick, player) {

            brick.destroy();
        }

        function isOdd(num) { return (num % 2) == 1; }
        function RoundTo(number, roundto) {
            return roundto * Math.round(number / roundto);
        }

    }
}


    const config = {
        type: Phaser.AUTO,
        scene: Demo,
        width: 600,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        }
    };

    const game = new Phaser.Game(config);
