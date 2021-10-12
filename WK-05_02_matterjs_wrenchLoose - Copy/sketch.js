// Benedikt Groß

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let ground;
let wall01;
let wall02;
let bridge;

let compositeConstruction;

let rect01;
let rect02;
let rect03;
let rect04;
let rect05;
let rect06;
let rect07;
let circ01;


let constraint01;
let constraint02;
let constraint03;
let constraint04;
let constraint05;
let constraint06;
let constraint07;



let wheelbase;
let wheelAOffset;
let wheelYOffest;

let group1;

let canvas;

function setup() {
  canvas = createCanvas(800, 800);

  // create an engine
  engine = Engine.create();
  engine.world.gravity.scale = 0.0005;


  group1 = Body.nextGroup(true);

  compositeConstruction = Composite.create();

  // frame
  rect01 = Bodies.rectangle(300, 200, 200, 200, {
    collisionFilter: {
      group: group1
    },
    density: 0.0002
  });

  // coils
  rect02 = Bodies.rectangle(325, 225, 150, 65, {
    collisionFilter: {
      group: group1
    },
    chamfer: {
      radius: 10
    },
    density: 0.0002
  });

  // coils
  rect03 = Bodies.rectangle(325, 310, 150, 65, {
    collisionFilter: {
      group: group1
    },
    chamfer: {
      radius: 10
    },
    density: 0.08
  });

  // circle
circ01 = Bodies.circle(500, 200, 30, {
    collisionFilter: {
      group: group1
    },
    friction: 0.8
  });

  // clamp
rect04 = Bodies.rectangle(300, 125, 25, 75, {
    // isStatic: true,
    collisionFilter: {
      group: group1
    },
    density: 0.08
  });

  // CLAMP
  rect05 = Bodies.rectangle(275, 125, 75, 25, {
    collisionFilter: {
      group: group1
    },
    friction: 0.08
  });

  // needle
    rect06 = Bodies.rectangle(100, 200, 200, 25, {
    collisionFilter: {
      group: group1
    },
    density: 0.08
  });

  // handle
      rect07 = Bodies.rectangle(125, 180, 150, 65, {
    collisionFilter: {
      group: group1
    },
    chamfer: {
      radius: 10
    },
    density: 0.08
  });



// Ties coil with rect01
  constraint01 = Constraint.create({
    bodyA: rect01,
    // pointA: offsetA,
    pointA: { x: 0, y: -40 },
    bodyB: rect02,
    pointB: { x: 0, y: 0 },
    stiffness: 1,
    length: 0
  });

  // Ties coil to rect01
    constraint02 = Constraint.create({
      bodyA: rect01,
      // pointA: offsetA,
      pointA: { x: 0, y: 40 },
      bodyB: rect03,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0
    });

    //ties circle to rect01
    constraint03 = Constraint.create({
      bodyA: rect01,
      // pointA: offsetA,
      pointA: { x: 100, y: -100 },
      bodyB: circ01,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0
    });

    //ties calmp to rect01
    constraint04 = Constraint.create({
      bodyA: rect01,
      // pointA: offsetA,
      pointA: { x: -100, y: -100 },
      bodyB: rect04,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0
    });

    //ties calmp to rect01
    constraint05 = Constraint.create({
      bodyA: rect01,
      // pointA: offsetA,
      pointA: { x: -100, y: -100 },
      bodyB: rect05,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0
    });

    //ties needle to rect01
    constraint06 = Constraint.create({
      bodyA: rect01,
      // pointA: offsetA,
      pointA: { x: -100, y: -90 },
      bodyB: rect06,
      pointB: { x: -100, y: 0 },
      stiffness: 1,
      length: 10
    });

    //ties needle to rect01
    constraint07 = Constraint.create({
      bodyA: rect06,
      // pointA: offsetA,
      pointA: { x: 0, y: 0 },
      bodyB: rect07,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 10
    });


  Composite.add(compositeConstruction, [rect01, rect02, rect03, rect04, rect05, rect06, rect07, circ01, constraint01, constraint02, constraint03, constraint04, constraint05, constraint06, constraint07]);

  World.add(engine.world, [compositeConstruction]);



  wall01 = Bodies.rectangle(-250, 0, 500, height * 50, {isStatic: true});
  wall02 = Bodies.rectangle(width+1000, 0, 1000, height * 50, {isStatic: true});

  World.add(engine.world, [wall01, wall02])

  ground = Bodies.rectangle(0, height + 50, 1810, 100, {isStatic: true});
  World.add(engine.world, [ground]);

  // setup mouse
  const mouse = Mouse.create(canvas.elt);
  const mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(255);

  noStroke();
  noFill();

  fill(0);
  drawVertices(rect01.vertices);
  fill('white');
  drawVertices(rect02.vertices);
  fill('white');
  drawVertices(rect03.vertices);
  fill(0);
  drawVertices(rect04.vertices);
   fill(0);
   drawVertices(rect05.vertices);
  fill(0);
  drawVertices(rect06.vertices);
   fill(0);
   drawVertices(rect07.vertices);
   fill(0);
   drawVertices(circ01.vertices);

  stroke(128);
  strokeWeight(2);

  noStroke();
  fill(128);
  drawVertices(ground.vertices);
  drawVertices(wall01.vertices);
  drawVertices(wall02.vertices);

  drawMouse(mouseConstraint);
}



//did not touch



// )
function drawConstraints(constraints) {
  for (let i = 0; i < constraints.length; i++) {
    drawConstraint(constraints[i]);
  }
}

function drawBodies(bodies) {
  for (let i = 0; i < bodies.length; i++) {
    drawVertices(bodies[i].vertices);
  }
}

function drawConstraint(constraint) {
  const offsetA = constraint.pointA;
  let posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  const offsetB = constraint.pointB;
  let posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}

function drawMouse(mouseConstraint) {
  if (mouseConstraint.body) {
    const pos = mouseConstraint.body.position;
    const offset = mouseConstraint.constraint.pointB;
    const m = mouseConstraint.mouse.position;
    stroke(0, 255, 0);
    strokeWeight(2);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
}

function drawVertices(vertices) {
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
