export const getTimetables = async (dateTime: string, resourceId: number) => {
    const response = await fetch('http://localhost:8080/timetables?' + new URLSearchParams({
        date: dateTime,
        resourceId: resourceId.toString()
    }));
    const body = await response.json();

    if (response.status !== 200) {
        throw new Error(body.message)
    }
    return body;
}

export const getReservations = async (dateTime: string, resourceId: number) => {
    const response = await fetch('http://localhost:8080/reservations?' + new URLSearchParams({
        date: dateTime,
        resourceId: resourceId.toString()
    }));
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message)
    }
    return body;
};