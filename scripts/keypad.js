// Original CHIP-8 hex keypad layout:

//  ---+---+---+---
// | 1 | 2 | 3 | C |
// |---+---+---+---|
// | 4 | 5 | 6 | D |
// |---+---+---+---|
// | 7 | 8 | 9 | E |
// |---+---+---+---|
// | A | 0 | B | F |
//  ---+---+---+---

// QWERTY keyboard mapping:

class Keypad {
    constructor() {
        this.KEYMAP = {
            49: 0x1, // 1 = 1
            50: 0x2, // 2 = 2
            51: 0x3, // 3 = 3
            52: 0xc, // 4 = C
            81: 0x4, // Q = 4
            87: 0x5, // W = 5
            69: 0x6, // E = 6
            82: 0xd, // R = D
            65: 0x7, // A = 7
            83: 0x8, // S = 8
            68: 0x9, // D = 9
            70: 0xe, // F = E
            90: 0xa, // Z = A
            88: 0x0, // X = 0
            67: 0xb, // C = B
            86: 0xf, // V = F
        };

        // Track pressed keys in an object
        this.pressedKeys = {};

        for (code in this.KEYMAP) {
            this.pressedKeys[code] = false;
        }

        // Will be initialized as function outside the class
        this.onNextKeyPress = null;

        // When methods are called as event handlers, `this` may lose context; bind
        // them to the current instance to retain reference to this instance
        // Methods will be called by the global window object
        addEventListener('keydown', this.onKeyDown.bind(this));
        addEventListener('keyup', this.onKeyUp.bind(this));

        // Note: arrow functions auto-capture context and don't require binding
        // addEventListener('keydown', (e) => this.onKeyDown(e));
        // addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    isPressed(keyCode) {
        return this.keys[keyCode];
    }

    onKeyUp(event) {
        let key = this.KEYMAP[event.key]; // undefined if no match
        if (key) this.pressedKeys[key] = false;
    }

    onKeyDown(event) {
        let key = this.KEYMAP[event.key]; // undefined if no match
        if (key) this.pressedKeys[key] = true;

        // onNextKeypress has been initialized as a function and key not undefined
        if (this.onNextKeyPress !== null && key) {
            // convert hex key to decimal and call the onNextKeyPress function
            this.onNextKeyPress(parseInt(key));

            // reset onNextKeyPress
            this.onNextKeyPress = null;
        }
    }
}

export default Keypad;
