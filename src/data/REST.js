export async function REST(json) {
    await fetch("http://localhost:8000/update-cell", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: json
    });
    const response = await fetch("http://localhost:8000/db", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id1: 1
        })
    });

    const data = await response.json();
    console.log(data);
}

export async function getAllData(id){
    const response = await fetch("http://localhost:8000/bv/" + id, {
        method: "GET"
    })
    const data = await response.json();
    console.log(data);
    return data;
}
