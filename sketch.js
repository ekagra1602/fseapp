const STATE = {
    MENU: "Menu",
    DIRECTION: "Direction",
    COLOR: "Color",
    TYPING: "Typing",
};

let opts, state;

function setup() {
    opts = ({});
    state = STATE.MENU;

    createCanvas(800, 900);
    colorMode(HSB);

    const modes = Object.values(STATE).filter(v => v !== STATE.MENU);
    createDropdown('Mode', [100, 100], modes);
    createDropdown('Difficulty', [235, 100], ['Easy', 'Medium', 'Hard']);
    createDropdown('No. of Rounds', [390, 100], ['2', '4', '6']);
}

function draw() {
    switch (state) {
        case STATE.MENU:
            background(190, 204, 100);
        default:
            console.error(`unhandled state '${state}'`);
    }
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
