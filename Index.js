const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 576
canvas.height = 1024

const background = new Image();
background.src = "Assets/MenuScreen.png"
background.onload = function(){
c.drawImage(background,0,0);   
}