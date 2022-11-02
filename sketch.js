function setup() {
    createCanvas(650, 600);
    colorMode(HSB);

    initMenu();
}

function draw() {
    switch (state) {
        case STATE.MENU:
            drawMenu();
            break;
        default:
            background(0, 100, 100);
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
var opts, img;

function initMenu() {
    opts = ({});
    state = STATE.MENU;
    img = loadImage("bg.jpg");

    const labels = ["Mode", "Difficulty", "# Rounds"];
    const modes = Object.values(STATE).filter(v => v !== STATE.MENU);
    opts.dropdowns = [
        createDropdown(labels[0], [110, 300], modes),
        createDropdown(labels[1], [250, 300], ["Easy", "Medium", "Hard"]),
        createDropdown(labels[2], [400, 300], ["2", "4", "6"]),
    ];

    const btn = createButton("Start");
    btn.position(255, 370);
    btn.size(100, 50);
    btn.style("background", color(25, 23, 200, 50));
    btn.mousePressed(function () {
        const [mode, diff, rounds] = labels.map(k => opts[k]);
        if (mode && diff && rounds)
            setState(mode);
    });
    opts.start = btn;
}

function drawMenu() {
    background(img);

    fill("pink");
    stroke("black");
    strokeWeight(8);

    textSize(60);
    textFont("Georgia");
    textStyle(BOLD);
    textAlign(CENTER);
    text("Wonder Kids", 325, 180);
}

function createDropdown(id, pos, entries) {
    const text = `Select ${id}`;

    sel = createSelect();
    sel.position(pos[0], pos[1]);
    sel.style("background", color(25, 23, 200, 50));
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
