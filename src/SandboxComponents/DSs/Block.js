import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./Block.css";
import "./Maker.css";

export const Block = (props) => {
  const [Attributes, setAttributes] = useState(props.attributes);
  const [Dragging, setDragging] = useState(false);
  const [color, setColor] = React.useState(
    "linear-gradient(90deg, red, orange)"
  );
  const blockRef = useRef();
  const timeRef = useRef(null);
  var Location = Attributes.coords;

  const LocateNearbyBlock = () => {
    var closestID = null;
    var closestBlock = null;
    var newHost = false;
    props.AllBlocks.forEach((element) => {
      if (element.id !== Attributes.id) {
        // && Location.x < element.coords.x + 72  && Location > element.coords.y
        if (
          element.coords.x + 22 < Location.x &&
          Location.x < element.coords.x + 100
        ) {
          if (
            Location.y > element.coords.y - 10 &&
            Location.y < element.coords.y + 42
          ) {
            if (element.id !== closestID) {
              closestID = element.id;
              newHost = true;
              closestBlock = element;
            }
          }
        }
      }
    });

    if (newHost && props.Arraymaker.hostID != closestID) {
      props.setArrayMaker({
        hostID: closestBlock.id,
        targetID: props.attributes.id,
        host: closestBlock,
        target: props.attributes,
      });
    } else {
      props.setArrayMaker({ hostID: -1, targetID: -1 });
    }
  };

  const CyclicUpdater = () => {
    if (blockRef.current !== null) {
      timeRef.current = setInterval(() => {
        if (blockRef.current !== null) {
          const rect = blockRef.current.getBoundingClientRect();
          setAttributes({
            type: props.attributes.type,
            id: props.attributes.id,
            coords: { x: rect.x, y: rect.y },
            value: props.attributes.value,
            colors: props.attributes.colors,
          });
          Location = { x: rect.x, y: rect.y };
          LocateNearbyBlock();
        }
      }, 50);
    }
  };

  const ImmediateUpdater = () => {
    if (blockRef.current) {
      const rect = blockRef.current.getBoundingClientRect();
      props.SendUpdate({
        type: props.attributes.type,
        id: props.attributes.id,
        coords: { x: rect.x, y: rect.y },
        value: props.attributes.value,
        colors: props.attributes.colors,
      });
    }
  };

  const control = useAnimation;

  // useEffect(() => {
  //   console.log(props.attributes.colors);
  // }, [props.attributes.colors]);

  return (
    <motion.div
      ref={blockRef}
      id={`${Attributes.type}${Attributes.id}`}
      className="BlockContainer"
      onDoubleClick={() => {
        props.setObserving({ ...props.attributes });
      }}
      drag={true}
      dragMomentum={false}
      onDragStart={() => {
        setDragging(true);
        ImmediateUpdater();
        CyclicUpdater();
        props.setPickedUp({ anything: true, item: props.attributes });
      }}
      onDragEnd={() => {
        setDragging(false);
        clearInterval(timeRef.current);
        ImmediateUpdater();
        props.setArrayMaker({ hostID: -1, targetID: -1 });
        props.setPickedUp({ anything: false });

        // if(props.PickedUp.item.id === props.attributes.id && props.Arraymaker.hostID){
        //   props.createArray({ ...props.Maker });
        // }

      }}
      style={{
        position: "absolute",
        x: Attributes.coords.x,
        y: Attributes.coords.y,
        background: `linear-gradient(90deg, ${props.attributes.colors.color1} 0%, ${props.attributes.colors.color2} 100%)`,
        pointerEvents: Dragging ? "none" : "all",
        touchAction: Dragging ? "none" : "all",
      }}
    >
      {props.attributes.value && (
        <motion.div className="ValueContainer">
          <p className="ValuePara">{props.attributes.value}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export const ArrayMaker = (props) => {
  const Host = props.Maker.host;
  const location = { x: Host.coords.x - 4, y: Host.coords.y - 4 };

  return (
    <motion.div
      className="Maker"
      initial={{ opacity: 0, width: "0px" }}
      animate={{ opacity: 0.2, width: "108px" }}
      exit={{ opacity: 0, width: "0px" }}
      transition={{ duration: 0.1 }}
      style={{
        position: "absolute",
        x: location.x,
        y: location.y,
        borderRadius: "5%",
        opacity: 0.2,
      }}
      onMouseUp={() => {
        props.createArray({ ...props.Maker });
      }}
      onTouchEnd={() => {
        console.log("mouseup");
        props.createArray({ ...props.Maker });
      }}
    ></motion.div>
  );
};
