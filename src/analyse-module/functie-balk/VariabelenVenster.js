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

    // useEffect(() => {
    //     let isMounted = true;
    //     fetchData();
    //     return () => {
    //         isMounted = false;
    //     };
    //
    //     // simulate some Web API fetching
    //     function fetchData() {
    //         setTimeout(async () => {
    //             // drop "if (isMounted)" to trigger error again
    //             // (take IDE, doesn't work with stack snippet)
    //             if (isMounted) setAfstanden(await getAllAfstanden())
    //             else console.log("aborted setState on unmounted component")
    //         }, 4000);
    //     }
    // }, []);

    // async function getData() {
    //     setVariabelen(await getAllData());
    // }
    //
    async function getAfstanden(){
        setAfstanden(await getAllAfstanden())
    }

    // function get_variabelen(){
    //     var data = getAllData();
    //     // eslint-disable-next-line no-restricted-globals
    //     var newVar = new Variabele(data, data[0][1], 0);
    //     let varList = [];
    //     varList.push(newVar);
    //     setVariabelen(varList);
    // }

    const mockVars = [];
    for (let i = 0; i < 10; i++) {
        mockVars.push(new Variabele(i, "name" + i, i*i))
    }

    return (
        <div id={"variabelen-venster"}>
            <p>*variabelen*</p>
            {getAfstanden()}
            {/*{mockVars && mockVars.map((vars,index) => (*/}
            {/*    <p>{vars.name} - {vars.value}</p>*/}
            {/*))}*/}
            {/*{afstanden && afstanden.map((vars, index) => (*/}
            {/*    <p>{vars.naam} - {vars.id}</p>*/}
            {/*))}*/}
            <p>{JSON.stringify(afstanden)}</p>
            <p>{JSON.stringify(variabelen)}</p>
        </div>
    )
}
