class Control
{
    constructor()
    {
        this.transformX = 600;
        this.transformY = 500;
        this.scaleFactor = 0.1;

        this.speed = 5;

        this.keys = 
        [
            87, //w
            83, //s
            68, //a
            65, //d
            32, //space
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
        
        console.log("camera:", this.transformX, this.transformY, this.scaleFactor);
        
        mouseXWorld = (mouseX - this.transformX) * (1 / this.scaleFactor);
        mouseYWorld = (mouseY - this.transformY) * (1 / this.scaleFactor);
        
        translate(this.transformX, this.transformY);
        scale(this.scaleFactor);
    }

    panTo(x ,y)
    {
        this.transformX = x;
        this.transformY = y;
        this.applyScale(1);
        console.log("planet:", x, y);
    }

    keyPressed(keyCode)
    {
        for(let i = 0; i < this.keys.length; i++)
        {
            if(keyCode == this.keys[i])
                this.trArray[i] = true;
        }
        if(keyCode == 32)
            simulate = !simulate;
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

    mouseDragged() 
    {
        if(mouseButton != "center")
            return;
        this.transformX += mouseX - pmouseX;
        this.transformY += mouseY - pmouseY;
    }

    mouseClicked()
    {

        //check if we clicked on a planet
        var bwa;
        for(let i = 0; i < systems.length; i++)
        {
            bwa = systems[i].checkCollision();
            if(bwa != undefined)
                break;
        }
        //if(bwa == undefined)
        //    return;

        ui.setSelect(bwa);

    }
}