import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Catalog from "../Sidebar/ComponentsCatalog";
import "./stylesTools.css";
import { ArrayBlock } from "../Sidebar/CatalogDummies";
import { Brush } from "./Brush1";

export const Tools = ({BrushDrop}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const ContainerRef = useRef();
  const [isHidden, setIsHidden] = useState(false);
  const [doNotHide, setDoNotHide] = useState(false);
  const TopbarRef = useRef();
  const [SelectedBrushName, setSelectedBrush] = useState("Array");

  const placeArray = (name, x, y) => {
    // const num1 = Math.floor(Math.random() * 100);
    // const num2 = Math.floor(Math.random() * 100);
    // const num3 = Math.floor(Math.random() * 100);

    // const newArr = {
    //   type: "Array",
    //   id: num3,
    //   initx: x,
    //   inity: y,
    //   x: x,
    //   y: y,
    //   value: num1,
    //   index: num2,
    // };
    // // console.log(x)
    
    // UniversalArrAPI(newArr);
    BrushDrop(name, x, y)
  };

  const changeBrush = (name) => {
    console.log(name);
    setSelectedBrush(name);
  };

  const onOpen = () => {
    setDoNotHide(!doNotHide);
  };

  useEffect(() => {
    let timeout;
    if (!isMouseOver && !doNotHide) {
      timeout = setTimeout(() => setIsHidden(true), 4000);
    } else {
      setIsHidden(false);
    }
    return () => clearTimeout(timeout);
  }, [isMouseOver, doNotHide]);

  const ToolsContainer = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className="SummonToolsContainer"
      ref={ContainerRef}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <motion.div
        ref={TopbarRef}
        initial="hidden"
        animate={isHidden ? "hidden" : "visible"}
        variants={ToolsContainer}
        transition={{ duration: 0.1, ease: "linear" }}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        className="ToolsContainer"
      >
        <Catalog
          TopbarRef={TopbarRef}
          WaitForClose={() => {
            setDoNotHide(!doNotHide);
          }}
          OnBrushSelect={changeBrush}
        ></Catalog>
        <div className="Spacer"></div>
        <div className="UtilitiesContainer">
          <Brush name={SelectedBrushName} placeArray={placeArray}></Brush>
        </div>
        <div className="Spacer"></div>
        <div className="ConSB"></div>
      </motion.div>
    </div>
  );
};
