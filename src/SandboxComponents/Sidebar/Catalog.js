import React, { useState } from "react";
import { animate, motion, useAnimation } from "framer-motion";

export const Item = ({
  onBrushSelection,
  children,
  Name,
  Description,
  index,
}) => {
  const [select, setselect] = useState(false);

  const ItemContainerVariants = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  const selectBrush = () => {
    console.log(Name)
    onBrushSelection(Name, children);
  };

  return (
    <motion.div
      whileHover={{
        backgroundColor: "#192d4b",
        transition: { duration: 0.01 },
      }}
      initial="initial"
      animate="animate"
      variants={ItemContainerVariants}
      transition={{ delay: 0.2 + 0.05 * index }}
      className="ItemContainer"
      onClick={() => {
        setselect(!select);
        selectBrush();
      }}
    >
      <motion.div className="preview">{children}</motion.div>
      <div className="Info">
        <p className="Name">{Name}</p>
        <p className="Description">{Description}</p>
      </div>
    </motion.div>
  );
};
