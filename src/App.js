import { SandboxMain } from "./SandboxComponents/SBMain";
import "./App.css";
import React from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// const Shape = ({ shape, color, size }) => {
//   const ref = React.useRef();
//   const [position, setPosition] = React.useState([
//     Math.random() * 10 - 5,
//     Math.random() * 10 - 5,
//     0,
//   ]);
//   const [velocity, setVelocity] = React.useState([
//     Math.random() * 0.02 - 0.01,
//     Math.random() * 0.02 - 0.01,
//   ]);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setPosition(([x, y]) => {
//         const nextX = x + velocity[0];
//         const nextY = y + velocity[1];
//         if (nextX > 5 || nextX < -5) setVelocity(([vx]) => [-vx, velocity[1]]);
//         if (nextY > 5 || nextY < -5)
//           setVelocity(([_, vy]) => [velocity[0], -vy]);
//         return [nextX, nextY];
//       });
//     }, 16);
//     return () => clearInterval(interval);
//   }, []);

//   let geometry;
//   switch (shape) {
//     case "circle":
//       geometry = <circleBufferGeometry args={[size / 2]} />;
//       break;
//     case "square":
//       geometry = <boxBufferGeometry args={[size, size]} />;
//       break;
//     case "triangle":
//       geometry = (
//         <bufferGeometry>
//           <bufferAttribute
//             attachObject={["attributes", "position"]}
//             count={3}
//             array={
//               new Float32Array([
//                 0,
//                 size / Math.sqrt(3),
//                 size / 2,
//                 -size / (2 * Math.sqrt(3)),
//                 -size / 2,
//                 -size / (2 * Math.sqrt(3)),
//               ])
//             }
//             itemSize={2}
//           />
//         </bufferGeometry>
//       );
//       break;
//     default:
//       throw new Error(`Invalid shape: ${shape}`);
//   }

//   return (
//     <mesh position={position} ref={ref}>
//       {geometry}
//       <meshBasicMaterial color={color} side={THREE.DoubleSide} />
//     </mesh>
//   );
// };

// function Box(props) {
//   const mesh = useRef();
//   const speed = 0.002;
//   let dx = speed + props.off * 0.001;
//   let dy = -speed + props.off * 0.002;
//   useFrame(({ size }) => {
//     mesh.current.position.x += dx;
//     mesh.current.position.y += dy;
//     // console.log(mesh.current.position.x+" "+mesh.current.position.y)
//     if (mesh.current.position.x > 2 || mesh.current.position.x < -2) {
//       // console.log("X");
//       dx = -dx;
//     }
//     if (mesh.current.position.y > 2 || mesh.current.position.y < -2) {
//       // console.log("Y");
//       dy = -dy;
//     }
//   });
//   return (
//     <mesh {...props} ref={mesh}>
//       <planeBufferGeometry attach="geometry" args={[0.2, 0.2]} />
//       <meshBasicMaterial attach="material" color={"orange"} />
//     </mesh>
//   );
// }

// function App() {
//   return (
//     <Canvas style={{ width: "100vw", height: "100vh" }}>
//       {[...Array(5)].map((_, i) => (
//         <Box key = {i} off = {i} position={[0, 0, 0]} />
//       ))}
//     </Canvas>
//   );
// }

// function Shape({ type, color, position }) {
//   const mesh = useRef();
//   const shape = useMemo(() => {
//     switch (type) {
//       case "square":
//         return new THREE.Shape().absarc(0, 0, 5, 0, Math.PI * 2);
//       case "circle":
//         return new THREE.Shape()
//           .moveTo(-5, -5)
//           .lineTo(5, -5)
//           .lineTo(5, 5)
//           .lineTo(-5, 5)
//           .closePath();
//       case "triangle":
//         return new THREE.Shape()
//           .moveTo(-5, -5)
//           .lineTo(0, 5)
//           .lineTo(5, -5)
//           .closePath();
//       default:
//         return null;
//     }
//   }, [type]);
//   return (
//     <mesh position={position} ref={mesh}>
//       <shapeBufferGeometry attach="geometry" args={[shape]} />
//       <meshBasicMaterial attach="material" color={color} />
//     </mesh>
//   );
// }

// function Line({ start, end }) {
//   const points = useMemo(
//     () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
//     [start, end]
//   );
//   return (
//     <line>
//       <bufferGeometry attach="geometry">
//         <bufferAttribute
//           attachObject={["attributes", "position"]}
//           count={points.length}
//           array={new Float32Array(points.flat())}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <lineBasicMaterial attach="material" color={"black"} />
//     </line>
//   );
// }

// export default function App() {
//   const clusters = useMemo(
//     () =>
//       [...Array(5)].map(() => ({
//         position: [
//           Math.random() * window.innerWidth - window.innerWidth / 2,
//           Math.random() * window.innerHeight - window.innerHeight / 2,
//         ],
//         shapes: [
//           { type: "square", color: "red" },
//           { type: "circle", color: "blue" },
//           { type: "triangle", color: "green" },
//         ],
//       })),
//     []
//   );
//   return (
//     <Canvas
//       style={{ width: "100vw", height: "100vh" }}
//       orthographic
//       camera={{
//         left: -window.innerWidth / 2,
//         right: window.innerWidth / 2,
//         top: window.innerHeight / 2,
//         bottom: -window.innerHeight / 2,
//       }}
//     >
//       {clusters.map((cluster) =>
//         cluster.shapes.map((shape) => (
//           <>
//             <Shape
//               key={`${shape.type}-${shape.color}`}
              
//               {...shape}
//               position={[
//                 cluster.position[0] + (Math.random() - 0.5) * 50,
//                 cluster.position[1] + (Math.random() - 0.5) * 50, 1
//               ]}
//             />
//             {clusters
//               .filter((c) => c !== cluster)
//               .map((c) => (
//                 <Line
//                   key={`${c.position}-${cluster.position}`}
//                   start={cluster.position}
//                   end={c.position}
//                 />
//               ))}
//           </>
//         ))
//       )}
//     </Canvas>
//   );
// }

// function Box(props) {
//   const mesh = useRef()

//   useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001))
//   return (
//     <mesh {...props} ref={mesh}>
//       <planeBufferGeometry attach="geometry" args={[0.2, 0.2]} />
//       <meshStandardMaterial attach="material" color={'#000000'} />
//     </mesh>
//   )
// }

// const App = () => {
//   return (
//     <Canvas style={{height:"100vh"}}>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       {[...Array(100)].map((_, i) => (
//         <Box key={i} position={[Math.random() * 10 - 5, Math.random() * 10 - 5, 1]} />
//       ))}
//     </Canvas>
//   )
// };

export default function App(){
  return(
     <SandboxMain></SandboxMain>
  )
}
