let control;
let ui;
var systems = [];

var selectedPlanet;

var mouseXWorld = 0, mouseYWorld = 0;

var debugCursorWrite;

var timeFactor = 10;
var simulate = true;

var scaleconstant = 5;

function setup()
{
    createCanvas(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    control = new Control();
    ui = new UI();

    for(let i = 0; i < random(10, 20); i++)
    {
        systems.push(new SolarSystem());
    }
}

function draw()
{
    background(0);
    ui.update();

    //TRANSLATE
    control.update();

    //debugCursorWrite = "(X: " + mouseXWorld + ", Y: " + mouseYWorld + ")\n" + (1 / control.scaleFactor);
    debugCursorWrite = (ui.selected ? ui.selected.name : "");



    for(let i = 0; i < systems.length; i++)
    {
        systems[i].draw();
    }


    textSize(20 * (1 / control.scaleFactor));
    push();
    fill(255);
    //ellipse(mouseXWorld, mouseYWorld, 15);

    text(debugCursorWrite, mouseXWorld, mouseYWorld);
    pop();
}

function keyPressed()
{
    control.keyPressed(keyCode);
    //return false;
}
function keyReleased()
{
    control.keyReleased(keyCode);
    return false;
}
function mouseWheel(e)
{
    control.mouseWheel(e);
    
    return {passive:false};
}
function mouseClicked()
{
    control.mouseClicked();
}

function mouseDragged() 
{
    control.mouseDragged();
    return false;
}
