import React, { useState } from "react";
import "./stylesTools.css";
import { motion } from "framer-motion";
import { ArrayBlock } from "../Sidebar/CatalogDummies";
import { LinkedListBlock } from "../Sidebar/CatalogDummies";
import { Tree } from "../Sidebar/CatalogDummies";
import { Graph } from "../Sidebar/CatalogDummies";

export const Brush = (props) => {
  // const [Item, setItem] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [copyDragged, setCopyDragged] = useState(false);
  const [ClickMode, setClickMode] = useState(false);

  const handleMouseEnter = (event) => {
    setIsDragging(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const copyDragStart = () => {
    setCopyDragged(true);
  };

  const copyDragEnd = (event, info) => {
    setCopyDragged(false);
    const x = info.point.x - 20;
    const y = info.point.y - 20;
    // console.log(x)
    props.placeArray(props.name, x, y);
  };

  return (
    <>
      <motion.div
        className="Brush"
        onMouseEnter={handleMouseEnter}
        animate={{
          scale: copyDragged ? 1.1 : 1,
          background: ClickMode ? "white" : "black",
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "relative",
        }}
        onDoubleClick={() => {
          // setClickMode(!ClickMode);
        }}
        onTap={() => {
          props.placeArray(props.name, 100, 200);
        }}
      >
        {props.name == "Array" && (
          <ArrayBlock height={"100%"} borRad={0}></ArrayBlock>
        )}
        {props.name == "Linked List" && (
          <LinkedListBlock height={"100%"} borRad={0}></LinkedListBlock>
        )}
        {props.name == "Binary Tree" && (
          <Tree height={"100%"} borRad={0}></Tree>
        )}
        {props.name == "Graph" && <Graph height={"100%"} borRad={0}></Graph>}
      </motion.div>
      {isDragging && (
        <motion.div
          drag={ClickMode ? false : true}
          dragMomentum={false}
          dragConstraints={document.body}
          // onMouseLeave={() => {
          //   setIsDragging(false);
          // }}
          style={{
            position: "absolute",
            top: position.y - 50,
            left: position.x - 20,
            opacity: copyDragged ? 0.5 : 0,
            width: "3rem",
            height: "3rem",
          }}
          onDragStart={copyDragStart}
          onDragEnd={copyDragEnd}
          onPanEnd={handleDragEnd}
          onDoubleClick={() => {
            props.placeArray(props.name, 100, 200);
            setClickMode(!ClickMode);
          }}
        >
          {props.name == "Array" && (
            <ArrayBlock height={"100%"} borRad={0}></ArrayBlock>
          )}
          {props.name == "Linked List" && (
            <LinkedListBlock height={"100%"} borRad={0}></LinkedListBlock>
          )}
          {props.name == "Binary Tree" && (
            <Tree height={"100%"} borRad={0}></Tree>
          )}
          {props.name == "Graph" && <Graph height={"100%"} borRad={0}></Graph>}
        </motion.div>
      )}
    </>
  );
};
