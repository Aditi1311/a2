const div = document.getElementById('score');
const cnvs = document.getElementById('cnvs');
const ctx = cnvs.getContext('2d');
const snk = new Snake();
const f = new Food();
let score = 0

ctx.scale(25, 25);

function main() {
	ctx.clearRect(0, 0, cnvs.width, cnvs.height);

    f.eatFood();
	snk.move();
	snk.disp();
	f.disp();
	snk.endGame();
}
setInterval(main, 120);

function Snake() {
	this.x = [Math.round(Math.random() * 15)];
	this.y = [Math.round(Math.random() * 15)];

	this.xv = 0;
	this.yv = 0;

	
	this.head = new Image();
	this.body = new Image();
	this.body.src = 'image/body.png';

	this.disp = function() {
		this.head.src = 'image/head' + this.xv + this.yv + '.png';
		for (let i = 1; i < this.x.length; i++) {
			ctx.drawImage(this.body, this.x[i], this.y[i], 1, 1);
		}
		ctx.drawImage(this.head, this.x[0], this.y[0], 1, 1);
	}

	
	this.move = function() {
		if (this.x.length <= 1) {} else {
			for (let i = this.x.length - 1; i > 0; i--) {
				this.x[i] = this.x[i - 1];
				this.y[i] = this.y[i - 1];
			}
		}
		this.x[0] += this.xv;
		this.y[0] += this.yv;
	}

	
	this.endGame = function() {
		if (this.x[0] < 0 || this.x[0] > 15 || this.y[0] < 0 || this.y[0] > 15) {
			alert('YOU LOSE!!');
			alert('you managed to get ' + score + ' point(s)');
			location.reload();
		} 

		for (let i = 1; i < this.x.length; i++) {
			if (this.x[0] == this.x[i] && this.y[0] == this.y[i]){
				alert('YOU LOSE!!');
				alert('you managed to get ' + score + ' point(s)');
				location.reload();
			}
		} 
	}
}


function Food() {
	this.x = Math.round(Math.random() * 15);
	this.y = Math.round(Math.random() * 15);

	this.img = new Image();
	this.img.src = 'image/food.png';
	this.disp = function() {
		ctx.drawImage(this.img, this.x, this.y, 1, 1);
	}

	
	this.eatFood = function() {
		if (snk.x[0] == this.x && snk.y[0] == this.y) {
			this.x = Math.round(Math.random() * 15);
			this.y = Math.round(Math.random() * 15);
			score++;
			snk.x.push(0);
			snk.y.push(0);
		}
		div.innerHTML = score;
	}
}




document.addEventListener('keydown', keyPush);
function keyPush(evt) {
	if (evt.keyCode == 37 && snk.xv != 1) {
		snk.xv = -1;
		snk.yv = 0;
	} else if (evt.keyCode == 38 && snk.yv != 1) {
		snk.xv = 0;
		snk.yv = -1;	
	} else if (evt.keyCode == 39 && snk.xv != -1) {
		snk.xv = 1;
		snk.yv = 0;
	} else if (evt.keyCode == 40 && snk.yv != -1) {
		snk.xv = 0;
		snk.yv = 1;
	}
}