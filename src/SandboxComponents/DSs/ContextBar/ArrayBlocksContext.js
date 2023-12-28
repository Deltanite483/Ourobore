import React, { useEffect } from "react";
import { motion } from "framer-motion";
import './stylesContextBar.css';

export const ArrayBlocksContext = (props) => {
  const action = props.superProps;
  const [formcolors, setFormColors] = React.useState({
    color1: props.attributes.colors.color1,
    color2: props.attributes.colors.color2,
  });

  useEffect(() => {
    setFormColors({ ...props.attributes.colors });
  }, [props]);

  const handleValueChange = (event) => {
    const input = event.target.value;
    if (input === "") {
      action.UpdateStructure({ ...props.attributes, value: null });
    } else if (input.match(/^[0-9]*$/)) {
      action.UpdateStructure({
        ...props.attributes,
        value: parseInt(event.target.value),
      });
    }
  };

  const handleDeletion = () => {
    action.DeleteStructure({ ...props.attributes });
  };

  const handleColorChange = (event) => {
    event.preventDefault();
    console.log("HI");
    action.UpdateStructure({ ...props.attributes, colors: formcolors });
  };

  return (
    <motion.div className="ContextWindow">
      <motion.div
        initial={{ x: -8, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.1 }}
        className="Preview"
      >
        <p className="PreviewPara">
          ID:{props.attributes.id}, X:{props.attributes.coords.x}, Y:
          {props.attributes.coords.y}
        </p>
        <div
          className="BlockContainer"
          style={{
            background: `linear-gradient(90deg, ${props.attributes.colors.color1} 0%, ${props.attributes.colors.color2} 100%)`,
          }}
        >
          {props.attributes.value && (
            <div className="ValueContainer">
              <p className="ValuePara">{props.attributes.value}</p>
            </div>
          )}
        </div>
      </motion.div>
      <motion.button
        initial={{ x: -8, opacity: 0.1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.1 }}
        className="Delete"
        onClick={handleDeletion}
      ></motion.button>
      <motion.button
        initial={{ x: -8, opacity: 0.1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.1 }}
        className="Duplicate"
      ></motion.button>
      <br></br>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.1 }}
      >
        <label className="label1">Value</label>
        <motion.input
          type="text"
          className="input1"
          value={props.attributes.value ? props.attributes.value : ""}
          onChange={(event) => {
            handleValueChange(event);
          }}
        ></motion.input>
      </motion.div>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.1 }}
      >
        <form onSubmit={handleColorChange}>
          <label className="label1">Color 1</label>
          <input
            type="color"
            className="colorPicker"
            value={formcolors.color1 ? formcolors.color1 : "#000000"}
            onChange={(event) =>
              setFormColors({ ...formcolors, color1: event.target.value })
            }
          />
          <input
            type="button"
            className="colorReset"
            value=""
            onClick={() => {
              setFormColors({ ...formcolors, color1: "#00d2ff" });
            }}
          ></input>
          <br></br>
          <label className="label1">Color 2</label>
          <input
            type="color"
            className="colorPicker"
            value={formcolors.color2 ? formcolors.color2 : "#000000"}
            onChange={(event) =>
              setFormColors({ ...formcolors, color2: event.target.value })
            }
          />
          <input
            type="button"
            className="colorReset"
            value=""
            onClick={() => {
              setFormColors({ ...formcolors, color2: "#3a47d5" });
            }}
          ></input>
          <br></br>
          <input
            type="submit"
            className="Apply"
            value="Apply colors"
            onClick={handleColorChange}
          ></input>
        </form>
      </motion.div>
      <br></br>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.1 }}
      ></motion.div>
    </motion.div>
  );
};
