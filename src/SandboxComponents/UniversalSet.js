import React, { useEffect, useRef, useState } from "react";
import { Array } from "./DataStructures/Array";
import { ArrayBlock, ArrayMaker } from "./DataStructures/ArrayBlock";
import { AnimatePresence } from "framer-motion";

// {
//   type: "Array",
//   id: 1,
//   initx: 100,
//   inity: 400,
//   x: 100,
//   y: 400,
//   value: 32,
//   index: 7,
// },
// {
//   type: "Array",
//   id: 2,
//   initx: 300,
//   inity: 400,
//   x: 300,
//   y: 400,
//   value: 12,
//   index: 0,
// },
// {
// type: "Array",
// id: 3,
// initx: 900,
// inity: 400,
// x: 900,
// y: 400,
// value: 19,
// index: 8,
// },

export const Universal = ({ passtoContext, setUniversalArrAPI }) => {
  const [UniversalArrays, setUniversalArrays] = useState([
    {
      type: "ArrayDataStructure",
      id: 1,
      x: 300,
      y: 300,
      values: [1, 2, 3, 78, 234, 23, 54, 12, 32, 44],
      size: 10,
      elementIds: [12, 45, 67, 89, 23, 56, 78, 34, 91, 922],
      anticipateAllocation: false,
      midPoint: null,
    },
    {
      type: "ArrayDataStructure",
      id: 2,
      x: 1000,
      y: 300,
      values: [3, 45, 1, 2],
      size: 4,
      elementIds: [123, 6546, 43, 345432],
      anticipateAllocation: false,
      midPoint: null,
    },
  ]);

  const [ArrayAllocator, setArrayAllocator] = useState({
    ArrayId: null,
    ArrayBlockId: null,
    Block: null,
  });

  const [ArrayInviteData, setArrayInviteData] = useState({
    Array: null,
    Block: null,
    Index: null,
  });

  const [HomelessArr, setHomelessArr] = useState([]);

  const [Makers, setMakers] = useState({
    hostID: -1,
  });

  const [MakerTarget, setMakerTarget] = useState({ hostID: -1 });

  const killMakers = () => {
    setMakers({
      hostID: -1,
    });
  };

  const updateUniversalArr = (newObject) => {
    setHomelessArr((prevHomelessArr) => {
      const index = prevHomelessArr.findIndex(
        (object) => object.id === newObject.id
      );
      if (index !== -1) {
        return prevHomelessArr.map((object) =>
          object.id === newObject.id ? newObject : object
        );
      } else {
        return [...prevHomelessArr, newObject];
      }
    });
  };

  const PromptNearbyArrays = (props) => {
    const BlockAttributes = HomelessArr.find((obj) => obj.id === props.id);

    const X = BlockAttributes.x;
    const Y = BlockAttributes.y;
    const id = BlockAttributes.id;
    const type = BlockAttributes.type;

    let minDistance = Infinity;
    let closestArray = null;
    let newHostFound = false;

    // console.log("prompting");

    UniversalArrays.forEach((element) => {
      // console.log(
      //   element.id + ": " + element.midPoint.x + ", " + element.midPoint.y
      // );
      const distance = Math.sqrt(
        Math.pow(element.midPoint.x - X, 2) +
          Math.pow(element.midPoint.y - Y, 2)
      );
      if (distance < minDistance) {
        // console.log("hi");
        minDistance = distance;
        closestArray = element;
        newHostFound = true;
      }
    });

    if (newHostFound) {
      // console.log(closestArray);
      setArrayAllocator({
        ArrayId: closestArray.id,
        ArrayBlockId: BlockAttributes.id,
        Block: props,
      });
      // if (ArrayAllocator.ArrayId !== closestArray.id) {
      //   setArrayAllocator({
      //     ArrayId: closestArray.id,
      //     ArrayBlockId: BlockAttributes.id,
      //     Block: BlockAttributes,
      //   });
      // } else if (ArrayAllocator.ArrayBlockId !== BlockAttributes.id) {
      //   setArrayAllocator({
      //     ...ArrayAllocator,
      //     ArrayBlockId: BlockAttributes.id,
      //     Block: BlockAttributes,
      //   });
      // }
      // console.log(ArrayAllocator);

      setUniversalArrays((prevState) =>
        prevState.map((arr) =>
          arr.id == ArrayAllocator.ArrayId
            ? { ...arr, anticipateAllocation: true }
            : { ...arr, anticipateAllocation: false }
        )
      );
    }
  };

  const InviteHomelessArr = ({props, inviteStatus }) => {
    if (inviteStatus == "Init") {
      console.log("init")
      setArrayInviteData({
        Array: props.Array,
        Block: props.Block,
        Index: props.index,
      });
    }

    if (inviteStatus == "Reject") {
      setArrayInviteData({
        Array: null,
        Block: null,
        Index: null,
      });
    } 
    if(inviteStatus === "Accept")
    {
      console.log('DDDDDD')
      setUniversalArrays((prevArrays) =>
        prevArrays.map((array) =>
          array.id === props.id
            ? {
                ...array,
                values: [
                  ...array.values.slice(0, ArrayInviteData.index),
                  ArrayInviteData.Block.value,
                  ...array.values.slice(5),
                ],
                elementIds: [
                  ...array.elementIds.slice(0, ArrayInviteData.index),
                  ArrayInviteData.Block.id,
                  ...array.elementIds.slice(5),
                ],
                size: array.size + 1,
              }
            : array
        )
      );
    }
  };

  const distanceActionbyType = (props) => {
    const X = props.x;
    const Y = props.y;
    const id = props.id;
    const type = props.type;

    let minDistance = Infinity;
    let closestSquare = null;
    let newHostFound = false;

    HomelessArr.forEach((element) => {
      if (element.type == type && element.id != id && element.x < X) {
        const distance = Math.sqrt(
          Math.pow(element.x - X, 2) + Math.pow(element.y - Y, 2)
        );
        if (distance < 75 && distance < minDistance) {
          minDistance = distance;
          closestSquare = element;
          newHostFound = true;
        }
      }
    });

    if (newHostFound) {
      if (closestSquare && closestSquare.id !== Makers.hostID) {
        setMakers(closestSquare);
        setMakerTarget(props);
      } else {
        setMakers({ hostID: -1 });
      }
    } else {
      setMakers({ hostID: -1 });
    }
  };

  const updateAttributesbyID = (attributes) => {
    const id = attributes.id;
    const x = attributes.x;
    const y = attributes.y;
    // setMakers({
    //   hostID: -1,
    // });
    setHomelessArr((prevSquares) =>
      prevSquares.map((square) =>
        square.id === id ? { ...square, x: x, y: y } : square
      )
    );
    distanceActionbyType(attributes);
    PromptNearbyArrays(attributes);
  };

  const deleteBlockfromHomelessUniversal = (props) => {
    setHomelessArr((prev) => prev.filter((obj) => obj.id !== props.id));
    // var inviteStatus = "Accept";
    // InviteHomelessArr({props,inviteStatus});
  };

  const updateArrayAttributes = (attributes) => {
    setUniversalArrays((prev) =>
      prev.map((arr) =>
        arr.id == attributes.id
          ? {
              ...arr,
              x: attributes.x,
              y: attributes.y,
              values: attributes.values,
              size: attributes.size,
              elementIds: attributes.elementIds,
              midPoint: attributes.midPoint,
            }
          : arr
      )
    );
  };

  const elementSelected = (attributes) => {
    passtoContext(attributes);
  };

  useEffect(() => {
    setUniversalArrAPI(() => updateUniversalArr);
  }, [setUniversalArrAPI]);

  return (
    <div className="background">
      {UniversalArrays &&
        UniversalArrays.map((Arr) => (
          <Array
            key={Arr.id}
            attributes={Arr}
            updateArrayAttributes={updateArrayAttributes}
            ArrayAllocator={ArrayAllocator}
            InviteHomelessArr={InviteHomelessArr}
          ></Array>
        ))}

      {HomelessArr.map((Arr) => (
        <ArrayBlock
          key={Arr.id}
          attributes={Arr}
          elementSelected={elementSelected}
          updateAttributesbyID={updateAttributesbyID}
          killMakers={killMakers}
          Suicide={deleteBlockfromHomelessUniversal}
          ArrayInviteData={ArrayInviteData}
        ></ArrayBlock>
      ))}
      <AnimatePresence>
        {Makers.hostID !== -1 && (
          <ArrayMaker host={Makers} target={MakerTarget}></ArrayMaker>
        )}
      </AnimatePresence>
    </div>
  );
};

// const distanceActionbyType = (props) => {
//   const X = props.x;
//   const Y = props.y;
//   const id = props.id;
//   const type = props.type;

//   var newHostFound = false;
//   const makerHost = {};

//   for (let i = 0; i < HomelessArr.length; i++) {
//     const element = HomelessArr[i];

//     if (element.type == type && element.id !== id) {
//       const eX = element.x;
//       const eY = element.y;
//       const distance = Math.sqrt(Math.pow(X - eX, 2) + Math.pow(Y - eY, 2));
//       if (distance < 150) {
//         // console.log(element)
//         Object.assign(makerHost, element);
//         newHostFound = true;
//         break;
//       }
//     }
//   }

//   if (newHostFound) {
//     if (makerHost.id !== Makers.id) {
//       setMakers(makerHost);
//     }
//   } else {
//     setMakers({
//       hostID: -1,
//     });
//   }
// };
