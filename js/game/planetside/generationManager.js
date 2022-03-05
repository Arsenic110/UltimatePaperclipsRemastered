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

            //now, finally, we can begin generating the neighbors:
            // neighbor = 
            // [
            //     colony.chunks[ch].tileset[ctoi(this.list[i].x - 1, this.list[i].y - 1, 16)],
            //     colony.chunks[ch].tileset[ctoi(this.list[i].x, this.list[i].y - 1, 16)],
            //     colony.chunks[ch].tileset[ctoi(this.list[i].x + 1, this.list[i].y - 1, 16)],

            //     colony.chunks[ch].tileset[ctoi(this.list[i].x - 1, this.list[i].y, 16)],

            //     colony.chunks[ch].tileset[ctoi(this.list[i].x + 1, this.list[i].y, 16)],

            //     colony.chunks[ch].tileset[ctoi(this.list[i].x - 1, this.list[i].y + 1, 16)],
            //     colony.chunks[ch].tileset[ctoi(this.list[i].x, this.list[i].y + 1, 16)],
            //     colony.chunks[ch].tileset[ctoi(this.list[i].x + 1, this.list[i].y + 1, 16)],
            // ];



            for(let j = 0; j < colony.chunks.length; j++)
            {
                if(control.isMouseInside(colony.chunks[j].pos.y * 32 - 1, colony.chunks[j].pos.x * 32 - 1, colony.chunks[j].bounds.x, colony.chunks[j].bounds.y, this.list[i].pos.x * 32, this.list[i].pos.y * 32))
                {
                    let x = this.list[i].pos.x, y = this.list[i].pos.y;
                    
                    neighbor = 
                    [
                        this.getTileAt(x - 1, y - 1),
                        this.getTileAt(x, y - 1),
                        this.getTileAt(x + 1, y - 1),

                        this.getTileAt(x - 1, y),

                        this.getTileAt(x + 1, y),

                        this.getTileAt(x - 1, y + 1),
                        this.getTileAt(x, y + 1),
                        this.getTileAt(x + 1, y + 1),
                    ]

                    //return;
                }
            }

            this.list[i].update(neighbor);
        }
    }

    getTileAt(x, y)
    {
        for(let j = 0; j < colony.chunks.length; j++)
        {
            if(control.isMouseInside(colony.chunks[j].pos.x * 32 - 1, colony.chunks[j].pos.y * 32 - 1, colony.chunks[j].bounds.x, colony.chunks[j].bounds.y, x * 32, y * 32))
            {
                //j is chunk, x & y is realspace tile coords

                let i = ctoi(y - colony.chunks[j].pos.y, x - colony.chunks[j].pos.x, 16);



                return colony.chunks[j].tileset[i];
            }
        }
        return null;
    }
}