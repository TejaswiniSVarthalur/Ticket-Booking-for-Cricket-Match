var express = require('express');
var router = express.Router();
var service = require('../service/user');
var Ticket =require('../model/Ticket');
var NewTicket = require('../model/NewTicket');
var create = require('../model/dbsetup')

router.put('/bookTicket/:emailId',  (req, res, next) => {
  var emailId = req.params.emailId
    var ticketBooking = new Ticket(req.body)
    service.bookTicket(emailId,ticketBooking).then( (obj) => {
      res.json({ "message": " Ticket booked with Id: " + obj.ticketId + " Pay Rs." , "price" : obj.price})
    }).catch(function (err) {
      next(err);
    })
  })
  
  router.get('/fetchBooking/:emailId',  (req, res, next) => {
    service.fetchBooking(req.params.emailId).then( (bookingDetails) => {
      res.status(200)
      res.json(bookingDetails)
    }).catch(function (err) {
      next(err);
    })
  })

//  router.delete('/deleteBooking/:emailId',  (req, res, next) => {
//     service.deleteBooking(req.params.emailId).then( (bookingDetails) => {
//       res.status(200)
//       res.json(bookingDetails)
//     }).catch(function (err) {
//       next(err);
//     })
//   })

router.post('/bookNewTicket',  (req, res, next) => {
 console.log("in routing")
  var ticket = new NewTicket(req.body)
   service.booknewTicket(ticket).then( (booking) =>{
    res.json({ "message": " Ticket booked with Id: " + booking.ticketId + " Pay Rs." , "price" : booking.price})
   })
  })

  router.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

module.exports = router;