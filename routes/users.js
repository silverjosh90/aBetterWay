var express = require('express');
var Api= express.Router();
var knex = require('../db/knex')

/* GET users listing. */

function Users() {
  return knex('users')
}

Api.route('/')
  .get(function(req,res){
    Users().select().then(function(results){
      res.json(results)
    })
  })

Api.route('/create')
  .post(function(req, res, next) {
    var picture = 'picture[data][url]'
    var reqbody = req.body
    var newUser = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      fb_id: req.body.id,
      profilepicture: reqbody[picture]
    };

    Users().select().where({fb_id: req.body.id}).first().then(function(results){
      if(results == undefined){
        Users().insert(newUser).then(function(result){
          Users().select().where({fb_id: req.body.id}).first().then(function(rest){
            res.json(rest)
          })
        })
      }
      else {
        res.json('success')
        }
  })
  //   console.log(req.body.id)

});

Api.route('/find')
  .post(function(req,res){
    console.log(req.body)
    var derp = Number(req.body.userid)
    Users().select().where({fb_id: derp}).first().then(function(result){

      res.json(result)
    })
  })

module.exports = Api;
