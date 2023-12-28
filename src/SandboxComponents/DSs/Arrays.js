import React, { useEffect, useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useAnimation,
  useDragControls,
} from "framer-motion";
import "./Array.css";

const Index = (props) => {
  const colors = ["white", "red", "blue", "cyan", "gold", "green", "white"];
  const [colorIndex, setColorIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (props.state === "Combat") {
      setColorIndex(4);
      // controls.start({
      //   x: [-5, 0, 5, -5, 0, 5, 0],
      //   transition: { duration: 0.1 },
      // });
    }
    if (props.state === "Victory") {
      setColorIndex(1);
      // controls.start({
      //   x: [-5, 0, 5, -5, 0, 5, 0],
      //   transition: { duration: 0.1 },
      // });
    }
    if (props.state === "Dormant") {
      setColorIndex(0);
    }
    if (props.state === "Refreshed") {
      controls.start({
        y: [5, -5, 0, -5, 5, -5, 5, 0, 5, 5, -5, 5, 0],
        transition: { duration: 0.4 },
      });

      let i = 0;
      const interval = setInterval(() => {
        setColorIndex(i);
        i = (i + 1) % colors.length;
        if (i === 0) {
          clearInterval(interval);
        }
      }, 400 / colors.length);
      return () => clearInterval(interval);
    }
  }, [props.state]);

  useEffect(() => {
    controls.start({
      y: [5, -5, 0, -5, 5, -5, 5, 0, 5, 5, -5, 5, 0],
      transition: { duration: 0.4 },
    });

    let i = 0;
    const interval = setInterval(() => {
      setColorIndex(i);
      i = (i + 1) % colors.length;
      if (i === 0) {
        clearInterval(interval);
      }
    }, 400 / colors.length);
    return () => clearInterval(interval);
  }, [props.value]);

  return (
    <motion.div
      drag
      onDragEnd={(event, info) => {
        const attributes = props.allo;
        const loc = { x: info.point.x - 24, y: info.point.y - 24 };
        props.handleDeletion({ attributes, loc });
      }}
      dragMomentum={false}
      className="NdexKuntaner"
    >
      {" "}
      <motion.p
        animate={controls}
        className="NKPara"
        style={{ color: colors[colorIndex] }}
      >
        {props.value}
      </motion.p>{" "}
    </motion.div>
  );
};

const Allocation = (props) => {
  const dragControls = useDragControls();

  const fillAllocation = () => {
    if (props.PickedUp.anything) {
      if (props.PickedUp.item.value && !props.value) {
        const block = props.PickedUp.item;
        const index = props.index;
        props.handleInsertion({ block, index });
      }
    }
  };

  return (
    <Reorder.Item
      dragListener={false}
      dragControls={dragControls}
      id={props.attributes}
      value={props.attributes}
      transition={{ duration: props.SwapSpeed, type: "spring" }}
    >
      <motion.div
        className="Alokashun"
        onMouseUp={fillAllocation}
        style={{
          background: !(props.value === null || props.value === undefined)
            ? "#ffffff"
            : "#ffffff6a",
        }}
      >
        {!(props.value === null || props.value === undefined) && (
          <Index
            handleDeletion={props.handleDeletion}
            state={props.State}
            allo={props.attributes}
            value={props.value}
          ></Index>
        )}
        {!(props.value === null || props.value === undefined) ? (
          <p
            onPointerDown={(event) => dragControls.start(event)}
            className="NdicksSmall"
          >
            {props.index}
          </p>
        ) : (
          <p
            onPointerDown={(event) => dragControls.start(event)}
            className="NdicksLarge"
          >
            {props.index}
          </p>
        )}
      </motion.div>
    </Reorder.Item>
  );
};

