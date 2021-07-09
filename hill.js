export class Hill{
    // 다양한 언덕을 연출하기위함
    constructor(color, speed, total){
        this.color = color;
        this.speed = speed;
        this.total = total;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.points = [];
        this.gap = Math.ceil(this.stageWidth / (this.total - 2)); //좀더 넓은 간격을 정의해서 사이즈를 확장 연속적인 draw같은 효과를 위해
        
        for(let i = 0; i < this.total; i++){
            this.points[i] = {
                x: i * this.gap,
                y: this.getY() //가이드대로 t를 두었더니 언덕이 발생되지 않음. 애초에 좌표값이 적용안되는게 당연한데 영상에서 무슨의도로 그렇게했는지? 아직 이해를 못했음
            };
        }
    }

    //언덕그리기
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;
        
        let dots = [];
        cur.x += this.speed; // 얘는뭐지?
        

        //언덕의 x 시작점이 끝나기전에 새로운 언덕을 만들어 자연스럽게 연결해준다
        if(cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap *2),
                y: this.getY()
            });
        }else if (cur.x > this.stageWidth + this.gap){
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);
        
        let prevCx = cur.x;
        let prevCy = cur.y;
        

        for (let i = 1; i < this.points.length; i++){
            cur = this.points[i];
            cur.x += this.speed; //곡선을 그리면서 움직임을줌
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy); //곡선을 그리는 함수

            //발생되는 좌표를 양의 좌표와 일치시켜 사용해야하기 때문에 배열로 저장후 리턴
            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();

        return dots;
    }

    //언덕의 y(높이) 랜덤 부여 
    getY() {
        //stage 높이를 9로 나눈값을 랜덤배치 
        const min = this.stageHeight / 9; 
        const max = this.stageHeight - min;
        return min + Math.random() * max;
    }
}