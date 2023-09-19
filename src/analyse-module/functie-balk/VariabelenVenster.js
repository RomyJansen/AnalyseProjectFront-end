import {useEffect, useState} from "react";
import {getAllAfstanden, getAllData} from "../../data/REST";
import {getJaar} from "../state";

export function VariabelenVenster(){

    const [variabelen, setVariabelen] = useState("loading...");
    const [afstanden, setAfstanden ] = useState("loading...");
    const [berekendeVariabelen, setBerekendeVariabelen] = useState("loading...")

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
        getAfstanden();
    }, [getJaar()])

    async function getAfstanden(){
        setAfstanden(await getAllAfstanden())
    }

    const determineObjectType = (vars) =>{
        switch(vars.doelObjectType){
            case 1: return "huis";
            break;
            case 2: return "park";
            break;
            default: return"default";
        }
    }

    const determineLowestValue = (results) => {
        let lowest;
        for (let i = 0; i < results.length; i++) {
            if((lowest == null && results[i].waarde > 0) || (results[i].waarde < lowest && results[i].waarde > 0)) lowest = results[i].waarde;
        }
        if (lowest == null) return "geen waarde"
        return lowest
    }

    // const mockVars = [];
    // for (let i = 0; i < 10; i++) {
    //     mockVars.push(new Variabele(i, "name" + i, i*i))
    // }

    return (
        <div id={"variabelen-venster"} >
            {/*{mockVars && mockVars.map((vars,index) => (*/}
            {/*    <p>{vars.name} - {vars.value}</p>*/}
            {/*))}*/}
            <table border="1" width="100%">
                <tbody>
                <p style={{fontWeight: "bold"}}>Algemeen</p>
                {(variabelen !== "loading...") && variabelen.map((vars, index) => (
                    <tr>
                    <p>{vars.id} - {vars.naam}<br/>
                    </p>
                    </tr>
                ))}
                {(variabelen == "loading...") && variabelen}
                </tbody>
            </table>
            <table border="1" width="100%">
                <tbody>
                <p style={{fontWeight: "bold"}}>Afstand</p>
                {(afstanden !== "loading...") && afstanden.map((vars, index) => (
                    <tr>
                        <p>{vars.id} - {vars.naam}<br/>
                            <p style={{fontStyle: "italic"}}>afstand van object {vars.objectLink} tot dichtsbijzijnde {determineObjectType(vars)}</p>
                            <p style={{fontWeight: "bold",fontStyle: "italic"}}>waarde: {determineLowestValue(vars.results)}</p>
                        </p>
                    </tr>
                ))}
                {(afstanden == "loading...") && afstanden}
                </tbody>
            </table>
            <table border="1" width="100%">
                <tbody>
                <p style={{fontWeight: "bold"}}>Berekend</p>
                {(berekendeVariabelen !== "loading...") && berekendeVariabelen.map((vars, index) => (
                    <tr>
                        <p>{vars.id} - {vars.naam}<br/>
                        </p>
                    </tr>
                ))}
                {(berekendeVariabelen == "loading...") && berekendeVariabelen}
                </tbody>
            </table>


        </div>
    )
}
