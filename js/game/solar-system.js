class SolarSystem
{
    constructor()
    {
        //generate random position
        this.x = 0//random(-window.innerWidth, window.innerWidth)* (3 * scaleconstant);
        this.y = 0//random(-window.innerHeight, window.innerHeight) * (3 * scaleconstant);

        this.pos = createVector(this.x, this.y);

        var stars = 
        [
            new Body(this.pos.x + 150, this.pos.y, this.pos.x, this.pos.y, "star 1", 80, 1),
            new Body(this.pos.x + 150, this.pos.y, this.pos.x, this.pos.y, "star 2", 80, 1)
        ];
        stars[0].rotateDeg(this.pos, 180);

        var p = 
        [
            new Body(this.pos.x + 1800, this.pos.y, this.pos.x, this.pos.y, "star 1", 10, 2),
            new Body(this.pos.x + 1800, this.pos.y, this.pos.x, this.pos.y, "star 2", 20, 2)
        ]
        p[0].rotateDeg(createVector(this.pos.x + 1700, this.pos.y), 180);

        var s = [new Satellite(this.pos.x + 2200, this.pos.y, this.pos.x, this.pos.y, "Bruh", 2, 4 * timeFactor)];

        var bb = [new Body(this.pos.x + 1000, this.pos.y, this.pos.x, this.pos.y, "Bruh", 20, 8.5 * timeFactor)];
        bb[0].addNewSat();

        //step 1: generate members
        this.members = [];
        for(let i = 0; i < random(1, 1); i++)
        {
            this.members.push(
                new Member(
                    //barycenter, array of bodies, array of satellites, orbitalspeed
                    this.pos, this.pos, bb, 
                    [new Satellite(this.pos.x + 500, this.pos.y, this.pos.x, this.pos.y, "Bruh", 2, 6 * timeFactor)], 5
                )
                );
        }
        this.members.push(new Member(this.pos, this.pos, stars, [], 0));
        this.members.push(new Member(this.pos, createVector(this.pos.x + 1700, this.pos.y), p, s, 8));
    }

    makeMember()
    {
        //First, stars
        var stars = [];

        if(random(0,1))
        {
            //if 2 stars
            stars = 
            [
                new Body(this.pos.x + 150, this.pos.y, this.pos.x, this.pos.y, "star 1", 80, 1),
                new Body(this.pos.x + 150, this.pos.y, this.pos.x, this.pos.y, "star 2", 80, 1)
            ];
            b[0].rotateDeg(this.pos, 180);
        }
        else
        {
            //if 1 star
            stars = 
            [
                new Body(this.pos.x, this.pos.y, this.pos.x, this.pos.y, "star 1", 80, 1)
            ];
        }
        //Then, bodies!
        for(let i = 0; i < random(0, 10); i++)
        {
            let r = random(0, 4);
            if(r == 4)
            {
                //binary
                var p = 
                [
                    new Body(this.pos.x + 1800, this.pos.y, this.pos.x, this.pos.y, "star 1", 10, 2),
                    new Body(this.pos.x + 1800, this.pos.y, this.pos.x, this.pos.y, "star 2", 20, 2)
                ]
                p[0].rotateDeg(createVector(this.pos.x + 1700, this.pos.y), 180);
            }
            else
            {
                //single

            }
        }

        //lastly, trailing satellites.

    }

    update()
    {
        this.pos = createVector(this.x, this.y);

        if(!simulate)
            return;

        for(let i = 0; i < this.members.length; i++)
        {
            //planet around star
            this.members[i].update();
        }

    }

    draw()
    {
        for(let i = 0; i < this.members.length; i++)
        {
            this.members[i].draw();
        }
    }
}

class Body
{
    constructor(x, y, cx, cy, name, maxmass, orbitalSpeed)
    {
        this.x = x;
        this.y = y;

        this.cx = cx;
        this.cy = cy;

        this.pos = createVector(x, y);

        this.highlight = false;
        this.name = name;
        this.orbitalSpeed = orbitalSpeed;

        //generate mass, which is then used for radius
        if(maxmass == null)
            this.mass = random(0.1, 20);
        else
            this.mass = random(maxmass / 10, maxmass);

        //radius (used for rendering & hitboxes)
        this.radius = Math.sqrt(this.mass) * (3 * scaleconstant);

        //any satellites?
        this.satellites = [];
        for(let i = 0; i < random(0, 0); i++)
        {
            //push new satellites
            this.satellites.push(new Satellite(this.x + 100, this.y, this.x, this.y, this.name + ", Moon " + i, 0.5, orbitalSpeed / 3));
        }

        this.color =
        {
            R: random(0, 255) * 10,
            G: random(0, 255) * 10,
            B: random(0, 255) * 10
        }
    }

    addNewSat()
    {
        this.satellites = [];
        for(let i = 0; i < 1; i++)
        {
            //push new satellites
            this.satellites.push(new Satellite(this.x + 100, this.y, this.x, this.y, this.name + ", Moon " + i, 3, this.orbitalSpeed / 3));
        }
    }

