

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;


let blobs = [];
let foods = [];
let curr_day = -1;
let max_days = 10;
let food_count = 80;
let speed = 0.1
let blob_size = 20;
let blob_count = 50;
let full_energy = 12;

let daynight = false;


function dst(obj1, obj2) {
	return Math.sqrt((obj1.pos.x - obj2.pos.x) ** 2 + (obj1.pos.y - obj2.pos.y) ** 2);
}

function randomNum(max) {
	return Math.floor(Math.random() * max);
}

function generate_food(count) {
	foods = [];
	for (let i = 0; i < count; i++)
	{
		foods.push(new Food(10, canvas.width, canvas.height));
	}
}

function random_option(list) {
	return list[randomNum(list.length)];
}

function generate_first_gen(count) {
	blobs = [];
	for (let i = 0; i < count; i++) {
		blobs.push(new Blob(blob_size, speed, 12, canvas.width/2, canvas.height/2));//random_option([0-blob_size, canvas.width]), random_option([0-blob_size, canvas.height])));
	}
}

function advance_day() {
	if (!daynight) {
		generate_food(food_count);
		curr_day++;
		daynight = true;
		blobs.forEach(blob => {
			if (blob.food_eaten == 0)
			{
				blobs.splice(blobs.indexOf(blob), 1);
			} 
			else {
				blob.reset();
			}
		});
	}
}

function tick() {
	//update

	blobs.forEach(blob => {
		if (daynight) {
			blob.update();
			if (blob.energy <= 0) {
				daynight = false;
			}
		}
	});

	// draw
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	if (!daynight) {
		ctx.fillStyle = "#3b3d65";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	blobs.forEach(obj => {
		obj.draw();
	});

	foods.forEach(obj => {
		obj.draw();
	});

	ctx.font = '50px serif';
	ctx.fillStyle = "black";
	ctx.fillText(curr_day, 50, 90);
}

generate_first_gen(blob_count);

advance_day();

let game_loop = setInterval(tick, 10);