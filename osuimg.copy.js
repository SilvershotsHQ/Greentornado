import fs from "fs";
import Canvas from "canvas";
import GIFEncoder from "gifencoder";
// https://stackoverflow.com/questions/29751340/how-to-print-always-4-digits-on-javascript
function padNumber(number) {
    number = number.toString();
    while (number.length < 4) {
        number = "0" + number;
    }
    return number;
}
// ... see docs/Modules:Components - typical usage = api.<component>.<function>();
// most functions return Promise objects.
async function main() {
    // eg: get beatmap data
    const canvas = Canvas.createCanvas(960, 540);
    const ctx = canvas.getContext('2d');
    const canvasbg = Canvas.createCanvas(960, 540);
    const ctxbg = canvasbg.getContext('2d');
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.fillStyle = "rgba(255, 255, 0, .5)";
    // Select the font size and type from one of the natively available fonts
    ctx.font = '40px sans-serif';
    // Select the style that will be used to fill the text in
    ctx.fillStyle = '#ffffff';
    // Actually fill the text with a solid color
    ctx.textAlign = "left";
    ctx.fillText(`AAGaming`, canvas.width / 5, canvas.height / 6);
    const flag = await Canvas.loadImage(`https://osu.ppy.sh/images/flags/US.png`);
    ctx.drawImage(flag, canvas.width / 5, canvas.height / 5, flag.width, flag.height);
    ctx.textAlign = "right";
    ctx.fillText(`Rank: 1736185`, canvas.width / 1.1, canvas.height / 6);
    ctx.fillText(`Points: 82`, canvas.width / 1.1, canvas.height / 4);
    ctx.textAlign = "center";
    ctx.fillText(`17`, canvas.width / 1.155, canvas.height / 2.222);
    ctx.font = '30px sans-serif';
    ctx.fillText(`23%`, canvas.width / 1.3, canvas.height / 2.26);
    const lvl = await Canvas.loadImage("./Artboard 1.png");
    ctx.drawImage(lvl, canvas.width / 1.22, canvas.height / 3, lvl.width, lvl.height);
    // // Pick up the pen
    // ctx.beginPath();
    // // Start the arc to form a circle
    // ctx.arc(canvas.width / 2.04, canvas.height / 2.8, 70, 0, Math.PI * 2, true);
    // // Put the pen down
    // ctx.closePath();
    // // Clip off the region you drew on
    // ctx.clip();
    // rectWidth = 630 * percent / 100 (in this case 100%)
    var rectX = canvas.width / 2.5;
    var rectY = canvas.height / 2.45;
    var rectWidth = 315 * 100 / 100;
    var rectHeight = 19;
    var cornerRadius = 20;
    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;
    ctx.strokeStyle = '#1C1719';
    ctx.fillStyle = '#1C1719';
    ctx.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
    ctx.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
    // rectWidth = 630 * percent / 100 (in this case 100%)
    // rectX = canvas.width / 2.5;
    // rectY = canvas.height / 2.45;
    // rectWidth = 315 * 23 / 100;
    // rectHeight = 19;
    // cornerRadius = 20;
    // ctx.lineJoin = "round";
    // ctx.lineWidth = cornerRadius;
    // ctx.strokeStyle = '#FF66AB';
    // ctx.fillStyle = '#FF66AB';
    // ctx.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
    // ctx.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
    let avatar;
    try {
        avatar = await Canvas.loadImage("https://a.ppy.sh");
    }
    catch (e) {
        avatar = await Canvas.loadImage(`https://a.ppy.sh/?${Date.now()}`);
    }
    ;
    ctx.drawImage(avatar, canvas.width / 50, canvas.height / 15, 150, 150);
    //await fs.unlink('output.gif', () => {});
    rectX = canvasbg.width / 2.5;
    rectY = canvasbg.height / 2.45;
    rectWidth = 0;
    rectHeight = 19;
    cornerRadius = 20;
    ctxbg.lineJoin = "round";
    ctxbg.lineWidth = cornerRadius;
    ctxbg.strokeStyle = '#FF66AB';
    ctxbg.fillStyle = '#FF66AB';
    var thing = 0;
    var can = [];
    ctxbg.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    for (let index = 0; index <= 50; index++) {
        thing = index / 50;
        rectWidth = 315 * 23 * index / 50 / 100;
        //ctxbg.lineWidth = cornerRadius * thing;
        ctxbg.strokeRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
        ctxbg.fillRect(rectX + (cornerRadius / 2), rectY + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
        var img = await ctxbg.getImageData(0, 0, canvasbg.width, canvasbg.height).data;
        can.push(img);
        this.client.logger.log('info', rectWidth);
    }
    const encoder = new GIFEncoder(960, 540);
    encoder.createReadStream().pipe(fs.createWriteStream('output.gif'));
    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(1); // frame delay in ms
    encoder.setFrameRate(30);
    encoder.setQuality(30); // image quality. 10 is default.
    for (let indexx = 0; indexx < can.length; indexx++) {
        encoder.addFrame(can[indexx]);
        this.client.logger.log('info', indexx);
    }
    encoder.finish();
}
main();
