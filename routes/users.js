var express = require('express');
var Api= express.Router();
var knex = require('../db/knex')

/* GET users listing. */

function Users() {
  return knex('users')
}

Api.route('/create')
  .post(function(req, res, next) {
    var picture = 'picture[data][url]'
    var reqbody = req.body
    // console.log(req[body][picture][data][url])

    var newUser = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      fb_id: Number(req.body.id),
      profilepicture: reqbody[picture]
    };
    console.log(newUser)
    Users().insert(newUser).then(function(results){
      res.json('created')
    })
  //   console.log(req.body.id)
  // Users.select().where({fb_id: req.body.id}).then(function(results){
  //   if(!results){
  //   res.json('results')
  // }
  //   else{
  //     res.json('worked')
  //   }
  // })
  // res.json(req.body)

});

Api.route('/find/:id')
  .get(function(req,res){

  })

module.exports = Api;
