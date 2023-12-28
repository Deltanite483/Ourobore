import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const ArrayContext = (props) => {
  const action = props.superProps;
  const [formcolors, setFormColors] = React.useState({
    color1: props.attributes.colors.color1,
    color2: props.attributes.colors.color2,
  });
  const [length, setLength] = React.useState(props.attributes.allocations.length);
  const [SelectedAlgorithm, setSelectedAlgorithm] = React.useState(null);

  useEffect(() => {
    // console.log(props.attributes.allocations);
    setFormColors({ ...props.attributes.colors });
  }, [props]);

  const handleLengthChange = (event) => {
    const input = length;
    if (input === "") {
      //   action.UpdateStructure({ ...props.attributes });
    } else if (input.match(/^[0-9]*$/)) {
      props.attributes.setLength(parseInt(input));
      // action.UpdateStructure({
      //   ...props.attributes,
      //   length: parseInt(length),
      // });
    }
  };

  const handleDeletion = () => {
    action.DeleteStructure({ ...props.attributes });
  };

  const handleColorChange = (event) => {
    event.preventDefault();
    action.UpdateStructure({ ...props.attributes, colors: formcolors });
  };

  const handleRandomFill = () => {
    const randomArray = props.attributes.allocations.map((alo) => {
      if (alo.block.value === undefined || alo.block.value === null) {
        return {
          ...alo,
          block: {
            value: Math.floor(Math.random() * 100),
            bId: Math.floor(Math.random()*1000000),
          },
        };
      }
      return alo;
    });

    props.attributes.updateAllocations(randomArray);
    console.log(randomArray);
  };

  const handleShuffle = () => {
    const shuffledArray = props.attributes.allocations.sort(
      () => Math.random() - 0.5
    );

    for (let i = 0; i < shuffledArray.length; i++) {
      shuffledArray[i].index = i;
    }
    props.attributes.updateAllocations(shuffledArray);
  };

  const handleSort = () => {
    const sortedArray = props.attributes.allocations.sort((a, b) => {
      if (a.block.value === null || a.block.value === undefined) {
        return 1;
      }
      if (b.block.value === null || b.block.value === undefined) {
        return -1;
      }
      return a.block.value - b.block.value;
    });

    for (let i = 0; i < sortedArray.length; i++) {
      sortedArray[i].index = i;
    }

    props.attributes.updateAllocations(sortedArray);
  };

  const handleReverse = () => {
    const reversedArray = props.attributes.allocations.reverse();
    for (let i = 0; i < reversedArray.length; i++) {
      reversedArray[i].index = i;
    }

    props.attributes.updateAllocations(reversedArray);
  };

  const selectAlgorithm = (type) => {
    setSelectedAlgorithm({
      type: type,
      schedule: [],
      passes: [],
    });
  };

  return (
    <motion.div className="ContextWindow">
      <motion.div
        initial={{ x: -8, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.1 }}
        className="Preview"
        style={{ justifyContent: "left", padding: "0px 10px 0px 10px" }}
      >
        {/* <p className="PreviewPara">
            ID:{props.attributes.id}, X:{props.attributes.coords.x}, Y:
            {props.attributes.coords.y}
          </p> */}
        <div
          className="ArrayContainer"
          style={{
            background: `linear-gradient(90deg, ${props.attributes.colors.color1} 0%, ${props.attributes.colors.color2} 100%)`,
          }}
        >
          <div className="ArrayDrag"></div>
          {props.attributes.allocations.map((alo) => {
            return (
              <div
                key={alo.id}
                className="Alokashun"
                style={{
                  background: !(alo.block.value === undefined || alo.block.value === null) ? "#ffffff" : "#ffffff6a",
                }}
              >
                {/* <div className="NdexKuntaner"><p className="NKPara">{alo.block.value}</p></div> */}
                {!(alo.block.value === undefined || alo.block.value === null) && (
                  <div className="NdexKuntaner">
                    <p className="NKPara">{alo.block.value}</p>
                  </div>
                )}
                {!(alo.block.value === undefined || alo.block.value === null) ? (
                  <p className="NdicksSmall">{alo.index}</p>
                ) : (
                  <p className="NdicksLarge">{alo.index}</p>
                )}
              </div>
            );
          })}
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
        <label className="label1">Length</label>
        <motion.input
          type="text"
          className="input1"
          value={length}
          onChange={(event) => {
            setLength(event.target.value);
          }}
        ></motion.input>
        <input
          type="button"
          className="colorReset"
          value=""
          onClick={(event) => {
            handleLengthChange(event);
          }}
        ></input>
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
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.1 }}
        className="QuickActions"
      >
        <p>Quick Actions</p>
        <div className="QuickActionsHolder">
          <input
            onClick={handleRandomFill}
            type="button"
            className="QuickAction"
            value="Randomise Fill"
            style={{ background: "#2b0a0a" }}
          ></input>
          <input
            onClick={handleShuffle}
            type="button"
            className="QuickAction"
            value="Shuffle Indexes"
            style={{ background: "#0a0a3c" }}
          ></input>
          <input
            onClick={handleSort}
            type="button"
            className="QuickAction"
            value="Instantly sort"
            style={{ background: "#0a2b0a" }}
          ></input>
          <input
            onClick={handleReverse}
            type="button"
            className="QuickAction"
            value="Reverse"
            style={{ background: "#2b2b0a" }}
          ></input>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.1 }}
        className="QuickActions"
      >
        <p>Algorithms</p>
        <div className="QuickActionsHolder">
          <input
            onClick={() => {
              selectAlgorithm("Bubble sort");
              props.attributes.ScheduleBubbleSort();
            }}
            type="button"
            className="QuickAction"
            value="Bubble    Sort"
            style={{
              background: "linear-gradient(45deg, #00F260, #0575e6)",
              color: "black",
              fontSize: "12px",
            }}
          ></input>
          <input
            onClick={() => {
              selectAlgorithm("Insertion sort");
              props.attributes.InsertionSort();
            }}
            type="button"
            className="QuickAction"
            value="Insertion Sort"
            style={{
              background: "linear-gradient(45deg, #654ea3, #eaafc8)",
              color: "black",
              fontSize: "12px",
            }}
          ></input>
          <input
            onClick={() => {
              selectAlgorithm("Selection sort");
              props.attributes.SelectionSort();
            }}
            type="button"
            className="QuickAction"
            value="Selection Sort"
            style={{
              background: "linear-gradient(45deg, #c02425, #f0cb35)",
              color: "black",
              fontSize: "12px",
            }}
          ></input>
        </div>
      </motion.div>
      {SelectedAlgorithm && (
        <motion.div className="AnimationsContainer">
          <motion.div className="SchedulerHeader">
            <p>{SelectedAlgorithm.type}</p>
          </motion.div>
          <motion.div className="SchedulerBody"></motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
