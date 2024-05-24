// Get the objects we need to modify
let addPersonForm = document.getElementById('add-session-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let classNumber = document.getElementById("input-classNumber");
    let day = document.getElementById("input-day");
    let week = document.getElementById("input-week");
    let topic = document.getElementById("input-topic");

    // Get the values from the form fields
    let classNumberValue = classNumber.value;
    let dayValue = day.value;
    let weekValue = week.value;
    let topicValue = topic.value;

    // Put our data we want to send in a javascript object
    let data = {
        classNumber: classNumberValue,
        day: dayValue,
        week: weekValue,
        topic: topicValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-session-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            classNumber.value = '';
            day.value = '';
            week.value = '';
            topic.value = '';
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
    let currentTable = document.getElementById("sessions-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let sessionIDCell = document.createElement("TD");
    let classNumberCell = document.createElement("TD");
    let dayCell = document.createElement("TD");
    let weekCell = document.createElement("TD");
    let topicCell = document.createElement("TD");

    let deleteCell = document.createElement("TD")

    // Fill the cells with correct data
    sessionIDCell.innerText = newRow.sessionID;
    classNumberCell.innerText = newRow.classNumber;
    dayCell.innerText = newRow.day;
    weekCell.innerText = newRow.week;
    topicCell.innerText = newRow.topic;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteSession(newRow.sessionID);
    };

    // Add the cells to the row 
    row.appendChild(sessionIDCell);
    row.appendChild(classNumberCell);
    row.appendChild(dayCell);
    row.appendChild(weekCell);
    row.appendChild(topicCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.sessionID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.week;
    option.value = newRow.sessionID;
    selectMenu.add(option);
}