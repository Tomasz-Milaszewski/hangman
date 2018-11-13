function drawGallows() {
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(20, 180);
    ctx.lineTo(40, 160);
    ctx.lineTo(60, 180);
    ctx.moveTo(40, 160);
    ctx.lineTo(40, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 50);
    ctx.moveTo(40, 40);
    ctx.lineTo(60, 20)
    ctx.stroke();
}
drawGallows();