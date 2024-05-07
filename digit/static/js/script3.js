const canvas = document.querySelector('.myCanvas');
const width = canvas.width
const height = canvas.height
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

const clearBtn = document.getElementById('button');
// const download = document.querySelector('#download');
let imageInput = document.getElementById('imageInput');

let curX;
let curY;
let pressed = false;

canvas.addEventListener('mousemove', e=> {
    curX = e.clientX - canvas.offsetLeft;
    curY = e.clientY - canvas.offsetTop;
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

document.getElementById("upload").addEventListener("click", function(e){
    e.preventDefault();
    let dataURL = canvas.toDataURL();
    imageInput.value =  dataURL;
    console.log('in here');
});

document.getElementById('submitID').addEventListener('click', function(event){
    event.preventDefault();
    let dataURL = canvas.toDataURL();
    imageInput.value =  dataURL;
    console.log('clicked');
})

// function saveCanvas(event){
//     event.preventDefault();
    
//     let dataURL = canvas.toDataURL();
//     imageInput.value = dataURL;
//     console.log(imageInput);
// }