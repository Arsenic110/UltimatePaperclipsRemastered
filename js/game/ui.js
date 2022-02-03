//this class would control the HTML based UI, which would be overlaid over the canvas.
class UI
{
    constructor()
    {
        this.headertext = $("#header-div").find("h1")[0];
    }

    update()
    {
        this.headertext.innerHTML = simulate ? "Simulating" : "Paused";
    }
}