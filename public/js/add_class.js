// Get the objects we need to modify
let addClassForm = document.getElementById('add-class-form-ajax');

// Modify the objects we need
addClassForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let className = document.getElementById("input-className");
    let professorName = document.getElementById("input-professorName");
    let term = document.getElementById("input-term");
    let location = document.getElementById("input-location");
    let meetingTime = document.getElementById("input-meetingTime");

    // Get the values from the form fields
    let classNameValue = className.value;
    let professorNameValue = professorName.value;
    let termValue = term.value;
    let locationValue = location.value;
    let meetingTimeValue = meetingTime.value;

    // Put our data we want to send in a javascript object
    let data = {
        className: classNameValue,
        professorName: professorNameValue,
        term: termValue,
        location: locationValue,
        meetingTime: meetingTimeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-class-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            className.value = '';
            professorName.value = '';
            term.value = '';
            location.value = '';
            meetingTime.value = '';
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
    let currentTable = document.getElementById("classes-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let classNumberCell = document.createElement("TD");
    let classNameCell = document.createElement("TD");
    let professorNameCell = document.createElement("TD");
    let termCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let meetingTimeCell = document.createElement("TD");

    // Fill the cells with correct data
    classNumberCell.innerText = newRow.classNumber;
    classNameCell.innerText = newRow.className;
    professorNameCell.innerText = newRow.professorName;
    termCell.innerText = newRow.term;
    locationCell.innerText = newRow.location;
    meetingTimeCell.innerText = newRow.meetingTime;

    // Add the cells to the row 
    row.appendChild(classNumberCell);
    row.appendChild(classNameCell);
    row.appendChild(professorNameCell);
    row.appendChild(termCell);
    row.appendChild(locationCell);
    row.appendChild(meetingTimeCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.classNumber);

    // Add the row to the table
    currentTable.appendChild(row);
}