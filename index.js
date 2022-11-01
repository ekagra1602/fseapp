let opts = {};

function setup() {
    createCanvas(800, 900);

    createDropdown('Mode', [100, 100], ['Direction', 'Colour', 'Typing']);
    createDropdown('Difficulty', [235, 100], ['Easy', 'Medium', 'Hard']);
    createDropdown('No. of Rounds', [390, 100], ['2', '4', '6']);
}

function createDropdown(id, pos, opts) {
    const text = opts[id] = `Select ${id}`;
    textAlign(CENTER);

    sel = createSelect();
    sel.position(pos[0], pos[1]);
    sel.changed(function() {
        const val = this.value();
        opts[id] = val === text ? null : val;
        console.log(`dropdown '${id}' set to '${val}'`);
    });
    
    for (const opt of [text, ...opts]) {
        sel.option(opt);
    }
}

function draw() {
    colorMode(HSB);
    background(190, 204, 100);
}
