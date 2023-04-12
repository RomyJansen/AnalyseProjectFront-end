import React, { useState } from "react";
import "./styles.css";

export default function App() {
    const [grid, setGrid] = useState(Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => "empty")));

    const handleCellClick = (row, col) => {
        const newGrid = [...grid];
        // toggle the cell between "empty" and "tree" roles
        newGrid[row][col] = newGrid[row][col] === "empty" ? "tree" : "empty";
        setGrid(newGrid);
        // send a POST request to the backend to update the role of the cell
        fetch("http://localhost:8000/update-cell", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ row, col, role: newGrid[row][col] })
        });
    };

    return (
        <div className="App">
            <table>
                <tbody>
                {grid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td
                                key={colIndex}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                className={cell}
                                style={{ backgroundColor: cell === "tree" ? "green" : "white" }}
                            />
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
