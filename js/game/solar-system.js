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
            this.planets.push(new Planet(this.x + 100 + 20 * (i + 1), this.y, random(8, 18)));
            this.planets[i].rotateDeg(this.x, this.y, random(0, 360));
        }

    }
    draw()
    {
        fill(this.R, this.G, this.B);
        ellipse(this.x , this.y, this.radius);

        if (this.planets.length == 0)
            return;
        for(let i = 0; i < this.planets.length; i++)
        {
            fill(this.planets[i].R, this.planets[i].G, this.planets[i].B);
            this.planets[i].rotate(this.x, this.y, i);
            ellipse(this.planets[i].x, this.planets[i].y, this.planets[i].radius)
        }
        fill(255);
    }
}

class Planet
{
    constructor(x ,y, radius)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.R = random(0, 255) + 10;
        this.G = random(0, 255) + 10;
        this.B = random(0, 255) + 10;
        this.speed = random(1, 2);
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