    update(c, o)
    {

        this.cx = c.x;
        this.cy = c.y;

        if(o == undefined)
            o = this.orbitalSpeed;

        var radians = (Math.PI / 180) * (2 / o),
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - c.x)) + (sin * (this.y - c.y)) + c.x,
        ny = (cos * (this.y - c.y)) - (sin * (this.x - c.x)) + c.y;

        this.x = nx;
        this.y = ny;

        this.pos = createVector(nx, ny);

        for(let i = 0; i < this.satellites.length; i++)
        {
            //around barycenter
            this.satellites[i].update(c, o);

            //around body
            this.satellites[i].update(this.pos);
        }
    }

    rotateDeg(c, deg) 
    {
        this.cx = c.x;
        this.cy = c.y;
        var radians = (Math.PI / 180) * deg,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - c.x)) + (sin * (this.y - c.y)) + c.x,
        ny = (cos * (this.y - c.y)) - (sin * (this.x - c.x)) + c.y;

        this.x = nx;
        this.y = ny;

        this.pos = createVector(nx, ny);

        for(let i = 0; i < this.satellites.length; i++)
        {
            //around barycenter
            this.satellites[i].update(c, this.orbitalSpeed);

            //around body
            this.satellites[i].update(this.pos);
        }
    }

    draw()
    {
        push();

        if(debugOrbit)
        {
            noFill();
            stroke(0, 255, 0);

            strokeWeight(control.scale);

            //console.log(this.cx, this.cy, dist(this.x, this.y, this.cx, this.cy));

            ellipse(this.cx, this.cy, dist(this.x, this.y, this.cx, this.cy) * 2);
        }

        noStroke();
        if(this.highlight)
        {
            fill(255);
            ellipse(this.x, this.y, this.radius + 10 * control.scale);
        }

        fill(this.color.R, this.color.G, this.color.B);
        ellipse(this.pos.x, this.pos.y, this.radius);

        for(let i = 0; i < this.satellites.length; i++)
        {
            this.satellites[i].draw();
        }

        pop();
    }
}

class Satellite
{
    constructor(x, y, cx, cy, name, maxmass, orbitalSpeed)
    {
        this.x = x;
        this.y = y;

        this.cx = cx;
        this.cy = cy;

        this.pos = createVector(x, y);

        this.highlight = false;
        this.name = name;
        this.orbitalSpeed = orbitalSpeed;

        //generate mass, which is then used for radius
        if(maxmass == null)
            this.mass = random(0.1, 20);
        else
            this.mass = random(maxmass / 10, maxmass);

        //radius (used for rendering & hitboxes)
        this.radius = Math.sqrt(this.mass) * (3 * scaleconstant);

        this.color =
        {
            R: random(0, 255) + 10,
            G: random(0, 255) + 10,
            B: random(0, 255) + 10
        }
    }

    update(c, o)
    {
        this.cx = c.x;
        this.cy = c.y;

        if(o == undefined)
            o = this.orbitalSpeed;

        var radians = (Math.PI / 180) * (2 / o),
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (this.x - c.x)) + (sin * (this.y - c.y)) + c.x,
        ny = (cos * (this.y - c.y)) - (sin * (this.x - c.x)) + c.y;

        this.x = nx;
        this.y = ny;

        this.pos = createVector(nx, ny);
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

    draw()
    {
        push();

        if(debugOrbit)
        {
            noFill();
            stroke(0, 255, 0);

            strokeWeight(control.scale);

            ellipse(this.cx, this.cy, dist(this.x, this.y, this.cx, this.cy) * 2);
        }

        noStroke();
        if(this.highlight)
        {
            fill(255);
            ellipse(this.x, this.y, this.radius + 10 * control.scale);
        }

        fill(this.color.R, this.color.R, this.color.R);
        ellipse(this.x, this.y, this.radius);

        pop();
    }
}

class Member
{
    constructor(c, b, bodies, satellites, orbitalSpeed)
    {
        this.center = c;
        this.barycenter = b;
        this.bodies = bodies;
        this.satellites = satellites;
        this.orbitalSpeed = orbitalSpeed;

        //member represents the barycenter of a collection of bodies and satellites
    }

    update()
    {
         var radians = (Math.PI / 180) * (2 / this.orbitalSpeed),
            cos = Math.cos(radians), 
            sin = Math.sin(radians),
            nx = (cos * (this.barycenter.x - this.center.x)) + (sin * (this.barycenter.y - this.center.y)) + this.center.x,
            ny = (cos * (this.barycenter.y - this.center.y)) - (sin * (this.barycenter.x - this.center.x)) + this.center.y;
        
        this.barycenter = createVector(nx, ny);

        this.bodies.forEach((b) => 
        {
            if(this.center.x != this.barycenter.x && this.center.y != this.barycenter.y)
                b.update(this.center, this.orbitalSpeed);
            b.update(this.barycenter);
        });

        this.satellites.forEach((s) =>
        {
            if(this.center.x != this.barycenter.x && this.center.y != this.barycenter.y)
                s.update(this.center, this.orbitalSpeed);
            s.update(this.barycenter);
        });
    }

    draw()
    {

        push();
        if(debugOrbit)
        {
            noFill();
            stroke(0, 255, 0);
            strokeWeight(control.scale);
            let nya = 20;
            line(this.barycenter.x - nya, this.barycenter.y - nya, this.barycenter.x + nya, this.barycenter.y + nya);
            line(this.barycenter.x + nya, this.barycenter.y - nya, this.barycenter.x - nya, this.barycenter.y + nya);
            ellipse(this.center.x, this.center.y, dist(this.barycenter.x, this.barycenter.y, this.center.x, this.center.y) * 2);
        }

        pop();


        this.bodies.forEach((b) => 
        {
            b.draw();
        });

        this.satellites.forEach((s) =>
        {
            s.draw();
        });
    }
}