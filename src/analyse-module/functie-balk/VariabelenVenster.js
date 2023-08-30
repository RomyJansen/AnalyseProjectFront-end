import {useEffect, useState} from "react";
import {getAllAfstanden, getAllData} from "../../data/REST";

export function VariabelenVenster(){

    const [variabelen, setVariabelen] = useState();
    const [afstanden, setAfstanden ] = useState("loading...");

    class Variabele{
        id;
        name;
        value;

        constructor(id, name, value) {
            this.id = id;
            this.name = name;
            this.value = value;
        }
    }

    useEffect(() => {
        setVariabelen(getAfstanden())
    }, [])

    async function getAfstanden(){
        setAfstanden(await getAllAfstanden())
    }

    // const mockVars = [];
    // for (let i = 0; i < 10; i++) {
    //     mockVars.push(new Variabele(i, "name" + i, i*i))
    // }

    return (
        <div id={"variabelen-venster"}>
            <p>*variabelen*</p>
            {/*{mockVars && mockVars.map((vars,index) => (*/}
            {/*    <p>{vars.name} - {vars.value}</p>*/}
            {/*))}*/}
            {(afstanden !== "loading...") && afstanden.map((vars, index) => (
                <p>{vars.id} - {vars.naam}</p>
            ))}
            <p>{JSON.stringify(afstanden)}</p>
            <p>{JSON.stringify(variabelen)}</p>
        </div>
    )
}
