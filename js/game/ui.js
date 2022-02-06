//this class would control the HTML based UI, which would be overlaid over the canvas.
class UI
{
    constructor()
    {
        this.header = $("#header-div");
        this.info = $("#info-div");
        this.headertext = $("#header-div").find("h1")[0];
        this.selected = undefined;
    }

    update()
    {
        this.header.hide();
        this.info.hide();
        this.headertext.innerHTML = simulate ? "Simulating" : "Paused";
        if(this.selected)
            control.panTo(this.selected.pos);
    }

    draw()
    {
        
    }

    setSelect(body)
    {
        if(this.selected != undefined)
            this.selected.highlight = false;
        if(body != undefined)
            body.highlight = true;
        this.selected = body;
    }
}