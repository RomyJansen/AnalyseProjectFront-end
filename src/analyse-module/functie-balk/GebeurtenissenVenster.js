import {useState} from "react";

export function GebeurtenissenVenster(){

    const [gebeurtenissen, setGebeurtenissen] = useState();


    return(
        <div id={"gebeurtenissen-venster"}>
            <p>*gebeurtenissen*</p>

        </div>
    )
}
