const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player, cursors, spear, spearLength = 50, ground;

function preload() {
    this.load.on('complete', () => console.log('Assets loaded!'));
    this.load.image('ground', 'path/to/platform.png');
    this.load.image('player', 'path/to/player.png');
    this.load.image('spear', 'path/to/spear.png');
}

function create() {
    this.add.image(400, 300, 'ground');
    
    // Add a static ground
    ground = this.physics.add.staticGroup();
    ground.create(400, 580, 'ground').setScale(2).refreshBody();

    // Player setup
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);

    // Enable collision with ground
    this.physics.add.collider(player, ground);

    // Spear setup
    spear = this.add.rectangle(player.x + 30, player.y, spearLength, 10, 0xff0000);
    this.physics.world.enable(spear);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    
    spear.x = player.x + 30;
    spear.y = player.y;
}

function increaseSpearLength() {
    spearLength += 20;
    spear.width = spearLength;
}
