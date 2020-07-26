import 'phaser';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    born: integer = 0;
    directionSelect: number = 0;
    constructor(scene:Phaser.Scene, x:number, y:number) {
        super(scene, x, y, 'enemy');
    }

    update(time, delta) {
 

        if ((this.body.velocity.x==0) && (this.body.velocity.y==0)) {
            this.directionSelect = Math.floor(Math.random() * 4);
            if (this.directionSelect == 0){
                this.setVelocityX(-100);
            } else if (this.directionSelect == 1 ){
                this.setVelocityX(100);
            }  else if (this.directionSelect == 2 ){
                this.setVelocityY(-100);
            } else if (this.directionSelect == 3 ){
                this.setVelocityY(100);
                }
        }

        this.born += delta;
        if ((this.born > 1800) && (this.body.velocity.x==0) && (this.body.velocity.y==0)) {
            this.born = 0;
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.directionSelect = Math.floor(Math.random() * 4);
            if (this.directionSelect == 0){
                this.setVelocityX(-100);
            } else if (this.directionSelect == 1 ){
                this.setVelocityX(100);
            }  else if (this.directionSelect == 2 ){
                this.setVelocityY(-100);
            } else if (this.directionSelect == 3 ){
                this.setVelocityY(100);
                }
    }
}
}