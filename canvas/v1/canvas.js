
const canvas = document.querySelector('canvas#canvas');
const context = canvas.getContext('2d');
const pen = new Pen();
var focal = new Vec(0, 0, 400);
var ground = new Area(new Vec(-1300, 100, -100), 50);
var sky = new Area(new Vec(-1300, -500, -100), 50);
var player = new Cube(new Vec(0, 50, 0));
var builds = [];

startGameLoop();

function startGameLoop() {
    this.run = function () {
        updateScreen();
        tick();
        setTimeout(this.run, 20);
    };
    this.run();
}

function tick() {
    
}

function updateScreen() {
    // clear canvas and ready
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    focal.x = canvas.width / 2;
    focal.y = canvas.height / 2;

    // draw all strokes
    pen.draw(ground, focal, player.pos.y == 50 ? '#1dbf06' : '#199107', '1');
    pen.draw(sky, focal, player.pos.y > -1000 ? '#88D8E8' : '#FF0000', '1');
    pen.draw(player, focal, '#FFFFFF', '3');

    for (var i = 0; i < builds.length; i++) {
        pen.drawAbs(builds[i], 'red', '2');
    }

    var coords = player.pos.add(25, 25, 50).project(focal);
    var text = '(' + player.pos.x + ', ' + player.pos.y + ', ' + player.pos.z + ')';
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(text, coords.x, coords.y);
}

document.addEventListener('keypress', function (e) {
    var delta = 100;

    if (e.key == 'w') {
        player.pos.z += delta;
    }
    else if (e.key == 'a') {
        player.pos.x -= delta;
    }
    else if (e.key == 's') {
        player.pos.z -= delta;
    }
    else if (e.key == 'd') {
        player.pos.x += delta;
    }
    else if (e.key == 'e' && player.pos.y > -1050) {
        player.pos.y -= delta;
    }
    else if (e.key == 'q' && player.pos.y != 50) {
        player.pos.y += delta;
    }
    else if (e.key == 'b') {
        builds.push(new Cube(player.pos.add(0, 0, 0)));
    }
    else if (e.key == 'r') {
        builds.splice(0, builds.length);
    }
    else if (e.key == 'z') {
        builds.pop();
    }
});

// render

function Pen() {
    this.line = function (x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    };
    this.draw = function (shape, focal, color, width) {
        context.strokeStyle = color;
        context.lineWidth = width;

        for (var i = 0; i < shape.edges.length; i++) {
            var edge = shape.edges[i];
            var vertex1 = shape.vertices[edge.x].addVec(shape.pos).project(focal);
            var vertex2 = shape.vertices[edge.y].addVec(shape.pos).project(focal);
            this.line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
        }
    };
    this.drawAbs = function (shape, color, width) {
        context.strokeStyle = color;
        context.lineWidth = width;

        for (var i = 0; i < shape.edges.length; i++) {
            var edge = shape.edges[i];
            var vertex1 = shape.vertices[edge.x].add(0, 50, 0).project(focal);
            var vertex2 = shape.vertices[edge.y].add(0, 50, 0).project(focal);
            this.line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
        }
    };
}

function Vec(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.project = function (focal) {
        var px = (this.x * focal.z) / (this.z + focal.z) + focal.x; 
        var py = (this.y * focal.z) / (this.z + focal.z) + focal.y; 
        return new Vec(px, py, 0);
    };
    this.add = function (x, y, z) {
        return new Vec(this.x + x, this.y + y, this.z + z);
    };
    this.addVec = function (vec) {
        return new Vec(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    };
}

// shape

function Cube(pos) {
    var s = 100;

    this.pos = pos;
    this.vertices = [
        pos.add(0, 0, 0),
        pos.add(s, 0, 0),
        pos.add(s, 0, s),
        pos.add(0, 0, s),
        pos.add(0, s, 0),
        pos.add(s, s, 0),
        pos.add(s, s, s),
        pos.add(0, s, s),
    ];
    this.edges = [
        new Vec(0, 1, 0),
        new Vec(1, 2, 0),
        new Vec(2, 3, 0),
        new Vec(3, 0, 0),
        new Vec(4, 5, 0),
        new Vec(5, 6, 0),
        new Vec(6, 7, 0),
        new Vec(7, 4, 0),
        new Vec(0, 4, 0),
        new Vec(1, 5, 0),
        new Vec(2, 6, 0),
        new Vec(3, 7, 0),
    ];
}

function Area(pos, length) {
    this.pos = pos;
    this.length = length;
    this.vertices = [];
    this.edges = [];

    for (var i = 0; i < length; i++) {
        this.vertices.push(pos.add(i * 100, 0, 0));
        this.vertices.push(pos.add(i * 100, 0, length * 100));
        this.edges.push(new Vec(this.vertices.length - 2, this.vertices.length - 1, 0));

        this.vertices.push(pos.add(0, 0, i * 100));
        this.vertices.push(pos.add(length * 100, 0, i * 100));
        this.edges.push(new Vec(this.vertices.length - 2, this.vertices.length - 1, 0));
    }
}

// entities






