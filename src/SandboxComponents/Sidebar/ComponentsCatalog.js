import React, { useState, useRef, useEffect } from "react";
import "./stylesSidebar.css";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Item } from "./Catalog";
import { ArrayBlock, Graph, LinkedListBlock, Tree } from "./CatalogDummies";

const Catalog = ({ WaitForClose, OnBrushSelect }) => {
  const [Hovered, setHovered] = useState(false);
  const [Active, setActive] = useState(false);
  const [Opened, setOpened] = useState(false);
  const CSBref = useRef();
  const CatalogRef = useRef();
  const AnimationTime = 0.25;
  const [AnimationInfo, setAnimationInfo] = useState({
    x: 0,
    y: 0,
    h: 0,
    w: 0,
  });

  const onBrushSelection = (Name) => {
    OnBrushSelect(Name)
  };

  const changeSetActive = (state) => {
    setTimeout(() => {
      setActive(state);
    }, AnimationTime * 1000);
  };

  useEffect(() => {
    const handleExternalClick = (event) => {
      if (CatalogRef.current !== null && typeof CatalogRef.current !== "undefined") {
        if (!CatalogRef.current.contains(event.target)) {
          changeSetActive(false);
          setOpened(false);
          WaitForClose();
        }
      }
    };
    document.addEventListener("mousedown", handleExternalClick);
    return () => {
      document.removeEventListener("mousedown", handleExternalClick);
    };
  }, [CatalogRef]);

  const computeDimensions = () => {
    setAnimationInfo({
      x: CSBref.current.getBoundingClientRect().left,
      y: CSBref.current.getBoundingClientRect().top,
      h: (window.innerHeight / 100) * 70,
      w: (window.innerWidth / 100) * 15,
    });
  };

  const variants = {
    hovered: { border: "solid 1px grey" },
    collapsed: {
      width: "3rem",
      height: "3rem",
      top: AnimationInfo.y,
      left: AnimationInfo.x,
    },
    expanded: {
      width: AnimationInfo.w,
      height: AnimationInfo.h,
      top: AnimationInfo.y,
      left: AnimationInfo.x - AnimationInfo.x * 0.4,
    },
  };

  return (
    <div
      ref={CSBref}
      className="CSB"
      onMouseEnter={() => {
        setHovered(true);
        computeDimensions();
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {(Hovered || Active) &&
        createPortal(
          <motion.div
            ref={CatalogRef}
            onClick={() => {
              setOpened(true);
              setActive(true);
              WaitForClose();
            }}
            initial="collapsed"
            variants={variants}
            animate={Opened ? "expanded" : "collapsed"}
            transition={{ duration: AnimationTime }}
            style={{
              position: "absolute",
            }}
            className="CatalogContainer"
          >
            {Opened && (
              <>
                <Item
                  onBrushSelection={onBrushSelection}
                  Name={"Array"}
                  Description={"Hee Hee Hee Haw"}
                  index={1}
                >
                  <ArrayBlock height = {"80%"} borRad = {"10px"}></ArrayBlock>
                </Item>
                <Item
                  onBrushSelection={onBrushSelection}
                  Name={"Linked List"}
                  Description={"Legend of Link"}
                  index={2}
                >
                  <LinkedListBlock height = {"80%"} borRad = {"10px"}></LinkedListBlock>
                </Item>
                <Item
                  onBrushSelection={onBrushSelection}
                  Name={"Binary Tree"}
                  Description={"three"}
                  index={3}
                >
                  <Tree height = {"80%"} borRad = {"10px"}></Tree>
                </Item>
                <Item
                  onBrushSelection={onBrushSelection}
                  Name={"Graph"}
                  Description={"..."}
                  index={4}
                >
                  <Graph height = {"80%"} borRad = {"10px"}></Graph>
                </Item>
              </>
            )}
          </motion.div>,
          document.body
        )}
    </div>
  );
};

export default Catalog;
