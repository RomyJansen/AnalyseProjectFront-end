import React, {useEffect, useState} from "react";
import "./styles.css";
import "./data/REST";
import {REST} from "./data/REST";
import {Kaart} from "./kaart/kaart";

export default function App() {
    // const [grid, setGrid] = useState(Array.from({ length: 15 }, () => Array.from({ length: 30 }, () => "empty")));
    //
    // useEffect(() => {
    //     console.log("lolz");
    // }, [grid])
    //
    // const handleCellClick = (row, col) => {
    //     const newGrid = [...grid];
    //     // toggle the cell between "empty" and "tree" roles
    //     newGrid[row][col] = newGrid[row][col] === "empty" ? "tree" : "empty";
    //     setGrid(newGrid);
    //
    //     console.log(REST(JSON.stringify({ row, col, role: newGrid[row][col] })));
    //     // send a POST request to the backend to update the role of the cell
    //
    // };

    return (
        <div>
            <Kaart />
        </div>



        // <div className="App">
        //     <table>
        //         <tbody>
        //         {grid.map((row, rowIndex) => (
        //             <tr key={rowIndex}>
        //                 {row.map((cell, colIndex) => (
        //                     <td
        //                         key={colIndex}
        //                         onClick={() => handleCellClick(rowIndex, colIndex)}
        //                         className={cell}
        //                         style={{ backgroundColor: cell === "tree" ? "green" : "white" }}
        //                     />
        //                 ))}
        //             </tr>
        //         ))}
        //         </tbody>
        //     </table>
        // </div>
    );
}
