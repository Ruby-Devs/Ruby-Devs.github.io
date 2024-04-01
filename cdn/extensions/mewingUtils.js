class mewingUtilsExtension {
    mewingJawline = 0;

    getInfo() {
        return {
            id: 'mewextensionruby',
            name: 'Mewing Utils',
            color1: '#ebb134',
            blocks: [
                {
                    opcode: 'mew',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'start mewing'
                },
                {
                    opcode: 'jawlinePerfection',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'jawline perfection'
                }
            ]
        };
    }

    mew() {
        window.alert('🤫🤫🤫🤫');
        window.alert('🧏‍♂️🧏‍♂️🧏‍♂️🧏‍♂️');
        this.mewingJawline =+ 1;
    }

    jawlinePerfection() {
        return this.mewingJawline + '%';
    }
}

Scratch.extensions.register(new mewingUtilsExtension());
