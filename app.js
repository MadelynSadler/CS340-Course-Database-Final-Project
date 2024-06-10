/*
All code found in this file is based on the osu-cs340-ecampus nodejs-starter-app repo found here:
https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// App.js

/*
    SETUP
*/
var express = require('express');
var app = express();
var path = require('path');
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT = 1750;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs"
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.use(express.static('public'));               // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Sessions;";               // Define our query

        let query2 = "SELECT * FROM Classes;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            // save the sessions
            let sessions = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let classes = rows;
                return res.render('index',  {data: sessions, classes: classes});
            })

            // res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                       // received back from the query                                      // requesting the web site.

app.post('/add-session-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let classNumber = parseInt(data.classNumber);
        if (isNaN(classNumber))
        {
            classNumber = 'NULL'
        }

        let week = parseInt(data.week);
        if (isNaN(week))
        {
            week = 'NULL'
        }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Sessions (classNumber, day, week, topic) VALUES (${data.classNumber}, '${data.day}', ${data.week}, '${data.topic}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on sessions
                query2 = `SELECT * FROM Sessions;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/delete-session-ajax/', function(req,res,next){
    let data = req.body;
    let sessionID = parseInt(data.sessionID);
    // remove from intersection table before native table
    let deleteSession = `DELETE FROM Sessions WHERE sessionID = ?`;  
    
            // Run the 1st query
            db.pool.query(deleteSession, [sessionID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                else
                {
                    // Run the second query
                    db.pool.query(deleteSession, [sessionID], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(204);
                        }
                    })
                }
    })});

app.put('/put-session-ajax', function (req, res, next) {
    let data = req.body;
    
    let sessionID = parseInt(data.sessionID);
    let topic = data.topic;

    let queryUpdateSession = `UPDATE Sessions SET topic = ? WHERE sessionID = ?`;

    db.pool.query(queryUpdateSession, [topic, sessionID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        } else {
            // Perform a SELECT * on Sessions to get the updated data
            let querySelectSession = `SELECT * FROM Sessions WHERE sessionID = ?`;
            db.pool.query(querySelectSession, [sessionID], function (error, rows, fields) {
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});    

app.get('/classes', function(req, res)
{  
    let query1 = "SELECT * FROM Classes;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        if (error) {app.js
            console.error("Error executing query:", error);
            return res.status(500).send("An error occurred while fetching classes.");
        } else {
            // save the classes
            let classes = rows;
            return res.render('classes',  {data: classes});
        }


    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                       // received back from the query                                      // requesting the web site.


app.post('/add-class-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        let meetingTime = data.meetingTime;
        // if (!isString(meetingTime))
        // {
        //     meetingTime = 'NULL'
        // }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Classes (className, professorName, term, location, meetingTime) VALUES ('${data.className}', '${data.professorName}', '${data.term}', '${data.location}', '${data.meetingTime}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else {
                query2 = `SELECT * FROM Classes;`;
                db.pool.query(query2, function (error, rows, fields) {
                    if (error) {
    
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else {
                        res.send(rows);
                    }
                })
                }
            }
        ) 
    }
);

app.get('/get-assignments-ajax', function(req, res)
{  
    let query1 = "SELECT * FROM Assignments;";               // Define our query

    let query2 = "SELECT * FROM Classes;";

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        // save the assignments
        let assignments = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let classes = rows;
            return res.render('assignments',  {data: assignments, classes: classes});
        })

    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                       // received back from the query                                      // requesting the web site.

app.post('/add-assignment-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;

        // Capture NULL values
        let classNumber = parseInt(data.classNumber);
        if (isNaN(classNumber))
        {
            classNumber = 'NULL'
        }

        // Create the query and run it on the database
        query1 = `INSERT INTO Assignments (classNumber, dueDate, weight, description) VALUES (${data.classNumber}, '${data.dueDate}', '${data.weight}', '${data.description}')`;
        db.pool.query(query1, function(error, rows, fields){

            // Check to see if there was an error
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on sessions
                query2 = `SELECT * FROM Assignments;`;
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    }
);

app.get('/get-students-ajax', function(req, res)
{  
    let query1 = "SELECT * FROM Students;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        // save the classes
        let students = rows;
        return res.render('students',  {data: students});

    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                       // received back from the query                                      // requesting the web site.

app.post('/add-student-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        // let data = req.body; 
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Students () values ()`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else {
                query2 = `SELECT * FROM Students;`
                db.pool.query(query2, function(error, rows, fields) {
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
                }
            }
        ) 
    }
);

app.get('/get-registration-ajax', function(req, res) {
    let query1 = "SELECT * from ClassesStudents;";

    let query2 = "SELECT * from Classes;";
    let query3 = "SELECT * from Students;";

    db.pool.query(query1, function(error, rows, fields){

        // save the registration
        let classesStudents = rows;

        db.pool.query(query2, function(error, rows, fields) {
            let classes = rows;

            db.pool.query(query3, function(error, rows, fields) {
                let students = rows;
                return res.render('registrations', {data: classesStudents, classes: classes, students: students});
            })
        })
    })
});

app.post('/add-registration-ajax', function(req, res) {

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    query1 = `INSERT INTO ClassesStudents (classNumber, studentID) VALUES (${data.classNumber}, ${data.studentID})`;
    db.pool.query(query1, function(error, rows, fields) {

        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on classesStudents
            query2 = `SELECT * FROM ClassesStudents;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
})


app.delete('/delete-registration-ajax/', function(req,res){
    let data = req.body;
    let registrationID = parseInt(data.registrationID);
    // remove from intersection table before native table
    let deleteRegistration = `DELETE FROM ClassesStudents WHERE registrationID = ?`;  
    
            // Run the 1st query
            db.pool.query(deleteRegistration, [registrationID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                else
                {
                    // Run the second query
                    db.pool.query(deleteRegistration , [registrationID], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(204);
                        }
                    })
                }
    })});

app.put('/put-registration-ajax', function(req,res,next){
    let data = req.body;
    
    let registrationID = parseInt(data.registrationID);
    let classNumber = parseInt(data.classNumber);
    
    let queryUpdateRegistration = `UPDATE ClassesStudents SET classNumber = ? WHERE registrationID = ?`;
    let selectClasses = `SELECT * FROM ClassesStudents WHERE registrationID = ?`
    
            // Run the 1st query
            db.pool.query(queryUpdateRegistration, [classNumber, registrationID], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else
                {
                    // Run the second query
                    db.pool.query(selectClasses, [registrationID], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});