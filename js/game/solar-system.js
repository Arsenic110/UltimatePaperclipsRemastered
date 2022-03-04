class SolarSystem
{
    constructor()
    {
        //generate random position
        this.x = 0//random(-window.innerWidth, window.innerWidth)* (3 * scaleconstant);
        this.y = 0//random(-window.innerHeight, window.innerHeight) * (3 * scaleconstant);

        this.pos = createVector(this.x, this.y);


        this.members = [];

        for(let i = 0; i < random(5, 10); i++)
        {
            break;
            this.members.push(this.generateMember(this.pos, createVector(this.pos.x + 500 * i, this.pos.y), i));
        }

        this.members = this.generateSol();
    }

    generateMember(center, pos, index)
    {

    var member, stars = [], bodies = [], satellites = [];

        if(index == 0)
        {
            //First, stars
            if(random([0,1])) //did you know binary pairs are much more common in the milky way than singular stars?
            {
                
                //if 2 stars
                stars = 
                [
                    new Body(pos.x + 150, pos.y, pos.x, pos.y, "star 1", 80, 1),
                    new Body(pos.x + 150, pos.y, pos.x, pos.y, "star 2", 80, 1)
                ];
                stars[0].rotateDeg(this.pos, 180);
            }
            else
            {
                //if 1 star
                stars = 
                [
                    new Body(pos.x, pos.y, pos.x, pos.y, "star 1", 80, 1)
                ];
            }

            member = new Member(pos, pos, stars, [], 0);
            return member;
        }
        let r = random(1, 2);
        //1 in 10 chance of being binary planet
        if(random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) == 4)  //rolled a die. guaranteed to be random
        {

            //double planet
            bodies = 
            [
                new Body(pos.x + 60 , pos.y, pos.x, pos.y, "body 1", 3, 2 / r),
                new Body(pos.x + 60 , pos.y, pos.x, pos.y, "body 2", 4, 2 / r)
            ]
            bodies[0].rotateDeg(createVector(pos.x, pos.y), 180);

            //bodies[0].addNewSat(random([0,1]));
            //bodies[1].addNewSat(random([0,1]));

        }
        else
        {
            bodies = 
            [
                new Body(pos.x, pos.y, pos.x, pos.y, "body 1", 5, 2 / r)
            ]
            //bodies[0].addNewSat(random(0,1));
        }

        if(random([0, 5]))
        {
            satellites.push(new Satellite(
                pos.x + 100 + 130 * random(0,1), pos.y, pos.x, pos.y, "sat 1", 0.5, 1.2 * random(0.5,1.5)
            ));
        }
        member = new Member(center, pos, bodies, satellites, 3 * index);
        return member;

    }

    generateSol()
    {
        var mm = [];
        var c = createVector(0, 0);
        var v = 10;
        var g = 0;

        //sol
        mm.push(new Member(
            c, c, [new Body(c.x, c.y, c.x, c.y, "Sol", 10, 1)], [], 1
        ))

        g=1;
        mm.push(new Member(
            c, this.cg(v * g), [new Body(this.cg(v * g).x, this.cg(v * g).y, this.cg(v * g).x, this.cg(v * g).y, "Mercury", 1, 30)], [], 30
        ))

        g=2;
        mm.push(new Member(
            c, this.cg(v * g), [new Body(this.cg(v * g).x, this.cg(v * g).y, this.cg(v * g).x, this.cg(v * g).y, "Venus", 9, 60)], [], 60
        ))

        g=3;
        mm.push(new Member(
            c, this.cg(v * g), [new Body(this.cg(v * g).x, this.cg(v * g).y, this.cg(v * g).x, this.cg(v * g).y, "Earth", 10, 100)], [], 100
        ))

        g=4;
        mm.push(new Member(
            c, this.cg(v * g), [new Body(this.cg(v * g).x, this.cg(v * g).y, this.cg(v * g).x, this.cg(v * g).y, "Mars", 4, 100)], [], 400
        ))

        g=5;
        mm.push(new Member(
            c, this.cg(v * g), [new Body(this.cg(v * g).x, this.cg(v * g).y, this.cg(v * g).x, this.cg(v * g).y, "Jupiter", 60, 100)], [], 1000
        ))

        return mm;
    }

    
    cg(x)
    {//helper method for generateSol()
        return createVector(x * 100, 0);
    }

    update()
    {
        this.pos = createVector(this.x, this.y);

        if(!simulate)
            return;

        for(let i = 0; i < this.members.length; i++)
        {
            //planet around star
            this.members[i].update(this.pos);
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

    addNewSat(rr)
    {
        this.satellites = [];
        for(let i = 0; i < rr; i++)
        {
            //push new satellites
            this.satellites.push(new Satellite(this.x + 200 * i, this.y, this.x, this.y, this.name + ", Moon " + i, 3, this.orbitalSpeed / 3));
        }
    }

    update(c, o)
    {

        this.cx = c.x;
        this.cy = c.y;

        if(o == undefined)
            o = this.orbitalSpeed;

        var radians = (Math.PI / 180) * (2 / o * timeFactor),
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

        var radians = (Math.PI / 180) * (2 / o * timeFactor),
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
    constructor(center, barycenter, bodies, satellites, orbitalSpeed)
    {
        this.center = center;
        this.barycenter = barycenter;
        this.bodies = bodies;
        this.satellites = satellites;
        this.orbitalSpeed = orbitalSpeed;

        //member represents the barycenter of a collection of bodies and satellites
    }

    update(c)
    {
        this.center = c;

         var radians = (Math.PI / 180) * (2 / this.orbitalSpeed * timeFactor),
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