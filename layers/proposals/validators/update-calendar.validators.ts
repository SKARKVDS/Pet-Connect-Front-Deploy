import {z} from "zod";

const dateTimes = z.any().array().transform(dates => {
    return dates.map(dateObj => {
        const date = new Date(dateObj.dateTime)
        return {
            dateTime: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), 0, 0, 0),
            requestCount: dateObj.requestCount
        }
    })
})


const schema = z.object({dateTimes});

export {
    schema,
    dateTimes
}