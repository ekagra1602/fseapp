function setup() {
    createCanvas(800, 480);
    colorMode(HSB);

    initMenu();
}

function draw() {
    switch (state) {
        case STATE.MENU:
            drawMenu();
            break;
        default:
            background(0, 255, 255);
            throw new Error(`unhandled state "${state}"`);
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
    if (state === STATE.MENU)
        [opts.start, ...opts.dropdowns].map(el => el.remove());
    
    if (newState == STATE.MENU)
        initMenu();

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
        createDropdown("Mode", [200, 200], modes),
        createDropdown("Difficulty", [350, 200], ["Easy", "Medium", "Hard"]),
        createDropdown("# Rounds", [520, 200], ["2", "4", "6"]),
    ];

    const btn = createButton("Start");
    btn.position(350, 330);
    btn.size(100, 50);
    btn.mousePressed(function () {
        const [mode, difficulty, rounds] = [opts["Mode"], opts["Difficulty"], opts["# Rounds"]];
        if (mode && difficulty && rounds)
            setState(mode);
    });
    opts.start = btn;
}

function drawMenu() {
    background(190, 100, 100);

    fill(0, 0, 0);
    textSize(52);
    textAlign(CENTER);
    text("fseapp", 400, 100);
}

function createDropdown(id, pos, entries) {
    const text = `Select ${id}`;

    sel = createSelect();
    sel.position(pos[0], pos[1]);
    sel.changed(function () {
        const val = this.value();
        opts[id] = val === text ? undefined : val;
        console.log(`dropdown '${id}' set to '${val}'`);
    });

    for (const entry of [text, ...entries]) {
        sel.option(entry);
    }

    return sel;
}
// #endregion
