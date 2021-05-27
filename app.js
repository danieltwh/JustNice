// import {USERS} from users.js;
const fs = require("fs");

const callback = function(err) {
    if (err) throw err;
    console.log("complete");
};

const express = require('express'); // Returns an object of type express

const app = express();

// Adding a piece of middleware to allow us to parse json object
app.use(express.json());

const users = require("./database/users.json");

app.get('/', function(req, res) {
    res.send("Hello World");
})

app.get('/users', function(req, res) {
    res.send(users);
})

app.get('/users/:id', function(req, res) {
    const user = users.find(user => user.id === parseInt(req.params.id))

    if (!user) {
        return res.status(404).send("No user found")
    } else {
        return res.send(user)
    }
})

app.post("/users", function(req, res) {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		token: req.body.token
    }

    // Adding the user to the array
    users.push(user);

    // Updating the JSON file
    fs.writeFile("./database/users.json", JSON.stringify(users), "utf8", callback);

    // Return the new user
    res.send(user);
})

app.put("/users/:id", function(req, res) {
    var user = users.find(user => user.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).send("No user found");
    } else {

        var newUser = {
            id: user.id,
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            token: req.body.token
        }
        // Update the user
        user = newUser;

        //return the updated user
        res.send(user)
    }
}) 



const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})