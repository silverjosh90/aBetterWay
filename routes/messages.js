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

Api.route('/create')
  .post(function(req, res, next) {

});

Api.route('/find')
  .post(function(req,res){

  })

module.exports = Api;
