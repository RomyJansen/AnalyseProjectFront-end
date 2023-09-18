import {useEffect, useState} from "react";
import {getAllAfstanden, getAllGebeurtenissen, getAllObjectGebeurtenissen} from "../../data/REST";

export function GebeurtenissenVenster(){

    const [gebeurtenissen, setGebeurtenissen] = useState("loading...");
    const [objectGebeurtenissen, setObjectGebeurtenissen] = useState("loading...");

    useEffect(() => {
        getGebeurtenissen()
        getObjectGebeurtenissen()
    }, [])

    async function getGebeurtenissen(){
        setGebeurtenissen(await getAllGebeurtenissen())
    }

    async function getObjectGebeurtenissen(){
        setObjectGebeurtenissen(await getAllObjectGebeurtenissen())
    }

    return(
        <div id={"gebeurtenissen-venster"}>
            <p>*gebeurtenissen*</p>
            {/*{mockVars && mockVars.map((vars,index) => (*/}
            {/*    <p>{vars.name} - {vars.value}</p>*/}
            {/*))}*/}
            {/*{(gebeurtenissen !== "loading...") && gebeurtenissen.map((vars, index) => (*/}
            {/*    <p>{vars.id} - {vars.naam}</p>*/}
            {/*))}*/}
            <p>{JSON.stringify(gebeurtenissen)}</p>
            <p>{JSON.stringify(objectGebeurtenissen)}</p>
        </div>
    )
}
