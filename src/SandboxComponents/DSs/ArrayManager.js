import React, { useEffect, useState } from "react";
import { Block, ArrayMaker } from "./Block";
import { Array } from "./Arrays";
import { AnimatePresence } from "framer-motion";

export const ArrayManager = React.forwardRef((props, ref) => {
  const [ArrayStructures, setArrayStructures] = useState([
    {
      type: "Array",
      id: 1,
      coords: { x: 200, y: 300 },
      init: { values: [12, 34], blockIds: [87, 7]},
      length: 10,
      values: [],
      blockIds: [],
      colors: {color1: "#00d2ff", color2: "#3a47d5"},
    },
  ]);

  const [HomelessArrayBlocks, setHomelessArrayBlocks] = useState([
    // {
    //   type: "BlockArr",
    //   id: 1,
    //   coords: { x: 800, y: 200 },
    //   value: null,
    //   colors: { color1: "#00d2ff", color2: "#3a47d5" },
    // },
  ]);

  const [Arraymaker, setArrayMaker] = useState({ hostID: -1, targetID: -1 });

  const [PickedUp, setPickedUp] = useState({ anything: false });

  function UpdateHomelessArrayBlock(props) {
    const attributes = props;

    setHomelessArrayBlocks((prevState) =>
      prevState.map((block) =>
        block.id === props.id
          ? {
              ...block,
              value: attributes.value,
              coords: { x: attributes.coords.x, y: attributes.coords.y },
              colors: {
                color1: attributes.colors.color1,
                color2: attributes.colors.color2,
              },
            }
          : block
      )
    );
  }

  const CreateHomelessArrayBlock = (name, x, y) => {
    var newArrBlo = {
      type: "BlockArr",
      id: Math.floor(Math.random() * 10000),
      coords: { x: x, y: y },
      value: null,
      colors: { color1: "#00d2ff", color2: "#3a47d5" },
    };
    setHomelessArrayBlocks((prevState) => {
      return [...prevState, newArrBlo];
    });
  };

  const RecreateHomelessArrayBlock = (props) => {
    var newArrBlo = {
      type: "BlockArr",
      id: props.id,
      coords: { x: props.coords.x, y: props.coords.y },
      value: props.value,
      colors: { color1: "#00d2ff", color2: "#3a47d5" },
    };

    setHomelessArrayBlocks((prevState) => {
      return [...prevState, newArrBlo];
    });
  };

  const DeleteHomelessArrayBlock = (attributes) => {
    const id = attributes.id;
    if (props.Observing.id === id) {
      props.setObserving({
        type: null,
      });
    }
    // console.log("HEEE")
    setHomelessArrayBlocks((prevState) =>
      prevState.filter((block) => block.id !== id)
    );
  };

  const CreateArray = (props) => {
    setArrayMaker({ hostID: -1, targetID: -1 });
    console.log(props.target);
    var newArr = {
      type: "Array",
      id: Math.floor(Math.random() * 10000),
      coords: { x: props.host.coords.x, y: props.host.coords.y },
      length: 5,
      init: {
        values: [props.host.value, props.target.value],
        blockIds: [props.host.id, props.target.id],
      },
      values: [],
      blockIds: [],
      colors: {color1: "#00d2ff", color2: "#3a47d5"},
    };
    setArrayStructures((prevState) => {
      return [...prevState, newArr];
    });

    DeleteHomelessArrayBlock({ ...props.host });
    DeleteHomelessArrayBlock({ ...props.target });
  };

  const UpdateArray = (props) => {
    // console.log(props.attributes.length)
    setArrayStructures((prevState) =>
      prevState.map((array) =>
        array.id === props.attributes.id
          ? {
              type: "Array",
              id: props.attributes.id,
              coords: {
                x: props.attributes.coords.x,
                y: props.attributes.coords.y,
              },
              length: props.attributes.length,
              values: props.attributes.values,
              blockIds: props.attributes.blockIds,
              colors: props.attributes.colors,
            }
          : array
      )
    );
  };

  const DeleteArray = (attributes) => {
    const id = attributes.id;
    if (props.Observing.id === id) {
      props.setObserving({
        type: null,
      });
    }
    setArrayStructures((prevState) =>
      prevState.filter((block) => block.id !== id)
    );
  };

  React.useImperativeHandle(ref, () => ({
    CreateHomelessArrayBlock,
    UpdateHomelessArrayBlock,
    DeleteHomelessArrayBlock,
    UpdateArray,
    DeleteArray,
  }));

  return (
    <>
      {HomelessArrayBlocks.length > 0 &&HomelessArrayBlocks.map((attributes) => (
        <Block
          key={attributes.id}
          attributes={attributes}
          SendUpdate={UpdateHomelessArrayBlock}
          AllBlocks={HomelessArrayBlocks}
          Arraymaker={Arraymaker}
          setArrayMaker={setArrayMaker}
          setPickedUp={setPickedUp}
          PickedUp={PickedUp}
          setObserving={props.setObserving}
          Maker={Arraymaker}
          createArray={CreateArray}

        ></Block>
      ))}

      <AnimatePresence>
        {Arraymaker.hostID !== -1 && (
          <ArrayMaker Maker={Arraymaker} createArray={CreateArray}></ArrayMaker>
        )}
      </AnimatePresence>

      { ArrayStructures.length > 0 && ArrayStructures.map((attributes) => (
        <Array
          key={attributes.id}
          attributes={attributes}
          setPickedUp={setPickedUp}
          PickedUp={PickedUp}
          SendUpdate={UpdateArray}
          DeleteArrayBlock={DeleteHomelessArrayBlock}
          CreateArrayBlock={RecreateHomelessArrayBlock}
          Observing={props.Observing}
          setObserving={props.setObserving}
        ></Array>
      ))}
    </>
  );
});

// suppose the gradient colors are stored in a state which is passed down from the parent component which are bought down as props.colors which is an object containing color1 and color2. Make it such that when the state is update in the parent, the gradient changes too
