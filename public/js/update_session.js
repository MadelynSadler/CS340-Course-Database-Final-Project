
// Get the objects we need to modify
let updateSessionForm = document.getElementById('update-session-form-ajax');

// Modify the objects we need
updateSessionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDay = document.getElementById("mySelect");
    let inputTopic = document.getElementById("input-topic-update");

    // Get the values from the form fields
    let dayValue = inputDay.value;
    let topicValue = inputTopic.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for topic

    if (isNaN(topicValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        day: dayValue,
        topic: topicValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-session-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, dayValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, sessionID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sessions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == sessionID) {

            // Get the location of the row where we found the matching session ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of week value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign week to our value we updated to
            td.innerHTML = parsedData[0].day; //DB
       }
    }
}