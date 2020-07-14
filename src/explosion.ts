export class Explosion extends Phaser.Physics.Arcade.Sprite {
    born: integer = 0;
    brick: Phaser.Physics.Arcade.Sprite;
    constructor(scene:Phaser.Scene, x:number, y:number) {
        super(scene, x, y, 'explosion');
        //   scene.add.existing(this);
        // scene.physics.add.existing(this);
    }

    restartBorn() {
        this.born = 0;
    }

    destroyBrick(brick: Phaser.Physics.Arcade.Sprite) {
        this.brick = brick;
    }

    update(time, delta) {
        this.born += delta;
        if (this.born > 1800) {

            if (this.brick) {
                this.brick.destroy();
            }
            this.anims.play('explode', true);
            this.setActive(true);
            this.setVisible(true);
        }

        if (this.born > 2300) {

            this.setActive(false);
            this.setVisible(false);
            this.anims.stop();
            this.destroy();

        }
    }


}