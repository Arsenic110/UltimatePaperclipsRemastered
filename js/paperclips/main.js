var clips = 0;

var clipSpeed = 0;

var clipFactory = [0, 0];

var clipsDOM = document.getElementById("clip-num");
var speedDOM = document.getElementById("speed");
var initialFactorDOM = document.getElementById("factor");

var factorDisplay = document.getElementById("factorDisplay");
var factoryDOM = [];


function init()
{
    window.setInterval(tick, 30);
}

function tick()
{
    for(var i = clipFactory.length - 1; i > 0; i--)
    {
        clipFactory[i - 1] += clipFactory[i];
    }

    clipFactory[0] += clipFactory[1];

    clips += clipFactory[0];
    writeClips();
}

function speedClick()
{
    clipSpeed += 1;
}

function factorClick()
{
    clipFactory[clipFactory.length - 1]  += 1;
}

function addFactor()
{
    var x = 0;
    clipFactory.push(x);
    factorDisplay.innerHTML += " Factor " + clipFactory.length + ": [<span id=\"factor" + clipFactory.length + "\">0</span>]";
    factoryDOM.push(document.getElementById("factor" + clipFactory.length));
}

function writeClips()
{
    clipsDOM.innerHTML = clips.toLocaleString();
    speedDOM.innerHTML = clipSpeed.toLocaleString();
    initialFactorDOM.innerHTML = clipFactory[0].toLocaleString();

    for (var i = 0; i < factoryDOM.length; i++)
    {
        factoryDOM[i].innerHTML = clipFactory[i].toLocaleString();
    }

}

function pp()
{
    console.log(factoryDOM.toString());
}


init();