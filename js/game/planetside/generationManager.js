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
        for(let i = 0; i < this.list.length; i++)
        {
            this.list[i].update();
        }
    }
}