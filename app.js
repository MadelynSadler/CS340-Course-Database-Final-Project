// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 1749;                 // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

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

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});