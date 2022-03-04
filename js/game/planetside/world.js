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
                this.chunks.push(new Chunk(i, j));
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
    constructor(x, y)
    {//(x, y) in chunk coords
        this.tileset = [];
        this.pos = createVector(x * 16, y * 16);
        this.bounds = createVector(16 * 32, 16 * 32);

        for (let i = 0; i < 16; i++)
        {
            for (let j = 0; j < 16; j++)
            {
                this.tileset.push(new Tile(this.pos.x + i, this.pos.y + j, {R:100, G:100, B:100}));
                //this.tileset.push(new SolarPanelTile(this.pos.x + i, this.pos.y + j));
            }
        }

        //this.tileset.push(new SolarPanelTile(this.pos.x, this.pos.y));
    }

    addNewTile(x, y, type)
    {
        for(let i = 0; i < this.tileset.length; i++)
        {
            console.log("bruh")
            if(this.tileset[i].x == x && this.tileset[i].y == y && !(this.tileset[i] instanceof Tile))
            return;
        }
        this.tileset.push(new type(x, y));
    }


    update()
    {
        for(let i = 0; i < this.tileset.length; i++)
        {
            //this.tileset[i].update();
        }
    }
    draw()
    {
        for(let i = 0; i < this.tileset.length; i++)
        {
            this.tileset[i].draw();
        }

        //rect(this.pos.x * 32, this.pos.y * 32, this.bounds.x, this.bounds.y);


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
    constructor(x, y, color)
    {//(x, y) in global tile coords
        this.x = x;
        this.y = y;
        this.color = color;

        this.tileSize = 32;
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

class SolarPanelTile
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.color = {R:70, G:70, B:180};

        this.tileSize = 32;

        this.tickLength = 60;

        this.tick = 0;

        generationManager.subscribe(this);
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
        fill(this.color.R, this.color.G, this.color.B);
        noStroke();
        rect(this.x * this.tileSize + 1, this.y * this.tileSize + 1, this.tileSize - 3, this.tileSize - 3);


        //progress bar
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
}