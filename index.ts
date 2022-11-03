const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// function checkParams(dateTime: any) {
//    return true
// }

app.use('/room/:datetime', async (req, res) => {
    let datetime = req.params.datetime;
    let ret = {available: false};

    // if (checkParams(datetime) === false) {
    //     res.status(403);
    //     ret = "Wrong format for dateTime";
    // } else if (1) {

    //datetime = new Date().toISOString();

    //TO MOVE
    let response = await fetch(`http://localhost:8080/timetables?date=${datetime}&resourceId=1337`);
    let timeTables = await response.json();

    response = await fetch(`http://localhost:8080/timetables?date=${datetime}&resourceId=1337`);
    let reservations = await response.json();




    console.log(timeTables, reservations);
    if (1) {
        ret.available = true;
    }

    res.send(JSON.stringify(ret));
});

app.listen(3000, () => console.log('Up and running'));