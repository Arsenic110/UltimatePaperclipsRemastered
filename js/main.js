

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