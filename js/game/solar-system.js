class SolarSystem
{
    constructor()
    {

        //generate random position
        this.x = random(-window.innerWidth, window.innerWidth)* (3 * scaleconstant);
        this.y = random(-window.innerHeight, window.innerHeight) * (3 * scaleconstant);

        //random color
        this.B = random(0, 100);
        this.R = random(200, 255);
        this.G = random(120, 200);

        this.radius = random(80, 180);

        //generate some planet bodies
        this.planets = [];
        for(let i = 0; i < random(1, 10); i++)
        {
            this.planets.push(new Body(this.x + (100 * scaleconstant) + 40 * ((i + 1) * scaleconstant), this.y,"Planet " + i, 3))
        }
    }

    draw()
    {
        for(let i = 0; i < this.planets.length; i++)
        {
            if(simulate)
            {
                //planet around star
                this.planets[i].rotate(this.x, this.y, (i + 1) * timeFactor);
            }
            this.planets[i].drawBody();
        }

        push();

        noStroke();
        fill(this.R, this.G, this.B);
        ellipse(this.x , this.y, this.radius);

        pop();
        return;
    }

    checkCollision()
    {
        //this is a mess. returns [] if no collision, ["planet", 0-9], or ["moon", 0-9, 0-9]
        var target;// = [];
        for(let v = 0; v < this.planets.length; v++)
        {
            if (dist(mouseXWorld, mouseYWorld, this.planets[v].x, this.planets[v].y) <= this.planets[v].radius / 2)
            {

                target = this.planets[v];
            }

            for(let p = 0; p < this.planets[v].satellites.length; p++)
            {
                if (dist(mouseXWorld, mouseYWorld, this.planets[v].satellites[p].x, this.planets[v].satellites[p].y) <= this.planets[v].satellites[p].radius / 2)
                {
                    target = this.planets[v].satellites[p];
                }
            }
            
        }
        return target;
    }
}

class Body
{
    constructor(x, y, name, sat, maxmass)
    {
        this.x = x;
        this.y = y;

        this.highlight = false;

        this.name = name;

        //generate mass, which is then used for radius
        if(maxmass == null)
            this.mass = random(0.1, 20);
        else
            this.mass = random(maxmass / 10, maxmass);

        //radius (used for rendering & hitboxes)
        this.radius = Math.sqrt(this.mass) * (3 * scaleconstant);

        if(sat == null)
            sat = 0;
        if(sat < 1)
            sat = 0;

        //any satellites?
        this.satellites = [];
        for(let i = 0; i < sat; i++)
        {
            //push new satellites
            this.satellites.push(new Body(this.x + (this.radius * 1) + i * this.radius / 2, this.y, this.name + ", Moon " + i, random(0, 1), 0.5));
        }

        this.color =
        {
            R: random(0, 255) + 10,
            G: random(0, 255) + 10,
            B: random(0, 255) + 10
        }
    }

    rotate(cx, cy, index) 
    {
        //index is degrees
        var radians = (Math.PI / 180) * (2 / index),
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - cx)) + (sin * (this.y - cy)) + cx,
        ny = (cos * (this.y - cy)) - (sin * (this.x - cx)) + cy;


        //console.log(this.x, this.nx, index);
        this.x = nx;
        this.y = ny;


        for(let i = 0; i < this.satellites.length; i++)
        {
            this.satellites[i].rotate(cx, cy, index);
            this.satellites[i].rotate(this.x, this.y, (i + 1) * timeFactor / 10);

        }
        
    }

    rotateDeg(cx, cy, deg) 
    {
        var radians = (Math.PI / 180) * deg,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - cx)) + (sin * (this.y - cy)) + cx,
        ny = (cos * (this.y - cy)) - (sin * (this.x - cx)) + cy;
        
        this.x = nx;
        this.y = ny;

        for(let i = 0; i < this.moons.length; i++)
        {
        //    this.moons[i].x = (5 * scaleconstant) + 100 * ((i + 1) * scaleconstant);
        //    this.moons[i].y = this.y;
        }
    }

    drawBody()
    {
        push();

        noStroke();

        if(this.highlight)
        {
            fill(255);
            ellipse(this.x, this.y, this.radius * 1.1);
        }

        fill(this.color.R, this.color.G, this.color.B);
        ellipse(this.x, this.y, this.radius);

        for(let i = 0; i < this.satellites.length; i++)
        {
            this.satellites[i].drawBody();
        }

        pop();
    }
}