
class Food {

	constructor(size, canvasWidth, canvasHeight)
	{
		this.size = size;
		this.pos = {x: randomNum(canvasWidth - size), y: randomNum(canvasHeight - size)};
	}

	draw() {
		ctx.fillStyle = "brown";
		ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
	}
}