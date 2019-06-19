var model = require('../model/user');
var Validator = require('../utilities/validator');

var ticketService ={}

ticketService.calculatePrice = (ticket) => {

    if (ticket.typeOfTicket =="Balcony"){
        ticket.ticket.price= ticket.noOfTickets * 4500
    }
    else if (ticket.typeOfTicket =="Mezzanine"){
        ticket.ticket.price= ticket.noOfTickets * 3000
    }
    else if (ticket.typeOfTicket =="Orchestra"){
        ticket.ticket.price= ticket.noOfTickets * 1800
    }
    else {
        let err = new Error("Invalid Ticket type");
        err.status = 400;
        throw err;
    }
}

ticketService.bookTicket =  (emailId,ticketBooking) => {
    Validator.validateDate(ticketBooking.bookedOn);
    
    ticketService.calculatePrice(ticketBooking)
    return model.bookTicket(emailId,ticketBooking).then ( (booking) => {
        if(booking != null){
            return booking
        }
        else
        {
            let err = new Error("Ticket booking was not successful")
            err.status = 404
            throw err;
        }
    })
}

ticketService.fetchBooking = (emailId) => {
    return model.fetchBooking(emailId).then(function (bookingData) {
        // console.log("bookingData is",bookingData)
        if (bookingData == null) {
            let err = new Error("Tickets for emailId: " + emailId + " is not found!")
            err.status = 404
            throw err;
        }
        else {

            return bookingData.ticket;
        }
    })
}

// ticketService.deleteBooking = (emailId) => {
//     return model.fetchBooking(emailId).then(function (bookingData) {
//         // console.log("bookingData is",bookingData)
//         if (bookingData == null) {
//             let err = new Error("Tickets for emailId: " + emailId + " is not found!")
//             err.status = 404
//             throw err;
//         }
//         else {

//             return bookingData.ticket;
//         }
//     })
// }
ticketService.booknewTicket =  (ticketBooking) => {
    Validator.validateDate(ticketBooking.bookedOn);   
    ticketService.calculatePrice(ticketBooking)
    console.log("Price calculated",ticketBooking.ticket)
    return model.booknewTicket(ticketBooking).then ( (booking) => {
        if(booking != null){
            return booking
        }
        else
        {
            let err = new Error("Ticket booking was not successful")
            err.status = 404
            throw err;
        }
    })
}


module.exports = ticketService;

