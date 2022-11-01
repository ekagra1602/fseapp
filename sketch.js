function setup() {
    createCanvas(800, 900);
    colorMode(HSB);

    initMenu();
}

function draw() {
    switch (state) {
        case STATE.MENU:
            drawMenu();
            break;
        default:
            console.error(`unhandled state '${state}'`);
    }
}

// #region state management
var state;

const STATE = {
    MENU: "Menu",
    DIRECTION: "Direction",
    COLOR: "Color",
    TYPING: "Typing",
};

function setState(newState) {
    if (state === STATE.MENU) {
        opts.dropdowns.map(el => el.remove());
        initMenu();
    }

    state = newState;
}
// #endregion

// #region menu
var opts;

function initMenu() {
    opts = ({});
    state = STATE.MENU;

    const modes = Object.values(STATE).filter(v => v !== STATE.MENU);
    opts.dropdowns = [
        createDropdown('Mode', [100, 100], modes),
        createDropdown('Difficulty', [235, 100], ['Easy', 'Medium', 'Hard']),
        createDropdown('No. of Rounds', [390, 100], ['2', '4', '6']),
    ];
}

function drawMenu() {
    background(190, 204, 100);
}

function createDropdown(id, pos, opts) {
    const text = opts[id] = `Select ${id}`;
    textAlign(CENTER);

    sel = createSelect();
    sel.position(pos[0], pos[1]);
    sel.changed(function () {
        const val = this.value();
        opts[id] = val === text ? null : val;
        console.log(`dropdown '${id}' set to '${val}'`);
    });

    for (const opt of [text, ...opts]) {
        sel.option(opt);
    }

    return sel;
}
// #endregion
