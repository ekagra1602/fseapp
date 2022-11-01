function setup() {
    createCanvas(400, 900);

    textAlign(CENTER);
    background(190, 204, 100);
    sel = createSelect();
    sel.position(100, 100);
    sel.option('Select Mode');
    sel.option('Direction');
    sel.option('Colour');
    sel.option('Typing');
    sel.changed(mySelectEvent);

    textAlign(CENTER);
    background(190, 204, 100);
    sel = createSelect();
    sel.position(200, 100);
    sel.option('Select Difficulty');
    sel.option('Easy');
    sel.option('Medium');
    sel.option('Hard');
    sel.changed(mySelectEvent);

    textAlign(CENTER);
    background(190, 204, 100);
    sel = createSelect();
    sel.position(300, 100);
    sel.option('Select No. of Rounds');
    sel.option('2');
    sel.option('4');
    sel.option('6');
    sel.changed(mySelectEvent);
}

function draw() {
    colorMode(HSB);
    background(190, 204, 100);
}

function mySelectEvent() {
    let item = sel.value();
    background(190, 204, 100);
    text('It is a ' + item + '!', 50, 50);
}
