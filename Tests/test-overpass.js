async function searchParks() { // Create asyn function to use await function
 
    // Define the Overpass Query Language query
   const query = `
        [out:json][timeout:15];
        node(49.8880,-119.4960,49.8890,-119.4950);
        out 10;
    `;

    // Define the parms for the url search
    const params = new URLSearchParams({
        data: query
    });

    const url = "https://overpass.private.coffee/api/interpreter?" + params;

    try {
        console.log("Searching Parks...");

        const startTime = performance.now();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.json();

        const endTime = performance.now();

        console.log("HTTP Status:", response.status);
        console.log("Loading Time:", ((endTime - startTime) / 1000).toFixed(2), "seconds");
        console.log("Results:", data.elements.length);
        console.log(data.elements);

    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Call the function
searchParks();


