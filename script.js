$(function(){
    let iterations = 100;
    let pixelsize = 0.05;
    let pixelcount = 100000;
    let pixelcolor = "#ffffff";

    $("#increment").on("click", function() {
        pixelsize+=1.5;
    });
    $("#decrement").on("click", function() {
        pixelsize-=1.5;
    });
    $("#colorchange").on("click", function(){
        pixelcolor = "#" + Math.floor(Math.random()*16777215).toString(16);
    });

    var ctx = $("#myCanvas")[0].getContext("2d");
    $("body").css("background-color","#000000");

    // random point inside the shape
    let randPoint = {
        x: Math.floor(Math.random() * 1020),
        y: Math.floor(Math.random() * 1020)
    };

    TimeoutFunction();

    function Triangle(ctx)
    {
        // triangle point dimensions
        let triangle = [
            {x:510, y:0},
            {x:0, y:1020},
            {x:1020, y:1020}
        ];
        //infinite loop to draw random points based on algorithm
        let count = 0;
        while(count < pixelcount)
        {
            // random number (0, 1, 2) as in "Corners"
            let rand = Math.floor(Math.random() * triangle.length);
            let corner = triangle[rand];

            randPoint.x = (randPoint.x + corner.x) /  2;      
            randPoint.y = (randPoint.y + corner.y) /  2;

            ctx.beginPath();
            ctx.arc(randPoint.x, randPoint.y, pixelsize, 0, 2*Math.PI);
            ctx.fill();
            ctx.fillStyle = pixelcolor.toString(16);
            count++;
        }
    };

    function Rectangle(ctx)
    {
        // rectangle
        let rectangle = [
            {x:0, y:0},
            {x:0, y:1020},
            {x:1020, y:1020},
            {x:1020, y:0},
        ];
        // infinite loop to draw random points based on algorithm
        let count = 0;
        let previous = null;
        while(count < pixelcount)
        {
            let currentRand = Math.floor(Math.random() * rectangle.length);
            if (currentRand != previous)
            {
                previous = currentRand;
            
                // random number (0, 1, 2) as in "Corners"
                let corner = rectangle[currentRand];

                randPoint.x = (randPoint.x + corner.x) /  2;      
                randPoint.y = (randPoint.y + corner.y) /  2;

                ctx.beginPath();
                ctx.fillRect(randPoint.x, randPoint.y, pixelsize, pixelsize);
                ctx.fillStyle = pixelcolor.toString(16);
                count++;
            }
        }
    }

    function TimeoutFunction() {
        //Triangle(ctx);
        Rectangle(ctx);
        if(iterations > 0)
        {
            iterations--;
            setInterval(TimeoutFunction, 100)
        }
    }
});