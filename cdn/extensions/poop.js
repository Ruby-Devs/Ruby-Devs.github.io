function getRandomHexColor() {
    var red = Math.floor(Math.random() * 256);var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);var redHex = red.toString(16).padStart(2, '0');
    var greenHex = green.toString(16).padStart(2, '0');var blueHex = blue.toString(16).padStart(2, '0');
    var hexColor = '#' + redHex + greenHex + blueHex;return hexColor;
  }

class ddedePoopExtension {
    getInfo() {
        return {
            id: 'poopextensionruby',
            name: 'Poop Extension',
            color1: getRandomHexColor(),
            color2: getRandomHexColor(),
            color3: getRandomHexColor(),
            blocks: [
                {
                    opcode: 'poopyReporter',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'poop'
                }
            ]
        };
    }

    poopyReporter() {
        return '💩';
    }
}

Scratch.extensions.register(new ddedePoopExtension());
