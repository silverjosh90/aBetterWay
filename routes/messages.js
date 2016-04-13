var express = require('express');
var Api= express.Router();
var knex = require('../db/knex')

/* GET users listing. */

function Messages() {
  return knex('messages')
}

Api.route('/')
  .get(function(req,res){
    Messages().select().then(function(results){
      res.json(results)
    })
  })
Api.route('/seen')
  .post(function(req,res){
    Messages().update({seen: true}).where({sender_id: req.body.receiver_id, receiver_id: req.body.sender_id}).then(function(results){
      console.log(results);
      res.json(results)
    })
  })

Api.route('/submit')
  .post(function(req, res, next) {
    var body = req.body
    var text='message[text]'
    console.log(body);
    console.log(body[text]);
    messageObj = {
      message: body[text],
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      seen: false,
      Date: req.body.date
    }
    Messages().insert(messageObj).then(function(results){
      console.log(messageObj);
      res.json(messageObj)
    })

});


module.exports = Api;
