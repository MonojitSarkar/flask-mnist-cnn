const canvas = document.querySelector('.myCanvas');
const width = canvas.width;
const height = canvas.height;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

const upload = document.getElementById('upload');
const clearBtn = document.getElementById('button');
const imageInput = document.getElementById('imageInput');
const submitBtn = document.getElementById('submitID');
const form = document.querySelector('form');

let curX;
let curY;
let pressed = false;

canvas.addEventListener('mousedown', function(event){
    pressed = true;
});

canvas.addEventListener('mouseup', function(event){
    pressed = false;
});

canvas.addEventListener('mousemove', draw);

function draw(event){
    if (pressed) {
        curX = event.clientX - canvas.offsetLeft;
        curY = event.clientY - canvas.offsetTop;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(curX, curY, 5, 50, 100, false);
        ctx.fill();
    }
    requestAnimationFrame(draw);
};

clearBtn.addEventListener('click', function(){
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
});

submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log('Submit clicked');
    form.submit();
});

// document.querySelector('form').addEventListener('submit', function(event){
//     console.log('Submit Clicked');
//     form.submit();
//     event.preventDefault();
// });
        