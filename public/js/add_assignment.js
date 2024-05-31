// Get the objects we need to modify
let addAssignmentForm = document.getElementById('add-assignment-form-ajax');

// Modify the objects we need
addAssignmentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let classNumber = document.getElementById("input-classNumber");
    let dueDate = document.getElementById("input-dueDate");
    let weight = document.getElementById("input-weight");
    let description = document.getElementById("input-description");

    // Get the values from the form fields
    let classNumberValue = classNumber.value;
    let dueDateValue = dueDate.value;
    let weightValue = weight.value;
    let descriptionValue = description.value;

    // Put our data we want to send in a javascript object
    let data = {
        classNumber: classNumberValue,
        dueDate: dueDateValue,
        weight: weightValue,
        description: descriptionValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-assignment-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            classNumber.value = '';
            dueDate.value = '';
            weight.value = 0;
            description.value = '';
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
    let currentTable = document.getElementById("assignments-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let assignmentIDCell = document.createElement("TD");
    let classNumberCell = document.createElement("TD");
    let dueDateCell = document.createElement("TD");
    let weightCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");

    // Fill the cells with correct data
    assignmentIDCell.innerText = newRow.assignmentID;
    classNumberCell.innerText = newRow.classNumber;
    dueDateCell.innerText = newRow.dueDate;
    weightCell.innerText = newRow.weight;
    descriptionCell.innerText = newRow.description;

    // Add the cells to the row 
    row.appendChild(assignmentIDCell);
    row.appendChild(classNumberCell);
    row.appendChild(dueDateCell);
    row.appendChild(weightCell);
    row.appendChild(descriptionCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.assignmentID);

    // Add the row to the table
    currentTable.appendChild(row);
}