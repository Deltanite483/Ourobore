import React, { useState } from "react";

import { ArrayBlocksContext } from "./ArrayBlocksContext";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import "./stylesContextBar.css";
import { ArrayContext } from "./ArrayContext";

export const Context = (props) => {
  const [Opened, setOpened] = React.useState(false);
  const [makeDraggable, setmakedraggable] = useState(false);

  // console.log(props.Observing)

  const variants = {
    hovered: { border: "solid 1px grey" },
    collapsed: {
      width: "3rem",
      height: "3rem",
      top: 30,
      right: 20,
    },
    expanded: {
      height: "90%",
      width: "15rem",
      top: 30,
      right: 30,
      backgroundColor: "#181818",
    },
  };

  return (
    <motion.div
      initial="collapsed"
      animate={Opened ? "expanded" : "collapsed"}
      variants={variants}
      transition={{ duration: 0.2 }}
      drag={makeDraggable}
      dragMomentum={false}
      className="Contextbar"
    >
      {!Opened && (
        <button
          onClick={() => {
            setOpened(true);
          }}
          className="open"
        ></button>
      )}
      {/* <AnimatePresence> */}
      {Opened && (
        <>
          <motion.div className="Header">
            <motion.button
              initial={{ x: -5, opacity: 0.1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -5, opacity: 0.1 }}
              transition={{ delay: 0.25, duration: 0.1 }}
              className="close"
              onClick={() => {
                setOpened(false);
                setmakedraggable(false);
              }}
            ></motion.button>
            <motion.button
              initial={{ x: -5, opacity: 0.1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -5, opacity: 0.1 }}
              transition={{ delay: 0.3, duration: 0.1 }}
              className="draggable"
              onClick={() => {
                setmakedraggable(true);
              }}
            ></motion.button>
          </motion.div>
          <div>
            {!props.Observing.type && (
              <motion.div
                initial={{ x: -5, opacity: 0.0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h5 style={{ color: "#999999", margin: "5%" }}>
                  Nothing selected :(
                </h5>{" "}
                <p style={{ color: "#cbcbcb", margin: "5%", fontSize: "12px" }}>
                  Double click on any data strucutre to select it.
                </p>
              </motion.div>
            )}
            {props.Observing.type === "BlockArr" && (
              <ArrayBlocksContext
                attributes={props.Observing}
                superProps={props}
              />
            )}
            {props.Observing.type === "Array" && (<ArrayContext attributes={props.Observing} superProps={props}/>) }
          </div>
        </>
      )}
      {/* </AnimatePresence> */}
    </motion.div>
  );
};
