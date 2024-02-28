/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('students', function(table) {
        table.increments('id').primary();
        table.string('student_name',100);
        table.dateTime('student_dob');
        table.string('student_gender');
        table.string('student_email').unique();
        table.string('student_phone',10).nullable();       
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('students');
};
