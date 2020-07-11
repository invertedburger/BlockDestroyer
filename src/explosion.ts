export class Explosion extends Phaser.Physics.Arcade.Sprite {
    born:integer=0;
    brick:Phaser.Physics.Arcade.Sprite;
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion');
     //   scene.add.existing(this);
       // scene.physics.add.existing(this);
        
        
 
    }

    restartBorn(){
        this.born=0;
    }

    destroyBrick(brick){
        this.brick = brick;
    }

      update(time, delta) {
        this.born += delta;
        if (this.born > 1800) {
            //game.scene.physics.add.sprite(0, 0, 'explosion');
           
            this.anims.play('explode', true);
            this.setActive(true);
            this.setVisible(true);
        }
    
        if (this.born > 3800) {
            if (this.brick){
                this.brick.destroy();
                }
            this.setActive(false);
            this.setVisible(false);
            this.anims.stop();
            this.destroy();
           
        }
    }
    

}