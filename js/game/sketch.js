let control;
let ui;
var systems = [];

var selectedPlanet;

var mouse; //createVector(mouseX, mouseY);
var mouseWorld;// = createVector(0, 0);

var debugOrbit = true;

var debugCursorWrite = "Test";

var timeFactor = 1;
var simulate = false;

var scaleconstant = 10;

function setup()
{
    createCanvas(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    control = new Control();
    ui = new UI();

    for(let i = 0; i < random(1, 1); i++)
    {
        systems.push(new SolarSystem());
    }
}

function update()
{

    for(let i = 0; i < systems.length; i++)
    {
        systems[i].update();
    }


    control.update();

    ui.update();



}

function draw()
{
    update();

    background(0, 0, 40);

    //TRANSLATE
    control.draw();

    //debugCursorWrite = (ui.selected ? ui.selected.name : "bruh");
    for(let i = 0; i < systems.length; i++)
    {
        systems[i].draw();
    }

    return;

    push();

    textSize(20 * (1 / control.scaleFactor));

    fill(255);
    text("(0, 0)", 0, 0);
    text("(" + control.transform.x + ", " + control.transform.y + ")", control.transform.x, control.transform.y);
    text(debugCursorWrite, mouseWorld.x, mouseWorld.y);

    stroke(255);
    line(0, 0, control.transformToWorld(createVector(0, 0)).x, control.transformToWorld(createVector(0, 0)).y);
    
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

