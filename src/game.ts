import 'phaser';
import { Bomb } from './bomb';
import { Explosion } from './explosion';

export default class Demo extends Phaser.Scene {

    constructor() {
        super('demo');

    }

    player: Phaser.Physics.Arcade.Sprite;

    preload() {
        // Load in images and sprites
        this.load.spritesheet('player', 'player_walk_strip6.png',
            { frameWidth: 35, frameHeight: 57 });
        this.load.spritesheet('explosion', 'explosion.png',
            { frameWidth: 48, frameHeight: 48 }
        );

        this.load.image('brick', 'brickred.png');
        this.load.image('brickgrey', 'brickgrey.png');
        this.load.image('bomb', 'bomb.png');


    }

    update(time, delta) {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);

        if (this.input.keyboard.addKey('A').isDown) {
            this.player.setVelocityX(-160);


        }
        else if (this.input.keyboard.addKey('D').isDown) {
            this.player.setVelocityX(160);

        }
        else if (this.input.keyboard.addKey('W').isDown) {
            this.player.setVelocityY(-160);

        }
        else if (this.input.keyboard.addKey('S').isDown) {
            this.player.setVelocityY(160);

        } else {
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
        var playerExplosions = this.physics.add.group({ classType: Explosion, runChildUpdate: true });
        this.physics.world.setBounds(0, 0, 600, 600);


        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 80 }),
            frameRate: 160,
            repeat: 1
        });

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if ((x == 0) && (y == 0)) continue;
                if ((x == 1) && (y == 0)) continue;
                if ((x == 1) && (y == 1)) continue;
                if ((x == 0) && (y == 1)) continue;
                var walltype = Math.floor(Math.random() * 3);
                if (walltype == 1) {
                    var brick = bricks.create(x * 60 + 30, y * 60 + 30);
                    this.physics.add.existing(brick);
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
        player.body.setSize(30, 45);
        player.body.updateCenter();
        player.body.setOffset(0, 10);
        this.physics.add.collider(bricksGrey, player);
        this.physics.add.collider(bricks, player);

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


        //this.explosion1 = new Explosion(this, 10, 10).setActive(false).setVisible(false);
        // this.explosion2 = new Explosion(this, 10, 10).setActive(true).setVisible(false);
        // this.explosion3 = new Explosion(this, 10, 10).setActive(true).setVisible(false);
        // this.explosion4 = new Explosion(this, 10, 10).setActive(true).setVisible(false);
        // this.explosion5 = new Explosion(this, 10, 10).setActive(true).setVisible(false);


        // var explosion = this.physics.add.sprite(30, 30, 'explosion');
        var scene = this;
        this.input.keyboard.on('keydown_SPACE', function (event) {
            var bomb = playerBullets.create(RoundTo(player.x - 30, 60) + 30, RoundTo(player.y - 30, 60) + 30).setActive(true).setVisible(true);


            var explosion1 = new Explosion(scene, bomb.x, bomb.y);
            var explosion2 = new Explosion(scene, bomb.x - 60, bomb.y);
            var explosion3 = new Explosion(scene, bomb.x + 60, bomb.y);
            var explosion4 = new Explosion(scene, bomb.x, bomb.y + 60);
            var explosion5 = new Explosion(scene, bomb.x, bomb.y - 60);

            explosion1.setVisible(false);
            explosion2.setVisible(false);
            explosion3.setVisible(false);
            explosion4.setVisible(false);
            explosion5.setVisible(false);

            playerExplosions.add(explosion1, true);
            playerExplosions.add(explosion2, true);
            playerExplosions.add(explosion3, true);
            playerExplosions.add(explosion4, true);
            playerExplosions.add(explosion5, true);

            
            scene.physics.add.overlap(explosion2, bricksGrey, greyWallCallback);
            scene.physics.add.overlap(explosion3, bricksGrey, greyWallCallback);
            scene.physics.add.overlap(explosion4, bricksGrey, greyWallCallback);
            scene.physics.add.overlap(explosion5, bricksGrey, greyWallCallback);


            scene.physics.add.overlap(explosion1, bricks, enemyHitCallback);
            scene.physics.add.overlap(explosion2, bricks, enemyHitCallback);
            scene.physics.add.overlap(explosion3, bricks, enemyHitCallback);
            scene.physics.add.overlap(explosion4, bricks, enemyHitCallback);
            scene.physics.add.overlap(explosion5, bricks, enemyHitCallback);

        });

        function greyWallCallback(explosion:Explosion, brick:Phaser.Physics.Arcade.Sprite) {
            explosion.destroy();
        }

        function enemyHitCallback(explosion:Explosion, brick:Phaser.Physics.Arcade.Sprite) {
            explosion.destroyBrick(brick);
        }

        function isOdd(num:number) { return (num % 2) == 1; }
        function RoundTo(number:number, roundto:number) {
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