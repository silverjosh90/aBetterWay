exports.up = function(knex, Promise) {
  return knex.schema.createTable('profileinfo', function(table){
    table.increments();
    table.string('fb_id')
    table.string('question1');
    table.string('question2');
    table.string('question3');
    table.string('question4');
    table.text('Bio');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profileinfo');
};
