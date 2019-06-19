class NewTicket{
    constructor(obj){
        this.emailId = obj.emailId
        this.ticket = [
            this.ticketId=obj.ticketId,
        this.groundName=obj.groundName,
        this.bookedOn = obj.bookedOn,
        this.price = obj.price,
        this.noOfTickets = obj.noOfTickets,
        this.typeOfTicket = obj.typeOfTicket
        ]
    }
}
module.exports = NewTicket;