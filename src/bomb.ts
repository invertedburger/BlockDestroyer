import 'phaser';

export class Bomb extends Phaser.GameObjects.Sprite {
    born: integer = 0;
    constructor(scene, x, y) {
        super(scene, x, y, 'bomb');

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