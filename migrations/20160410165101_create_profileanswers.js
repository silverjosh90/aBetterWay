exports.up = function(knex, Promise) {
  return knex.schema.createTable('profileanswers', function(table){
    table.increments();
    table.string('asker_id');
    table.string('answerer_id');
    table.string('question');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profileanswers');
};
