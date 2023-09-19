import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { getJaar } from '../state';
import { getAllObjects } from '../../data/REST';

const Kaart = () => {
    const gridSizeX = 80; // adjust as needed
    const gridSizeY = 40; // adjust as needed
    const gridSpacing = 30; // adjust as needed
    const [objecten, setObjecten] = useState("loading...");

    useEffect(() => {
        getObjecten();
    }, [getJaar()]);

    async function getObjecten() {
        setObjecten(await getAllObjects());
    }

    return (
        <Stage width={gridSizeX * gridSpacing} height={gridSizeY * gridSpacing}>
            <Layer>
                {/* Render grid */}
                {Array.from({ length: gridSizeX * gridSizeY }).map((_, index) => (
                    <Rect
                        key={`grid-${index}`}
                        x={(index % gridSizeX) * gridSpacing}
                        y={Math.floor(index / gridSizeX) * gridSpacing}
                        width={gridSpacing}
                        height={gridSpacing}
                        stroke="#ddd" // grid line color
                        strokeWidth={1} // grid line width
                    />
                ))}

                {/* Render objecten */}
                {objecten !== "loading..." &&
                    objecten.map((vars) => (
                        <Group key={`object-${vars.id}`}>
                            <Rect
                                x={(vars.locatieX / 50) * gridSpacing}
                                y={(vars.locatieY / 50) * gridSpacing}
                                width={(vars.grootteX / 10) * gridSpacing}
                                height={(vars.grootteY / 10) * gridSpacing}
                                fill={vars.objectType === 1 ? "orange" : "green"}
                                stroke="black"
                            />
                            <Text
                                text={vars.id.toString()} // Convert to string if needed
                                x={(vars.locatieX / 50) * gridSpacing + ((vars.grootteX / 10) * gridSpacing) / 2.5}
                                y={(vars.locatieY / 50) * gridSpacing + ((vars.grootteY / 10) * gridSpacing) / 2.5}
                                fill="white"
                                fontSize={15}
                            />
                        </Group>
                    ))}

            </Layer>
        </Stage>
    );
};

export default Kaart;
