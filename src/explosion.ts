export class Explosion extends Phaser.Physics.Arcade.Sprite {
    born:integer=0;
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setVelocity(0, 0);
 
    }

    restartBorn(){
        this.born=0;
    }

      update(time, delta) {
        this.born += delta;
        if (this.born > 1800) {
            //game.scene.physics.add.sprite(0, 0, 'explosion');
           
            this.anims.play('explode', true);
        }
    
        if (this.born > 3800) {
            this.setActive(false);
            this.setVisible(false);
            this.anims.stop();
        }
    }
    

}