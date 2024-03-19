class Renderer {
    constructor(scale) {
        this.cols = 64;
        this.rows = 32;

        this.scale = scale;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = '#000';

        this.canvas.width = this.cols * this.scale;
        this.canvas.height = this.rows * this.scale;

        // Represents each pixel of the display
        this.display = new Array(this.cols * this.rows);
    }

    setPixel(x, y) {
        x = x % this.cols; // display wrap
        y = y % this.rows; // display wrap

        let index = x + y * this.cols;

        this.display[index] ^= 1; // bitwise XOR

        // Return true if pixel was erased
        return !this.display[index];
    }

    clear() {
        this.display = new Array(this.cols * this.rows);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.display.length; i++) {
            let x = (i % this.cols) * this.scale;
            let y = Math.floor(i / this.cols) * this.scale;

            if (this.display[i])
                this.ctx.fillRect(x, y, this.scale, this.scale);
        }
    }
}

export default Renderer;
