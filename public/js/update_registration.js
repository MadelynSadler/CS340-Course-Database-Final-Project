
// Get the objects we need to modify
let updateRegistrationForm = document.getElementById('update-registration-form-ajax');

// Modify the objects we need
updateRegistrationForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRegistration= document.getElementById("input-registration-update");
    let inputClass = document.getElementById("input-classes-update");

    // Get the values from the form fields
    let registrationValue = inputRegistration.value;
    let classValue = inputClass.value;

    // Put our data we want to send in a javascript object
    let data = {
        registration: registrationValue,
        classes: classValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-registration-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, registrationValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, registrationID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("registration-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == registrationID) {

            // Get the location of the row where we found the matching registration ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
