// Get the objects we need to modify
let addSessionForm = document.getElementById('add-registration-form-ajax');

// Modify the objects we need
addSessionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let classNumber = document.getElementById("input-classNumber");
    let registrationID = document.getElementById("input-registration");

    // Get the values from the form fields
    let classNumberValue = classNumber.value;
    let registrationIDValue = registrationID.value;

    // Put our data we want to send in a javascript object
    let data = {
        classNumber: classNumberValue,
        registrationID: registrationIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-registration-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            classNumber.value = '';
            registrationID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Sessions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("registration-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let registrationIDCell = document.createElement("TD");
    let classNumberCell = document.createElement("TD");
    let studentIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD")

    // Fill the cells with correct data
    registrationIDCell.innerText = newRow.registrationID;
    classNumberCell.innerText = newRow.classNumber;
    studentIDCell.innerText = newRow.registrationID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSession(newRow.registrationID);
    };

    // Add the cells to the row 
    row.appendChild(registrationIDCell);
    row.appendChild(classNumberCell);
    row.appendChild(studentIDCell);
    
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.registrationID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("input-registration-update");
    let option = document.createElement("option");
    option.text = newRow.registrationID;
    option.value = newRow.registrationID;
    selectMenu.add(option);

}