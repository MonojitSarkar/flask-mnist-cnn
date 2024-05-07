const canvas = document.querySelector('.myCanvas');
const width = canvas.width //= window.innerWidth;
const height = canvas.height //= window.innerHeight - 30;
const ctx = canvas.getContext('2d');
console.log(canvas.height, canvas.width);

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

const clearBtn = document.querySelector('button');
const download = document.querySelector('#download')

let curX;
let curY;
let pressed = false;

canvas.addEventListener('mousemove', e=> {
    curX = e.clientX;
    curY = e.clientY - 90;
    console.log(curX, curY);
//   curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
//   curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
});

canvas.addEventListener('mousedown', () => pressed = true);
canvas.addEventListener('mouseup', () => pressed = false);
clearBtn.addEventListener('click', () => {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
});

function draw(){
    if (pressed) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(curX, curY, 5, 50, 100, false);
        ctx.fill();
    }
    requestAnimationFrame(draw);
};

canvas.addEventListener('mousemove', draw)

// draw();

download.addEventListener('click', function(){
    console.log('Download got clicked!!!!')
    var dataURL = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "canvas.png";
    link.href = dataURL;

    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
})