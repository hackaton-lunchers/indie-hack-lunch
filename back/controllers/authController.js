'use strict';

const oauth = require('simple-oauth2');

class AuthController {
  constructor() {}

  auth_with_slack(req, reply) {
    const CLIENT_ID = '2788911094.6020814017';
    const CLIENT_SECRET = 'd566d901e6d20be007ed2de048cd5393';
    const TEAM = 'CN_internal';

    const oauth2 = oauth({
      client_id: CLIENT_ID,
      clientSecret: CLIENT_ID,
      site: 'http://slack.com/oauth/authorize'
    }); 

    var authorization_uri = oauth2.authCode.authorizeURL({
      redirect_uri: 'http://localhost:8084/callback',
      scope: 'read',
      team: TEAM
    });

    reply.redirect(authorization_uri);
  }

  slack_callbackhandler(req, reply) {
    console.log('Auth Token');
    console.log(reply);
  }
}

module.exports = AuthController;