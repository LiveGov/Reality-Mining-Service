//jshint esnext:true

(function() {
	'use strict';

	var Router = require('koa-router');
	var lodash = require('lodash');
  var router = new Router();

  module.exports = function (app) {
    var statements = require('../statements')(app);

    router.get('/trips', function*() {
      var result = yield this.pg.db.client.query_(lodash.merge({
        values: [this.session.passport.user]
      }, statements.trips.user));

      this.body = result.rows;
      this.status = result.rowCount ? 200 : 204;
    });

    return { trips: router };
  };

}());