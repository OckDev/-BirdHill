import{
    Bird
}from './bird.js';

export class BirdController{
    constructor(){
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = './bird.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addBird();
    }

    addBird() {
        this.items.push(
            new Bird(this.img, this.stageWidth),
        );
    }

    draw(ctx, t,dots) {
        if(this.isLoaded) {
            this.cur =+ 1;
            if(this.cur > 200) {
                this.cur = 0;
                this.addBird();
            }

            for(let i = this.items.length - 1; i>= 0; i--) {
                const item = this.items[i];
                if (item.x < -item.width) {
                    this.items.splice(i, 1);
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }

}