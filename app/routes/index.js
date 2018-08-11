const itemRoutes = require('./item_routes');

module.exports = function(app, db) {
  itemRoutes(app, db);
  // Other route groups can go here
};
