class GenerationManager
{
    //this is a class with an array that manages all subscriptions to generators, so they can be easily updated together.
    constructor()
    {
        this.list = [];

    }
    subscribe(tile)
    {
        this.list.push(tile);
    }
    update()
    {
        let neighbor = [];
        for(let i = 0; i < this.list.length; i++)
        {
            //we need to generate a list of neighbors;
            //this is a really shitty roundabout way of doing it, but here we go

            //first we need the index of the tile inside the chunk
            let index = this.list[i].x * 16 + this.list[i].y % 16;

            //next, we need the chunk of the tile - 
            //since we know its position in realspace, we can just collide that with all chunks to see which one contains it
            let ch = 0;
            for(let j = 0; j < colony.chunks.length; j++)
            {
                if(control.isMouseInside(colony.chunks[j].pos.x * 32, colony.chunks[j].pos.y * 32, colony.chunks[j].bounds.x, colony.chunks[j].bounds.y, this.list[i].pos.x * 32, this.list[i].pos.y * 32))
                {
                    ch = j;
                }
            }

            //now, finally, we can begin generating the neighbors:
            neighbor = 
            [
                colony.chunks[ch].tileset[this.gi(this.list[i].x - 1, this.list[i].y - 1)],
                colony.chunks[ch].tileset[this.gi(this.list[i].x, this.list[i].y - 1)],
                colony.chunks[ch].tileset[this.gi(this.list[i].x + 1, this.list[i].y - 1)],

                colony.chunks[ch].tileset[this.gi(this.list[i].x - 1, this.list[i].y)],

                colony.chunks[ch].tileset[this.gi(this.list[i].x + 1, this.list[i].y)],

                colony.chunks[ch].tileset[this.gi(this.list[i].x - 1, this.list[i].y + 1)],
                colony.chunks[ch].tileset[this.gi(this.list[i].x, this.list[i].y + 1)],
                colony.chunks[ch].tileset[this.gi(this.list[i].x + 1, this.list[i].y + 1)],
            ]

            this.list[i].update(neighbor);
        }
    }
    gi(x, y)
    {
        return x * 16 + y % 16;

    }
}