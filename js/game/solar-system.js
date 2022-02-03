class SolarSystem
{
    constructor()
    {
        this.x = random(-window.innerWidth, window.innerWidth)* 3;
        this.y = random(-window.innerHeight, window.innerHeight) * 3;

        this.B = random(0, 100);
        this.R = random(200, 255);
        this.G = random(120, 200);

        this.radius = random(80, 180);

        this.planets = [];
        for(let i = 0; i < random(1, 10); i++)
        {
            this.planets.push(new Planet(this.x + 100 + 40 * (i + 1), this.y));
            this.planets[i].rotateDeg(this.x, this.y, random(0, 360));
        }

    }
    draw()
    {
        noStroke();
        fill(this.R, this.G, this.B);
        ellipse(this.x , this.y, this.radius);

        if (this.planets.length == 0)
            return;
        for(let i = 0; i < this.planets.length; i++)
        {
            if(simulate)
            {
                this.planets[i].rotate(this.x, this.y, i * timeFactor);
                for(let j = 0; j < this.planets[i].moons.length; j++)
                {
                    this.planets[i].moons[j].rotate(this.planets[i].x, this.planets[i].y, j * timeFactor / 10);
                    this.planets[i].moons[j].rotate(this.x, this.y, i * timeFactor);
                }

            }

            //draw planets -- REFACTOR LATER
            fill(this.planets[i].R, this.planets[i].G, this.planets[i].B);
            ellipse(this.planets[i].x, this.planets[i].y, this.planets[i].radius)

            for(let j = 0; j < this.planets[i].moons.length; j++)
            {
                //draw moons
                fill(this.planets[i].moons[j].R);
                ellipse(this.planets[i].moons[j].x, this.planets[i].moons[j].y, this.planets[i].moons[j].radius);
            }
        }
        fill(255);
    }
}

class Planet
{
    constructor(x ,y)
    {
        this.x = x;
        this.y = y;

        this.mass = random(0.1, 20);

        this.radius = Math.sqrt(this.mass) * 3;

        this.moons = [];
        for(let i = 0; i < random(0, 5); i++)
        {
            this.moons.push(new Moon(this.x + 5 * (i + 1), this.y));
            //this.moons[i].rotateDeg(this.x, this.y, random(0, 360));
        }

        this.R = random(0, 255) + 10;
        this.G = random(0, 255) + 10;
        this.B = random(0, 255) + 10;

    }

    rotate(cx, cy, index) 
    {
        var radians = (Math.PI / 180) * (2 / index),
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - cx)) + (sin * (this.y - cy)) + cx,
        ny = (cos * (this.y - cy)) - (sin * (this.x - cx)) + cy;
        
        this.x = nx;
        this.y = ny;
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
            this.moons[i].x = this.x + 5 * (i + 1);
            this.moons[i].y = this.y;
        }
    }
}

class Moon
{
    constructor(x ,y)
    {
        this.x = x;
        this.y = y;

        this.mass = random(0.02, 0.5);

        this.radius = Math.sqrt(this.mass) * 3;

        this.R = random(0, 255) + 10;
        this.G = this.R
        this.B = this.R

    }

    rotate(cx, cy, index) 
    {
        var radians = (Math.PI / 180) * (2 / index),
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - cx)) + (sin * (this.y - cy)) + cx,
        ny = (cos * (this.y - cy)) - (sin * (this.x - cx)) + cy;
        
        this.x = nx;
        this.y = ny;
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
    }
}