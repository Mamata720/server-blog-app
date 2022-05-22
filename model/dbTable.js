const dbCon = require("../config/connection")
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "mamta@123",
    database: "blog"
  }
});

knex.schema.hasTable('Blogs').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('Blogs', function (t) {
      t.increments('blog_id').primary();
      t.string('blog_title');
      t.string('blog_content');
      t.string('author');
      t.float('rating').notNullable
      t.timestamp('reading_time').defaultTo(knex.fn.now())
      t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      // t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      t.string('category_name');
      t.string('blog_image')
      t.string("author_image")
      t.integer('views').notNullable
    });
  }
});


module.exports = {
  knex
}

