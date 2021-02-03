
class Blob {

	constructor(size, speed, range, x, y) {
		this.size = size;
		this.energy = full_energy;
		this.pos = {x: x, y: y};
		this.start_pos = {x: x, y: y};
		this.food_eaten = 0;
		this.range = range;
		this.speed = speed;
		this.dir = {x: 0, y: 0};
	}

	closest(list) {
		let close_obj = {
			pos: {x: -this.pos.x, y: -this.pos.y}
		};
		list.forEach(obj => {
			if (obj != this && (dst(this, obj) < dst(this, close_obj)))
			{
				close_obj = obj;
			}
		});
		return close_obj;
	}

	step() {
		this.pos.x -= this.dir.x * speed;
		this.pos.y -= this.dir.y * speed;
		this.energy -= 0.01;
	}

	update() {
		if (this.energy > 0) {
			// if not ready to mate, if needs to find more food.
			if (this.food_eaten < 2) {
				let nearest_food = this.closest(foods);
				// change the direction towards the nearest 
				this.dir = {x: (nearest_food.pos.x - this.pos.x) / (nearest_food.pos.x - this.pos.x), y: (this.pos.y - nearest_food.pos.y) / (this.pos.y - nearest_food.pos.y)};
				//alert((this.pos.y - nearest_food.pos.y) / (this.pos.y - nearest_food.pos.y));
			}
			else {

			}

			this.step();
		}
	}

	reset() {
		this.pos = this.start_pos;
		this.energy = full_energy;
		this.food_eaten = 0;
	}

	draw() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
	}
}