import Phaser from "phaser";

class DraggableSquareScene extends Phaser.Scene {
  create() {
    // add 5 squares at different positions on the screen
    // this.addSquare(100, 100);
    // this.addSquare(200, 200);
    // this.addSquare(300, 300);
    // this.addSquare(400, 400);
    // this.addSquare(500, 500);
  }
  

  addSquare(x, y) {
    // create a square graphics object
    const square = this.add.graphics();
  
    // create a gradient effect by interpolating between two colors
    const color1 = Phaser.Display.Color.HexStringToColor('#00d2ff');
    
    // fill the square with a solid color
    square.fillStyle(0x00d2ff);
    square.fillRoundedRect(x - 16, y - 16, 32, 32, 2);
  
    // make the image interactive and draggable
    square.setInteractive();
    this.input.setDraggable(square);
  
    // add drag events to the image
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      square.x = dragX;
      square.y = dragY;
    });
  }

}

export default DraggableSquareScene;
