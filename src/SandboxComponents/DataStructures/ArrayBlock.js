import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./stylesArrays.css";

export const ArrayBlock = (props) => {
  const [Dragging, setDragging] = useState(false);
  const [InvitedbyArr, setInvitedbyArr] = useState(false);

  const BlockRef = useRef();
  const intervalRef = useRef(null);
  const [everDragged, setEverDragged] = useState(false);

  var attributes = props.attributes;

  const updateLocationCyclic = () => {
    intervalRef.current = setInterval(() => {
      const rect = BlockRef.current.getBoundingClientRect();
      props.updateAttributesbyID({
        type: attributes.type,
        id: attributes.id,
        initx: attributes.initx,
        inity: attributes.inity,
        x: rect.x,
        y: rect.y,
        value: attributes.value,
        index: attributes.index,
      });
    }, 200);
  };

  const updateLocationImmediate = (firstTime) => {
    const rect = BlockRef.current.getBoundingClientRect();
    props.updateAttributesbyID({
      type: attributes.type,
      id: attributes.id,
      initx: attributes.initx,
      inity: attributes.inity,
      x: rect.x,
      y: rect.y,
      value: attributes.value,
      index: attributes.index,
    });
    if (firstTime) {
      attributes.initx = rect.x;
      attributes.inity = rect.y;
      // console.log(rect.x, rect.y);
    }
  };

  const SelfDestruct = () => {
    console.log("hi")
    props.Suicide(attributes);
  };

  const onSelect = () => {
    props.elementSelected(attributes);
  };

  useEffect(() => {
    if (props.ArrayInviteData.Array) {
      if (props.ArrayInviteData.Block.id === attributes.id) {
        setInvitedbyArr(true);
      }
    }
  }, [props.ArrayInviteData]);

  return (
    <motion.div
      id={`${attributes.type}+${attributes.id}`}
      ref={BlockRef}
      drag
      onDragStart={() => {
        setDragging(!Dragging);
        setEverDragged(true);
        updateLocationImmediate(!everDragged);
        updateLocationCyclic();
      }}
      onDragEnd={() => {
        setDragging(!Dragging);
        updateLocationImmediate(!everDragged);
        clearInterval(intervalRef.current);
        props.killMakers();
        InvitedbyArr && SelfDestruct();
      }}
      animate={{ scale: Dragging ? 1.2 : 1 }}
      dragMomentum={false}
      className="SingleShell"
      style={
        everDragged
          ? {
              position: "absolute",
              y: attributes.y,
              x: attributes.x,
            }
          : {
              position: "absolute",
              y: attributes.y,
              x: attributes.x,
            }
      }
      onDoubleClick={onSelect}
    >
      {/* <p
        className="info"
        style={{ position: "absolute", x: attributes.x, y: attributes.y + 80 }}
      >
        {attributes.id}: {attributes.x}, {attributes.y}
      </p> */}
      <div className="ValueContainer" onDoubleClick={onSelect}>
        <p className="Value">{attributes.value}</p>
      </div>
      {!(attributes.index === "null") && (
        <div className="IndexContainer" onDoubleClick={onSelect}>
          <p className="Index">{attributes.index}</p>
        </div>
      )}
    </motion.div>
  );
};

export const ArrayMaker = (props) => {
  const [Hovered, setHovered] = useState(false);
  const HostRef = useRef(
    document.getElementById(`${props.host.type}+${props.host.id}`)
  );

  const TargetRef = useRef(
    document.getElementById(`${props.target.type}+${props.target.id}`)
  );

  const location = {
    x: HostRef.current.getBoundingClientRect().x + 48,
    y: HostRef.current.getBoundingClientRect().y - 3,
  };

  return (
    <motion.div
      className="ArrayMaker"
      style={{
        position: "absolute",
        x: location.x,
        y: location.y,
        borderRadius: "5%",
        opacity: 0.5,
        // backgroundColor: Hovered ? "blue" : "#ffffff50",
      }}
      initial={{ opacity: 0, x: location.x - 10 }}
      animate={{ opacity: 0.5, x: location.x }}
      exit={{ opacity: 0, x: location.x - 10 }}
      // onPointerDown={() => {
      //   console.log("UP");
      //   setHovered(true);
      // }}
      onMouseUp={() => {
        console.log("Hit!!");
      }}
    >
      {/* <p style={{ margin: 0, fontSize: "x-small" }}>
        {props.host.value}: {props.host.x}, {props.host.y}
        {}
      </p> */}
    </motion.div>
    // <motion.div
    //   className="ArrayMaker"
    //   style={{ position: "absolute", x: location.x, y: location.y }}
    // >
    //   {/* <p style={{ margin: 0, fontSize: "x-small" }}>
    //     {props.host.value}: {props.host.x}, {props.host.y}
    //     {}
    //   </p> */}
    // </motion.div>
  );
};
