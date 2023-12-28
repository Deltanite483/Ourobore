import React, { useState, Component } from "react";
import { Tools } from "./UpperToolbar/Tools";
import { Initialise } from "./SBinit";

import { Universal } from "./UniversalSet";
import { Manager } from "./DSs/Manager";



// class Game extends Component {
//   componentDidMount() {
//     // create a new Phaser game instance
//     const game = new Phaser.Game({
//       type: Phaser.AUTO,
//       parent: 'background',
//       width: '100%',
//       height: "100%",
//       scene: [DraggableSquareScene]
//     });
//   }

//   render() {
//     return null;
//   }
// }


export const SandboxMain = () => {
  const [GreenSignal, setGreenSignal] = useState(false);
  const onGreenSignal = () => {
    setGreenSignal(true);
    console.log("Sandbox area: Ready");
  };

  const [UniversalArrAPI, setUniversalArrAPI] = useState(null);

  const [BrushDrop, setBrushDrop] = useState(null)

  return (
    <>
      <Tools BrushDrop = {BrushDrop}/>
      <Manager setBrushDrop = {setBrushDrop}></Manager>

      {/* <Initialise GreenSignal={onGreenSignal}>
      </Initialise> */}
      {/* {GreenSignal && <Game></Game> } */}
      {/* <Universal setUniversalArrAPI = {setUniversalArrAPI}></Universal> */}
    </>
  );
};
