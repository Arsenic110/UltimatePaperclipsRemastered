let control;
let ui;
var systems = [];

var colony;

var selectedPlanet;

var mouse; //createVector(mouseX, mouseY);
var mouseWorld;// = createVector(0, 0);

var debugOrbit = true;

var debugCursorWrite = "Test";

var timeFactor = 50;
var simulate = false;

var scaleconstant = 10;

var mode = "planetside";

var generationManager;
var energyPool = 0;

function setup()
{
    createCanvas(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    control = new Control();
    ui = new UI();

    for(let i = 0; i < random(1, 1); i++)
    {
        systems.push(new SolarSystem());
    }
    generationManager = new GenerationManager();
    colony = new World();


}

function update()
{

    for(let i = 0; i < systems.length; i++)
    {
        systems[i].update();
    }
    colony.update();
    generationManager.update();

    control.update();
    ui.update();
}

function draw()
{
    update();

    background(0, 0, 40, 255);

    //TRANSLATE
    control.draw();

    if(mode == "map")
    for(let i = 0; i < systems.length; i++)
    {
        systems[i].draw();
    }
    if(mode == "planetside")
        colony.draw();




    textSize(32);
    fill(255, 255, 150);
    text("Power: " + energyPool, 0, -30);

    return;
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

