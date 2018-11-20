function drawGallows() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'rgb(141, 93, 12)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(20, 180);
    ctx.lineTo(40, 160);
    ctx.lineTo(60, 180);
    ctx.moveTo(40, 160);
    ctx.lineTo(40, 20);
    ctx.lineTo(120, 20);
    ctx.moveTo(40, 40);
    ctx.lineTo(60, 20)
    ctx.stroke();

    ctx.lineCap = 'butt';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.lineTo(120, 48);
    ctx.stroke();
}
drawGallows();