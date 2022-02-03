let control;
let ui;
let systems = [];

var timeFactor = 5;
var simulate = true;

function setup()
{
    createCanvas(window.innerWidth - 20, window.innerHeight - 20);
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
    control.update();

    for(let i = 0; i < systems.length; i++)
    {
        systems[i].draw();
    }
    //circles();
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
    return false;
}

function mouseDragged() 
{
    control.mouseDragged();
}

function circles()
{
    fill(255);
    ellipse(150, 150, 50, 50);
    ellipse(150, 250, 25, 25);
}