/*
All code found in this file is based on the osu-cs340-ecampus nodejs-starter-app repo found here:
https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteRegistration(registrationID) {
    // Put our data we want to send in a javascript object
    let data = {
        registrationID: registrationID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-registration-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(registrationID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(registrationID){

    let table = document.getElementById("registration-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == registrationID) {
            table.deleteRow(i);
            break;
       }
    }
}