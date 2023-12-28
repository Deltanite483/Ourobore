import React, { useState, useEffect, useRef } from "react";
import { Context } from "./ContextBar/ContextBar";
import { ArrayManager } from "./ArrayManager";

export const Manager = ({ setBrushDrop }) => {
  const ArrayManagerRef = useRef();
  
  const [Observing, setObserving] = useState({
    type: null,
  });

  const BrushPlace = (name, x, y) => {
    if (name === "Array") {
      ArrayManagerRef.current.CreateHomelessArrayBlock(name, x, y);
    }
  };

  const UpdateStructure = (props) => {
    setObserving(props)
    if (props.type === "BlockArr") {
      ArrayManagerRef.current.UpdateHomelessArrayBlock(props);
    }
    if(props.type === "Array"){
      // console.log(props)
      const attributes = props;
      ArrayManagerRef.current.UpdateArray({attributes});
    }
  };

  const DeleteStructure = (props) => {
    setObserving({
      type: null,
    });

    if (props.type === "BlockArr") {
      ArrayManagerRef.current.DeleteHomelessArrayBlock(props);
    }
    if(props.type === "Array"){
      ArrayManagerRef.current.DeleteArray(props);
    }
  };

  useEffect(() => {
    setBrushDrop(() => BrushPlace);
  }, [setBrushDrop]);

  return (
    <div className="background">
      <Context Observing={Observing} UpdateStructure={UpdateStructure} DeleteStructure={DeleteStructure}></Context>
      <ArrayManager
        ref={ArrayManagerRef}
        Observing={Observing}
        setObserving={setObserving}
      ></ArrayManager>
    </div>
  );
};
