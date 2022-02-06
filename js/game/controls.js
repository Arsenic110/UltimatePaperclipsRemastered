class Control
{
    constructor()
    {
        this.transform = createVector(10, 10);


        this.scaleFactor = 1;

        this.scale = (1 / this.scaleFactor);

        this.test = false;

        this.speed = 5;

        this.keys = 
        [
            87, //w
            83, //s
            68, //a
            65, //d
            32, //space
            67, //C
        ];

        this.trArray = [];
    }

    update()
    {
        this.scale = (1 / this.scaleFactor);
        mouse = createVector(mouseX, mouseY);
        mouseWorld = this.transformToWorld(createVector(mouseX - window.width / 2, mouseY - window.height / 2));

        //move if key down
        if(this.trArray[0])
        {
            this.transform.y -= this.speed;
            ui.setSelect(undefined);
        }
        if(this.trArray[1])
        {
            this.transform.y += this.speed;
            ui.setSelect(undefined);
        }
        if(this.trArray[2])
        {
            this.transform.x += this.speed;
            ui.setSelect(undefined);
        }
        if(this.trArray[3])
        {
            this.transform.x -= this.speed;
            ui.setSelect(undefined);
        }

        //transform screenspace coords into worldspace
        //mouseWorld.x = this.transformToWorld(createVector(mouseX - window.width / 2, mouseY - window.height / 2)).x;
        //mouseWorld.y = this.transformToWorld(createVector(mouseX - window.width / 2, mouseY - window.height / 2)).y;
        

    }

    draw()
    {
        this.performTransform();
    }

    performTransform()
    {

        //make scale around center - needs to be constant
        translate(window.width / 2, window.height / 2);
        scale(this.scaleFactor);

        translate(-this.transform.x, -this.transform.y);
    }

    panTo(c)
    {
        this.transform = c;
    }

    transformToWorld(c)
    {
        let nx = this.transform.x + c.x * this.scale,
            ny = this.transform.y + c.y * this.scale;
        return createVector(nx, ny);
    }

    transformToScreen(c)
    {
        let nx = (c.x - this.transform.x) / this.scale,
            ny = (c.y - this.transform.y) / this.scale;
        return createVector(nx, ny);
    }

    keyPressed(keyCode)
    {
        for(let i = 0; i < this.keys.length; i++)
        {
            if(keyCode == this.keys[i])
                this.trArray[i] = true;
        }

        //pause if spacebar hit
        if(keyCode == 32)
            simulate = !simulate;
        
        //print coords if C hit
        if(keyCode == 67)
        {
            //this.transform = this.transformToWorld(createVector(mouseX - window.width / 2, mouseY - window.height / 2));
            background(0);
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


        //mouseX and Y used for zooming into the mouse location
        //this.transform.x = mouseX * (1-s) + this.transform.x * s;
        //this.transform.y = mouseY * (1-s) + this.transform.y * s;

        //this SORTA worked
        //this.transform.x += mouseX / s;
        //this.transform.y += mouseY / s;

        //this.transform.x -= mouseWorld.x;
        //this.transform.y -= mouseWorld.y;
    }

    mouseDragged() 
    {
        if(mouseButton != "center")
            return;
        ui.setSelect(undefined);
        //drag transformation
        this.transform.x -= (mouseX - pmouseX) * this.scale;
        this.transform.y -= (mouseY - pmouseY) * this.scale;
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