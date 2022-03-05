class World
{
    //this class stores a colony's data.
    constructor()
    {
        //size of the colony. In chunks, irrespective of the actual coords.
        this.worldSize = createVector(4, 4);
        this.initWorld();
    }

    initWorld()
    {
        this.chunks = [];
        for (let i = 0; i < this.worldSize.x; i++)
        {
            for (let j = 0; j < this.worldSize.y; j++)
            {
                this.chunks.push(new Chunk(i, j, ctoi(i, j, this.worldSize.x)));
            }
        }

    }

    update()
    {
        for(let i = 0; i < this.chunks.length; i++)
        {
            this.chunks[i].update();
        }
    }
    draw()
    {
        for(let i = 0; i < this.chunks.length; i++)
        {
            this.chunks[i].draw();
        }

    }
}

class Chunk
{
    // a single chunk is a 16 * 16 set of tiles.
    constructor(x, y, cindex)
    {//(x, y) in chunk coords
        this.tileset = [];
        this.pos = createVector(x * 16, y * 16);
        this.bounds = createVector(16 * 32, 16 * 32);

        this.chunk = cindex;

        for (let i = 0; i < 16; i++)
        {
            for (let j = 0; j < 16; j++)
            {
                this.tileset.push([new Tile(this.pos.x + i, this.pos.y + j, this.chunk)]);
            }
        }

    }

    addNewTile(x, y, type)
    {
        for(let i = 0; i < this.tileset.length; i++)
        {
            if(this.tileset[i][0].x == x && this.tileset[i][0].y == y)
                console.log(this.tileset[i]);

            if(this.tileset[i][0].x == x && this.tileset[i][0].y == y && this.tileset[i][1])
            {
                return;
            }
            else if (this.tileset[i][0].x == x && this.tileset[i][0].y == y)
            {
                this.tileset[i].push(new type(x, y, this.chunk));
            }

        }
    }

    update()
    {
        return;
        for(let i = 0; i < this.tileset.length; i++)
        {
            //this.tileset[i].update();
        }
    }

    draw()
    {
        for(let i = 0; i < this.tileset.length; i++)
        {
            for(let j = 0; j < this.tileset[i].length; j++)
            {
                this.tileset[i][j].draw();
            }
        }

        //rect(this.pos.x * 32, this.pos.y * 32, this.bounds.x, this.bounds.y);

        if(!debugDraw)
            return;

        push();
        stroke(0, 255, 0);

        var bruh = 10;
        line(this.pos.x * 32 - bruh, this.pos.y * 32 - bruh, this.pos.x * 32 + bruh, this.pos.y * 32 + bruh);
        line(this.pos.x * 32 - bruh, this.pos.y * 32 + bruh, this.pos.x * 32 + bruh, this.pos.y * 32 - bruh);
        pop();
    }


}

class Tile
{
    //simple tile class. Has coords, and a color/texture to draw.
    constructor(x, y, cindex)
    {//(x, y) in global tile coords
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);
        this.color = {R:100, G:100, B:100}

        this.chunk = cindex;

        this.a = "Tile";

        this.tileSize = 32;
    }

    name()
    {
        return this.a;
    }

    update()
    {
        //nothing here yet.

    }

    draw()
    {
        push();
        fill(this.color.R, this.color.G, this.color.B);
        noStroke();
        rect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize - 1, this.tileSize - 1);
        pop();
    }
}

class ElectricComponent
{
    constructor(layout)
    {
        //Different types: 1 -> 4 connections
        //layout = { north: true, south: true, east: true, west:true };

        //    north
        // west x east
        //    south

        this.layout = layout;
    }

    updateLayout(layout)
    {
        this.layout = layout;
    }

    draw(c, s)
    {
        push();
        fill(0, 255, 0);

        if(!this.layout.north)
            fill(255, 0, 0);
        rect(c.x * 32 + s.x / 4, c.y * 32, s.x / 2, s.y / 8);
        fill(0, 255, 0);
        if(!this.layout.south)
            fill(255, 0, 0);
        rect(c.x * 32 + s.x / 4, c.y * 32 + s.y - s.y / 8 - 1, s.x / 2, s.y / 8);
        fill(0, 255, 0);
        if(!this.layout.east)
            fill(255, 0, 0);
        rect(c.x * 32 + s.x - s.x / 8 - 1, c.y * 32 + s.y / 4, s.x / 8, s.y / 2);
        fill(0, 255, 0);
        if(!this.layout.west)
            fill(255, 0, 0);
        rect(c.x * 32, c.y * 32 + s.y / 4, s.x / 8, s.y / 2);
    }
}

