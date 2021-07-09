export class Bird {
    constructor(img, stageWidth) {
        this.img = img;

        this.totalFrame = 3;
        this.curFrame = 0;
        
        this.imgWidth = 371;
        this.imgHeight = 399;

        //레티나 디스플레이를 고려해서 2배로 줄여줌
        this.birdWidth = 187.5;
        this.birdHeight = 199.5;

        this.birdWidthHalf = this.birdWidth /2;
        this.x = stageWidth + this.birdWidth;
        this.y = 0;
        this.speea = Math.random() * 2 + 1;

        this.fps = 2;
        this.fpsTime = 400 / this.fps;
    }

    draw(ctx, t, dots){
        if (!this.time) {
            this.time = t;
        }
        
        const now = t - this.time;
        if (now > this.fpsTime){
            this.time = t;
            this.curFrame += 1;
            if(this.curFrame == this.totalFrame) {
                this.curFrame = 0;
            }
        }
        this.animate(ctx, dots);
    }

    animate(ctx, dots){
        this.x -= this.speed;
        this.y = 550;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#000000';
        ctx.drawImage(
            this.img,
            this.imgWidth * this.curFrame,
            0,
            this.imgWidth,
            this.imgHeight,
            -this.birdWidthHalf,
            -this.birdHeight + 15,
            this.birdWidth,
            this.birdHeight
        );

        //저장했던 캠버스를 복귀시킨다.
        ctx.restore();
    }
}