import 'phaser';

export class Enemy extends Phaser.GameObjects.Sprite {
    born: integer = 0;
    constructor(scene:Phaser.Scene, x:number, y:number) {
        super(scene, x, y, 'enemy');
    }

    update(time, delta) {
        this.born += delta;
        if (this.born > 1800) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }


    }
}