export const Array = (props, SendSelfRef) => {
  const ArrayRef = useRef();
  const dragControls = useDragControls();
  const [Allocations, setAllocations] = useState([]);
  const ReorderRef = useRef();
  const timer = useRef(null);
  var Values = [];
  var BIds = [];

  useEffect(() => {
    if (props.attributes.init) {
      setAllocations(() => {
        var l = [];
        for (let i = 0; i < props.attributes.length; i++) {
          l.push({
            id: i,
            index: i,
            block: {
              value:
                i < 2
                  ? props.attributes.init.values[i]
                  : props.attributes.values[i],
              bId:
                i < 2
                  ? props.attributes.init.blockIds[i]
                  : props.attributes.blockIds[i],
            },
            State: "Dormant",
            SwapSpeed: 0.5,
          });
        }
        return l;
      });
    }
  }, [props.attributes.init]);

  const packageUpdate = () => {
    const rect = ArrayRef.current.getBoundingClientRect();

    const values = [];
    const blockIds = [];
    Allocations.forEach((item) => {
      values.push(item.block.value);
    });
    Allocations.forEach((item) => {
      blockIds.push(item.block.bId);
    });
    const attributes = {
      type: "Array",
      id: props.attributes.id,
      coords: { x: rect.x, y: rect.y },
      length: Allocation.length,
      values: [...values],
      blockIds: [...blockIds],
      colors: props.attributes.colors,
    };

    // console.log(attributes.values);
    props.SendUpdate({ attributes });
  };

  const handleReorder = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // console.log("Reorder", Values);
      packageUpdate();
    }, 2000);
  };

  const handleInsertion = (attributes) => {
    const block = attributes.block;
    const pos = attributes.index;
    Values[pos] = block.value;
    BIds[pos] = block.id;

    setAllocations((prev) =>
      prev.map((item, index) => {
        if (index === pos) {
          return { ...item, block: { value: block.value, bId: block.id } };
        }
        return item;
      })
    );

    props.DeleteArrayBlock({ ...block });
    packageUpdate();
  };

  const handleDeletion = ({ attributes, loc }) => {
    // console.log(attributes)
    const pos = attributes.index;
    Values[pos] = null;
    BIds[pos] = null;

    props.CreateArrayBlock({
      id: attributes.block.bId,
      value: attributes.block.value,
      coords: { x: loc.x, y: loc.y },
    });

    setAllocations((prev) =>
      prev.map((item, index) => {
        if (index === pos) {
          return { ...item, block: { value: null, bId: null } };
        }
        return item;
      })
    );
  };

  const handleLengthChange = (Length) => {
    // console.log(props.attributes)
    const CutoffBlocks = { values: [], blockIds: [] };
    const rect = ArrayRef.current.getBoundingClientRect();
    if (Length > Allocations.length) {
      for (let i = Allocations.length; i < Length; i++) {
        setAllocations((prev) => [
          ...prev,
          {
            id: i,
            index: i,
            block: { value: null, bId: null },
            State: "Dormant",
            SwapSpeed: 0.5,
          },
        ]);
      }
    } else {
      // console.log(Allocations.length, props.attributes.length)
      for (let i = Length; i < Allocations.length; i++) {
        // console.log(i);
        if (Allocations[i].block.value) {
          CutoffBlocks.values.push(Allocations[i].block.value);
          CutoffBlocks.blockIds.push(Allocations[i].block.bId);
        }
      }
      setAllocations((prev) => prev.slice(0, Length));
    }

    // console.log(CutoffBlocks);

    for (let i = 0; i < CutoffBlocks.values.length; i++) {
      props.CreateArrayBlock({
        id: CutoffBlocks.blockIds[i],
        value: CutoffBlocks.values[i],
        coords: { x: rect.x + 50 * i, y: rect.y - 50 },
      });
    }

    packageUpdate();

  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const PitAgainst = (a, b) => {
    setAllocations((prevAllocations) =>
      prevAllocations.map((allocation, i) => {
        if (i === a || i === b) {
          return { ...allocation, State: "Combat", SwapSpeed: 0.9 };
        }
        return allocation;
      })
    );
  };

  const UnpitAgainst = (a, b) => {
    setAllocations((prevAllocations) =>
      prevAllocations.map((allocation, i) => {
        if (i === a || i === b) {
          return { ...allocation, State: "Dormant", SwapSpeed: 0.5 };
        }
        return allocation;
      })
    );
  };

  const UnpitAll = () => {
    setAllocations((prevAllocations) =>
      prevAllocations.map((allocation, i) => {
        return { ...allocation, State: "Dormant", SwapSpeed: 0.5 };
      })
    );
  };

  const SetVictory = (a) => {
    setAllocations((prevAllocations) =>
      prevAllocations.map((allocation, i) => {
        if (i === a) {
          return { ...allocation, State: "Victory", SwapSpeed: 0.9 };
        }
        return allocation;
      })
    );
  };

  const Swap = (a, b) => {
    setAllocations((prevAllocations) => {
      const newAllocations = [...prevAllocations];
      [newAllocations[a], newAllocations[b]] = [
        newAllocations[b],
        newAllocations[a],
      ];
      newAllocations[a].index = a;
      newAllocations[b].index = b;
      return newAllocations;
    });
  };

  async function SelectionSort() {
    const Duplicate = Allocations;
    for (let i = 0; i < Duplicate.length - 1; i++) {
      UnpitAll();
      let minIndex = i;
      for (let j = i + 1; j < Duplicate.length; j++) {
        PitAgainst(minIndex, j);
        await sleep(800);
        if (Duplicate[j].block.value < Duplicate[minIndex].block.value) {
          minIndex = j;
        }
        UnpitAgainst(minIndex, j);
        await sleep(50);
      }
      if (minIndex !== i) {
        SetVictory(minIndex);
        await sleep(800);
        const temp = Duplicate[i];
        Duplicate[i] = Duplicate[minIndex];
        Duplicate[minIndex] = temp;
        Swap(i, minIndex);
        await sleep(1500);
      }
    }
    UnpitAll();
    for (let i = 0; i < Allocations.length; i++) {
      const allo = Allocations[i];
      await sleep(25);
      setAllocations((prev) => {
        return prev.map((allocation, j) => {
          if (i === j) {
            return {
              ...allocation,
              State: "Refreshed",
            };
          }
          return allocation;
        });
      });
    }
  }

  async function InsertionSort(timeMod) {
    const Duplicate = Allocations;
    for (let i = 1; i < Duplicate.length; i++) {
      UnpitAll();
      let j = i;
      while (j > 0 && Duplicate[j - 1].block.value > Duplicate[j].block.value) {
        PitAgainst(j - 1, j);
        await sleep(800);
        SetVictory(j);
        await sleep(800);
        const temp = Duplicate[j];
        Duplicate[j] = Duplicate[j - 1];
        Duplicate[j - 1] = temp;
        Swap(j, j - 1);
        await sleep(1500);
        UnpitAgainst(j - 1, j);
        await sleep(50);
        j--;
      }
    }
    UnpitAll();

    for (let i = 0; i < Allocations.length; i++) {
      const allo = Allocations[i];
      await sleep(25);
      setAllocations((prev) => {
        return prev.map((allocation, j) => {
          if (i === j) {
            return {
              ...allocation,
              State: "Refreshed",
            };
          }
          return allocation;
        });
      });
    }
  }

  async function BubbleSort(timeMod) {
    // const timeMod = 1;
    console.log("HI");
    const Duplicate = Allocations;
    var swapped;
    for (let i = 0; i < Duplicate.length; i++) {
      UnpitAll();
      swapped = 0;
      for (let j = 0; j < Duplicate.length - 1; j++) {
        UnpitAll();
        PitAgainst(j, j + 1);
        await sleep(800);
        if (Duplicate[j].block.value > Duplicate[j + 1].block.value) {
          SetVictory(j + 1);
          await sleep(800);
          swapped = 1;
          const temp = Duplicate[j];
          Duplicate[j] = Duplicate[j + 1];
          Duplicate[j + 1] = temp;
          Swap(j, j + 1);
          await sleep(1500);
        }
        UnpitAgainst(i, j);
        await sleep(50);
      }
      if (swapped === 0) {
        break;
      }
    }
    UnpitAll();

    for (let i = 0; i < Allocations.length; i++) {
      const allo = Allocations[i];
      await sleep(25);
      setAllocations((prev) => {
        return prev.map((allocation, j) => {
          if (i === j) {
            return {
              ...allocation,
              State: "Refreshed",
            };
          }
          return allocation;
        });
      });
    }
  }

  useEffect(() => {
    if (props.Observing.id === props.attributes.id) {
      props.setObserving({
        ...props.attributes,
        allocations: [...Allocations],
        updateAllocations: setAllocations,
        setLength: handleLengthChange,
        ScheduleBubbleSort: BubbleSort,
        InsertionSort: InsertionSort,
        SelectionSort: SelectionSort,
      });
    }
  }, [Allocations, props.attributes.length, props.attributes.colors]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      ref={ArrayRef}
      className="ArrayContainer"
      style={{
        position: "absolute",
        x: props.attributes.coords.x,
        y: props.attributes.coords.y,
        background: `linear-gradient(90deg, ${props.attributes.colors.color1} 0%, ${props.attributes.colors.color2} 100%)`,
      }}
      onDoubleClick={() => {
        props.setObserving({
          ...props.attributes,
          allocations: [...Allocations],
          updateAllocations: setAllocations,
          setLength: handleLengthChange,
          ScheduleBubbleSort: BubbleSort,
          InsertionSort: InsertionSort,
          SelectionSort: SelectionSort,
        });
      }}
    >
      <motion.div
        onPointerDown={(event) => dragControls.start(event)}
        onDoubleClick={() => {
          props.setObserving({
            ...props.attributes,
            allocations: [...Allocations],
            updateAllocations: setAllocations,
            setLength: handleLengthChange,
            ScheduleBubbleSort: BubbleSort,
            InsertionSort: InsertionSort,
            SelectionSort: SelectionSort,
          });
        }}
        className="ArrayDrag"
      ></motion.div>
      <AnimatePresence>
        <Reorder.Group
          axis="x"
          onReorder={(newOrder) => {
            setAllocations((prev) =>
              newOrder.map((item, index) => ({ ...item, index: index }))
            );
          }}
          onMouseUp={handleReorder}
          values={Allocations}
          ref={ReorderRef}
        >
          {Allocations.map((alo) => {
            return (
              <Allocation
                key={alo.id}
                attributes={alo}
                value={alo.block.value}
                index={alo.index}
                handleInsertion={handleInsertion}
                handleDeletion={handleDeletion}
                PickedUp={props.PickedUp}
                State={alo.State}
                SwapSpeed={alo.SwapSpeed}
              ></Allocation>
            );
          })}
        </Reorder.Group>
      </AnimatePresence>
    </motion.div>
  );
};