class SolarPanelTile
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);

        this.color = {R:60, G:80, B:190};
        this.a = "SolarPanelTile";

        this.tileSize = 32;
        this.bounds = createVector(this.tileSize, this.tileSize);

        this.tickLength = 60;
        this.tick = 0;

        generationManager.subscribe(this);

        this.electricComponent = new ElectricComponent({ north: false, south: true, east: false, west: false});
    }

    update()
    {
        //update tick, if tick reaches this.tickLength, set tick to 0, add 1 to generator pool
        this.tick++;
        if(this.tick >= this.tickLength)
        {
            this.tick = 0;
            energyPool++;
        }
    }

    draw()
    {
        push();
        noStroke();

        fill(255);
        rect(this.x * this.tileSize + 1, this.y * this.tileSize + 1, this.tileSize - 3, this.tileSize - 3, 1);

        fill(this.color.R, this.color.G, this.color.B);
        rect(this.x * this.tileSize + 3, this.y * this.tileSize + 3, this.tileSize - 7, this.tileSize - 7);

        fill(140, 150, 220);
        rect(this.x * this.tileSize + this.tileSize * 0.3, this.y * this.tileSize + 3, this.tileSize / 12, this.tileSize - 7);
        rect(this.x * this.tileSize + this.tileSize * 0.6, this.y * this.tileSize + 3, this.tileSize / 12, this.tileSize - 7);

        rect(this.x * this.tileSize + 3, this.y * this.tileSize  + this.tileSize * 0.3, this.tileSize - 7, this.tileSize / 12);
        rect(this.x * this.tileSize + 3, this.y * this.tileSize  + this.tileSize * 0.6, this.tileSize - 7, this.tileSize / 12);

        pop();

        if(debugDraw)
            this.electricComponent.draw(this.pos, this.bounds);



        if(progressBar)
            this.drawProgressBar();

    }

    drawProgressBar()
    {
        push();
        fill(10);
        rect(this.x * this.tileSize + 2, this.y * this.tileSize - 1, this.tileSize - 5, this.tileSize / 6);

        var col = {R:255, G:255, B:255};

        switch(true)
        {
            case (this.tick < this.tickLength * 0.25):
                col = {R:255, G:0, B:0};
            
                break;
            case (this.tick < this.tickLength * 0.5):
                col = {R:255, G:100, B:0};
        
                break;
            case (this.tick < this.tickLength * 0.75):
                col = {R:255, G:255, B:0};
            
                break;
            case (this.tick < this.tickLength):
                col = {R:0, G:255, B:0};

                break;
        }

        fill(col.R, col.G, col.B);

        rect(this.x * this.tileSize + 3, this.y * this.tileSize, (this.tileSize - 7) * this.tick / this.tickLength, this.tileSize / 6 - 2);

        pop();
    }

    name()
    {
        return this.a;
    }
}

class ConduitTile
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);
        this.color = {R:40, G:40, B:40};
        this.tileSize = 32;
        this.a = "ConduitTile";

        this.bounds = createVector(this.tileSize / 3, this.tileSize / 3);
        generationManager.subscribe(this);

        this.electricComponent = new ElectricComponent({north: false, south: false, east: false, west: false});
    }

    update(neighbors)
    {
        //console.log(neighbors.length);

        //debugger;
        for(let i = 0; i < neighbors.length; i++)
        {
            //neighbors[i][0].color = {R:255, G:0, B:0};
            

            if (neighbors[i].length > 1 && neighbors[i][1].electricComponent)
            {
                //yoo its a connection
                if(i == 1)// && neighbors[i][1].electricComponent.layout.south)
                {
                    this.electricComponent.layout.north = true;
                }
                if(i == 3)// && neighbors[i][1].electricComponent.layout.west)
                {
                    this.electricComponent.layout.west = true;
                }
                if(i == 4)// && neighbors[i][1].electricComponent.layout.east)
                {
                    this.electricComponent.layout.east = true;
                }
                if(i == 6)// && neighbors[i][1].electricComponent.layout.north)
                {
                    this.electricComponent.layout.south = true;
                }
            }
        }
    }

    draw()
    {
        push();
        fill(this.color.R, this.color.G, this.color.B);
        noStroke();

        //logic for drawing the tile always in the center, regardless of its size
        rect(this.x * this.tileSize + 1 + (this.tileSize / 2 - this.bounds.x / 2), this.y * this.tileSize + 1 + (this.tileSize / 2 - this.bounds.y / 2), this.bounds.x - 3, this.bounds.y - 3);

        if(this.electricComponent.layout.north)
            rect(this.x * this.tileSize + 1 + this.tileSize / 3, this.y * this.tileSize + 1, this.tileSize / 3  - 3, this.tileSize / 2 - 3);
        if(this.electricComponent.layout.south)
            rect(this.x * this.tileSize + 1 + this.tileSize / 3, this.y * this.tileSize + 1 + this.tileSize / 2, this.tileSize / 3  - 3, this.tileSize / 2 - 3);
        if(this.electricComponent.layout.west)
            rect(this.x * this.tileSize + 1, this.y * this.tileSize + 1 + this.tileSize / 2 - (this.tileSize / 3) / 2, this.tileSize / 2  - 3, this.tileSize / 3 - 3);
        if(this.electricComponent.layout.east)
            rect(this.x * this.tileSize + 1 + this.tileSize / 2, this.y * this.tileSize + 1 + this.tileSize / 2 - (this.tileSize / 3) / 2, this.tileSize / 2  - 3, this.tileSize / 3 - 3);
        

        if(debugDraw)
            this.electricComponent.draw(this.pos, createVector(32, 32));
        pop();
    }

    name()
    {
        return this.a;
    }
}

