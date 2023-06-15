

export function Kaart(){
// reference canvas element (with id="c")
    var canvasEl = document.getElementById('c');

// get 2d context to draw on (the "bitmap" mentioned earlier)
    var ctx = canvasEl.getContext('2d');

// set fill color of context
    ctx.fillStyle = 'red';

// create rectangle at a 100,100 point, with 20x20 dimensions
    ctx.fillRect(100, 100, 20, 20);


    return(
        <div>
            <canvas id={"c"}></canvas>
            <p>Hier komt de kaart!</p>
        </div>
    )
}
