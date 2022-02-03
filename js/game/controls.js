class Control
{
    constructor()
    {
        this.transformX = 0;
        this.transformY = 0;
        this.scaleFactor = 1;

        this.speed = 5;

        this.keys = 
        [
            87, //w
            83, //s
            68, //a
            65, //d
        ];

        this.trArray = [];
    }
    update()
    {
        if(this.trArray[0])
            this.transformY += this.speed;
        if(this.trArray[1])
            this.transformY -= this.speed;
        if(this.trArray[2])
            this.transformX -= this.speed;
        if(this.trArray[3])
            this.transformX += this.speed;
        
        translate(this.transformX, this.transformY);
        scale(this.scaleFactor);
    }

    keyPressed(keyCode)
    {
        for(let i = 0; i < this.keys.length; i++)
        {
            if(keyCode == this.keys[i])
                this.trArray[i] = true;
        }
    }

    keyReleased(keyCode)
    {
        for(let i = 0; i < this.keys.length; i++)
        {
            if(keyCode == this.keys[i])
                this.trArray[i] = false;
        }
    }

    mouseWheel(e)
    {
        if(e.delta < 0)
            this.applyScale(1.1);
        else
            this.applyScale(0.9);
    }

    applyScale(s) 
    {
        this.scaleFactor = this.scaleFactor * s;
        this.transformX = mouseX * (1-s) + this.transformX * s;
        this.transformY = mouseY * (1-s) + this.transformY * s;
    }

    mouseDragged() {
        this.transformX += mouseX-pmouseX;
        this.transformY += mouseY-pmouseY;
      }
}