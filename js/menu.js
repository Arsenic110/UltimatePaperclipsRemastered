function startTime() 
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) 
{
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function write(s, d)
{
    let h;
    if(iteration == 0)
    {
        h = s.innerHTML;
        s.innerHTML = "";
        console.log("wiped");
    }
    else
    {
        s.innerHTML += h[iteration];
        console.log(h[iteration]);
        iteration++;
        sleep(d);   
    }
}

function sleep(ms)
{
    const date = Date.now();
    let currentDate = null;
    do
    {
        currentDate = Date.now();
    }
    while(currentDate - date < ms);
}