import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./stylesArrays.css";
// import { eventNames } from "process";

// [allocatorID, uniID, value]

const DropBox = ({ attributes, bSize, InserttoArray }) => {
  const controls = useAnimation();
  const DropboxRef = useRef();

  const HandlePositioningandIndex = () => {
    controls.start({
      x: attributes.index * 42 - 4,
      y: -80,
      transition: {
        duration: 0.1,
      },
    });
  };

  useEffect(() => {
    const divElement = DropboxRef.current;
    const handleMouseUp = (event) => {
      InserttoArray()
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    HandlePositioningandIndex();
  }, [attributes]);

  return (
    <motion.div
      ref={DropboxRef}
      className="Dropbox"
      animate={controls}
    ></motion.div>
  );
};

const AllocationSelector = ({ attributes, lrp, bSize }) => {
  const controls = useAnimation();
  const positionIndex = attributes.index;

  const HandlePositioningandIndex = () => {
    // console.log(attributes.index * 42 - 4);
    controls.start({
      x: attributes.index * 42 - 4,
      y: 60,
      transition: {
        duration: 0.1,
        // type: "spring",
        // ease: "linear",
      },
    });
  };

  useEffect(() => {
    HandlePositioningandIndex();
  }, [attributes]);
  return (
    <motion.div className="Selector" animate={controls}>
      {/* <p className="info">{positionIndex} {attributes.index * bSize}</p> */}
      <motion.div className="Pointer"></motion.div>
      <motion.div className="IndexBox">
        <p className="IBp">{attributes.index}</p>
      </motion.div>
    </motion.div>
  );
};

const ArrayItem = (props) => {
  const attributes = props.attributes;
  // console.log(attributes);a
  return (
    <motion.div className="ArrayItemContainer">
      <div className="ArrayItemValue">
        <p className="AIVp">{attributes[2]}</p>
      </div>
      <div className="ArrayItemIndex">
        <p className="AIIp">{props.index}</p>
      </div>
    </motion.div>
  );
};

const Allocation = ({ props, blockSize, toppadding, ItemInfo }) => {
  const [Hide, setHide] = useState(ItemInfo[1] ? true : false);
  const controls = useAnimation();

  const HandlePositioning = () => {
    controls.start({
      x: props.position * blockSize + 16,
      y: toppadding,
      transition: {
        duration: 0.1,
        type: "spring",
        ease: "linear",
      },
    });
  };

  useEffect(() => {
    HandlePositioning();
  }, [props]);

  return (
    <motion.div
      animate={controls}
      className="Allocation"
      style={{
        width: `${blockSize}px`,
        height: `${blockSize}px`,
        background: Hide ? "#ffffff00" : "#ffffff92",
      }}
    >
      {!Hide ? (
        <h2 style={{ color: Hide ? "#ffffff00" : "#787878" }}>{props.index}</h2>
      ) : (
        <ArrayItem
          key={ItemInfo[1]}
          attributes={ItemInfo}
          index={props.index}
        ></ArrayItem>
      )}
    </motion.div>
  );
};

export const Array = (props) => {
  // const [testInfo, setTestInfo] = useState({ v1: 0, v2: 0 });
  const attributes = props.attributes;
  const blockSize = 42;
  const toppadding = 15;
  const bottompadding = 15;
  const leftrightpadding = 32;
  const ArrRef = useRef();

  const [Dragging, setDragging] = useState(false);
  const [SizeofArr, setSizeofArr] = useState(attributes.size);

  const [Dimensions, setDimensions] = useState({
    h: blockSize + toppadding + bottompadding,
    w: blockSize * attributes.size + leftrightpadding,
    hpx: `${blockSize + toppadding + bottompadding}px`,
    wpx: `${blockSize * attributes.size + leftrightpadding}px`,
  });

  const [allocations, setAllocations] = useState(() => {
    const arr = [];
    for (let i = 0; i < attributes.size; i++) {
      arr.push({
        id: i,
        index: i,
        position: i,
      });
    }
    return arr;
  });

  const [Selector, setSelector] = useState({
    show: false,
    index: null,
    x: null,
    block: null,
  });

  const controls = useAnimation();

  const IntervalRef = useRef(null);

  const updateImmediate = (event, info) => {
    const rect = { x: info.point.x, y: info.point.y };
    // console.log(rect.x, rect.y);
    props.updateArrayAttributes({
      type: attributes.type,
      id: attributes.id,
      x: rect.x,
      y: rect.y,
      values: attributes.values,
      size: attributes.size,
      elementIds: attributes.elementIds,
      midPoint: { x: rect.x + Dimensions.w / 2, y: rect.y + Dimensions.h / 2 },
    });
    // console.log("Update Successfull");
  };

  const updateCyclic = (event, info) => {
    IntervalRef.current = setInterval(() => {
      const rect = { x: info.point.x, y: info.point.y };
      // console.log(rect.x, rect.y);
      props.updateArrayAttributes({
        type: attributes.type,
        id: attributes.id,
        x: rect.x,
        y: rect.y,
        values: attributes.values,
        size: attributes.size,
        elementIds: attributes.elementIds,
        midPoint: {
          x: rect.x + Dimensions.w / 2,
          y: rect.y + Dimensions.h / 2,
        },
      });
      // console.log("Cyclic Update Successfull");
    }, 400);
  };

  const AnimateDimensions = () => {
    controls.start({
      width: Dimensions.wpx,
      height: Dimensions.hpx,
      transition: { duration: 0.1 },
    });

    props.updateArrayAttributes({
      type: attributes.type,
      id: attributes.id,
      x: attributes.x,
      y: attributes.y,
      values: attributes.values,
      size: attributes.size,
      elementIds: attributes.elementIds,
      midPoint: { x: attributes.x + Dimensions.w / 2, y: attributes.y + 36 },
    });
  };

  const addAllocation = (target) => {
    if (target > attributes.size) {
      setAllocations((prev) => {
        return prev.push({
          id: allocations.length,
          index: target,
          position: target,
        });
      });
    }

    setAllocations((prevAllocations) =>
      prevAllocations.map((allocation) =>
        allocation.position >= target
          ? {
              ...allocation,
              index: allocation.index + 1,
              position: allocation.position + 1,
            }
          : allocation
      )
    );

    setAllocations((prevAllocations) => [
      ...prevAllocations.slice(0, target),
      { id: allocations.length, index: target, position: target },
      ...prevAllocations.slice(target),
    ]);

    setDimensions(() =>
      setDimensions({
        ...Dimensions,
        w: Dimensions.w + blockSize,
        wpx: `${Dimensions.w + blockSize}px`,
      })
    );
  };

  const removeAllocation = (target) => {
    if (target)
      setAllocations((prevAllocations) =>
        prevAllocations
          .filter((allocation) => allocation.position !== target)
          .map((allocation) =>
            allocation.position > target
              ? {
                  ...allocation,
                  index: allocation.index - 1,
                  position: allocation.position - 1,
                }
              : allocation
          )
      );
    setDimensions(() =>
      setDimensions({
        ...Dimensions,
        w: Dimensions.w - blockSize,
        wpx: `${Dimensions.w - blockSize}px`,
      })
    );
  };

  // const SendInvitetoHomelessArr = ({ Array, Block, Index, status }) => {
  //   const info = { Array: Array, Block: Block, Index: Index };
  //   var inviteStatus = status;
  //   props.InviteHomelessArr(info, inviteStatus);
  // };

  const InserttoArray = () => {
    const position = Selector.index;

    console.log(Selector.block.value, Selector.index);

    // attributes.values = [
    //   ...attributes.values.slice(0, Selector.index),
    //   Selector.block.value,
    //   ...attributes.values.slice(Selector.index),
    // ];

    // attributes.elementIds = [
    //   ...attributes.elementIds.slice(0, Selector.index),
    //   Selector.block.id,
    //   ...attributes.elementIds.slice(Selector.index),
    // ];

    // attributes.size = attributes.size + 1;

    // props.updateArrayAttributes(
    //   attributes
    // )
  };

  const AllocationManager = (BlockAttributes) => {
    // console.log(ArrRef.current.getBoundingClientRect().x);

    // const X = attributes.x;
    // const Y = attributes.y;

    const X = ArrRef.current.getBoundingClientRect().x;
    const Y = ArrRef.current.getBoundingClientRect().y;

    const x = BlockAttributes.x + 16;
    const y = BlockAttributes.y + 16;
    const headpoint = { x: X, y: Y + Dimensions.h / 2 };
    const tailpoint = { x: X + Dimensions.w, y: Y + Dimensions.h / 2 };
    var inBox = false;

    var IndexIntervals = [];
    var IndexIntervalWidth = Dimensions.w / (attributes.size + 1);

    var sx = 0;
    var ex = 0;
    for (let j = 0; j < attributes.size; j++) {
      sx = X + j * IndexIntervalWidth;
      ex = X + j * IndexIntervalWidth + IndexIntervalWidth;
      IndexIntervals.push({
        i: j,
        xStart: sx,
        xEnd: ex,
      });
    }
    IndexIntervals.push({
      i: attributes.size,
      xStart: ex,
      xEnd: ex + IndexIntervalWidth,
    });

    // console.log(IndexIntervals)

    if (y < tailpoint.y && y > tailpoint.y - 100) {
      if (x > headpoint.x && x < tailpoint.x) {
        if (!Selector.show) {
          setSelector((prev) => ({ ...prev, show: true }));
        }
        IndexIntervals.forEach((interval) => {
          if (interval.xStart < x && interval.xEnd > x) {
            if (Selector.index !== interval.i) {
              setSelector((prev) => ({
                ...prev,
                index: interval.i,
                x: interval.xEnd,
                block: BlockAttributes,
              }));
              console.log(Selector.index);
            }
          }
        });
      } else {
        setSelector((prev) => ({
          ...prev,
          show: false,
          index: null,
          x: null,
          block: null,
        }));
        // var status = "Reject";
        // SendInvitetoHomelessArr(attributes, BlockAttributes, -1, status);
      }
    } else {
      setSelector((prev) => ({
        ...prev,
        show: false,
        index: null,
        x: null,
        block: null,
      }));
      // var status = "Reject";
      // SendInvitetoHomelessArr(attributes, BlockAttributes, -1, status);
    }
  };

  useEffect(() => {
    const AA = props.ArrayAllocator;
    if (attributes.anticipateAllocation) {
      AllocationManager(AA.Block);
    }
  }, [props, props.ArrayAllocator]);

  useEffect(() => {
    setDimensions(Dimensions);
    AnimateDimensions();
  }, []);
  // Dimensions, SizeofArr
  return (
    <motion.div
      id={`${attributes.type}+${attributes.id}`}
      ref={ArrRef}
      drag
      onDragStart={(event, info) => {
        setDragging(true);
        updateImmediate(event, info);
        updateCyclic(event, info);
      }}
      onDragEnd={(event, info) => {
        setDragging(false);
        updateImmediate(event, info);
        clearInterval(IntervalRef.current);
      }}
      animate={controls}
      dragMomentum={false}
      className="OuterShell"
      style={{
        position: "absolute",
        x: attributes.x,
        y: attributes.y,
      }}
      // onClick={()=>{addAllocation(2)}}
      // onDoubleClick={()=>{addAllocation(2)}}
      onMouseUpCapture={() => {
        console.log("hit");
        if (Selection.show) {
          InserttoArray();
        }
      }}
    >
      {allocations.map((A) => {
        const allocatorID = A.id;
        const value = attributes.values[allocatorID];
        const uniID = attributes.elementIds[allocatorID];

        return (
          <Allocation
            key={A.id}
            props={A}
            blockSize={blockSize}
            toppadding={toppadding}
            ItemInfo={[allocatorID, uniID, value]}
          ></Allocation>
        );
      })}

      {Selector.show && (
        <AllocationSelector
          attributes={Selector}
          lrp={leftrightpadding}
          bSize={blockSize}
        ></AllocationSelector>
      )}

      {Selector.show && (
        <DropBox
          InserttoArray={InserttoArray}
          key={"DRPBX"}
          attributes={Selector}
          bSize={blockSize}
        ></DropBox>
      )}
    </motion.div>
  );
};
