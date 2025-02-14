

export function createURL(location = "mumbai"){
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QXH7A3BEGZDMJ2TM44XD7YBKM`
};

export async function fetchData(url){

    try{
        let gotResponse = await fetch(url);

        if (!gotResponse.ok){
            throw new Error(`HTTP Error! Status: ${gotResponse.status}`);
        }

        let data = await gotResponse.json();
        return data;
    } catch(error){
        console.error("Fetch Error:", error);
        return null;
    };

}