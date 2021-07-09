import {
    Hill
}from './hill.js';

import{
    BirdController
}from './birdController.js'

class App{
    constructor(){
        //canvas 생성 및 body에 추가
        this.canvas = document.createElement('canvas');        
        this.ctx = this.canvas.getContext("2d"); // 그래픽 설정        
        document.body.appendChild(this.canvas);

        //hill 객체 생성
        this.hills = [
            new Hill('#5882FA', 0.2, 12),
            new Hill('#819FF7', 0.5, 8),
            new Hill('#A9D0F5', 1.4, 6)
        ];

        //bird 생성자
        this.birdController = new BirdController();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    //screen shot을 가져오기 위해 resize 이벤트를 걸음
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        //Retina display에서 선명하게 보여주기위해 canvas 사이즈를 2배로 만들어줌
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        for(let i = 0; i < this.hills.length; i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.birdController.resize(this.stageWidth, this.stageHeight);
    }

    //canvas 초기화 event
    animate(t){
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        let dots;
        for( let i = 0; i < this.hills.length; i++){
            //마지막 언덕에 그려줄거라서 hill 에서 받은 좌표를 넘겨줌
            dots = this.hills[i].draw(this.ctx);
        }

        this.birdController.draw(this.ctx, t, dots);
    }

}

window.onload = () => {
    new App();
}