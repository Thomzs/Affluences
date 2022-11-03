import {getReservations, getTimetables} from "./src/service";
import {ErrorRequestHandler} from "express";

const express = require('express');
const cors = require('cors');
const app = express();
const validateDateTime = require("./src/dateTimeValider");

app.use(express.json());
app.use(cors());

async function checkRoom(datetime: string): Promise<boolean> {
    let timeTable = await getTimetables(datetime, 1337);
    let askedDate = new Date(datetime);

    //If the room is not open, then no need to check the rest;
    if (timeTable.open) {
        let reservations = await getReservations(datetime, 1337);

        //Checking if the date is between opening and closing
        for (let i = 0; i < timeTable.timetables.length; i++) {
            let opening = new Date(timeTable.timetables[i].opening);
            let closing = new Date(timeTable.timetables[i].closing);

            if (askedDate >= opening && askedDate < closing) {
                //If so, check if the room is not already booked

                let booked: boolean = false; //booked at the time we are checking
                for (let j = 0; j < reservations.reservations.length; j++) {
                    let start = new Date(reservations.reservations[j].reservationStart);
                    let end = new Date(reservations.reservations[j].reservationEnd);

                    if (askedDate >= start && askedDate < end) return false;
                }

                //If the asked time is not between the start and the end of a reservation, the room is available
                if (booked === false) return true;
            }
        }
    }

    return false;
}

app.use('/room/:datetime', async (req, res) => {
    let datetime = req.params.datetime;
    let ret: any = {available: false};

    if (validateDateTime(datetime) === false) {
         res.status(403);
         ret = "Wrong format for dateTime";
    } else {
        ret.available = await checkRoom(datetime);
    }
    res.send(JSON.stringify(ret));
})

app.use(((err, req, res, next) => {
    res.status(500);
    res.send(JSON.stringify("Internal error"));
}) as ErrorRequestHandler);


app.listen(3000, () => console.log('Up and running'));