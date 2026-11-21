async function searchLocation() { // Create asyn function to use await function
    
    const params = new URLSearchParams( // Define param to be kelowna, BC
        {
        q: "Kelowna, BC",
        format: "jsonv2",
        limit: 5
        }
    );

    // Create the url with parms already define
    const url = "https://nominatim.openstreetmap.org/search?" + params; 

    try {
    
        // Wait for the HTTP response from the API
        const response = await fetch(url);

        // Check if the status of the repsonse and show it in case it got stop
        if (!response.ok){
            throw new Error("HTTP "+response.status);
        }

        // Wait for the data of the response
        const data = await response.json();

        // Show the data recieve from the API
        console.log(data);

    } catch (error) { // Show if any eror is find during the process
        console.log("Error:", error.message); 
    }
}

// Call the function
searchLocation();

