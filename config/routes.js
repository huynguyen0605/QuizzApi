/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'POST /user/register': { action: 'user/register' },
  'POST /user/login': { action: 'user/login' },
  'GET /user/results': { action: 'user/get-results' },

  'GET /challenges/': { action: 'challenge/get-challenge-list' },
  'POST /challenges/': { action: 'challenge/create-challenge' },
  'GET /challenges/:challengeId': { action: 'challenge/get-challenge' },
  'PUT /challenges/:challengeId': { action: 'challenge/put-challenge' },
  'DELETE /challenges/:challengeId': { action: 'challenge/delete-challenge' },
  'POST /challenges/:challengeId/startChallenge': { action: 'challenge/start-challenge' },

  'GET /challenges/:challengeId/quizz': { action: 'quizz/get-quizz-list' },
  'POST /challenges/:challengeId/quizz': { action: 'quizz/create-quizz' },
  'POST /challenges/:challengeId/quizz/:quizzId/submit': { action: 'quizz/submit-quizz' }, 
  'GET /challenges/:challengeId/randomQuizz': { action: 'quizz/gen-quizz-for-challenge' },

  'GET /quizz/:quizzId': { action: 'quizz/get-quizz' },
  'PUT /quizz/:quizzId': { action: 'quizz/put-quizz' },
  'DELETE /quizz/:quizzId': { action: 'quizz/delete-quizz' },

  'GET /ranks': { action: 'challenge/get-ranks' },

  '/login': { view: 'login' },
  '/register': { view: 'register' },
  '/main/rank': {
      controller: 'MainController',
      action: 'rank',
  },
  '/main/challenges' : {
    controller : 'MainController',
    action : 'getChallengesList',
  },
<<<<<<< HEAD
  '/challenges/:challengeId' : {
    controller : 'mainController',
    action : 'getQuizzById',
=======
  '/main/startContest/:challengeId': {
    controller: 'MainController',
    action: 'startContest'
  },
  '/main/contest/:challengeId': {
    controller: 'MainController',
    action: 'getSingleQuizz',
  },
  '/main/statistic': {
    controller: 'MainController',
    action: 'getStatistic'
  },
  '/dashboard': {
    controller: 'DashboardController',
    action: 'getDashboard',
  },
  '/dashboard/challenges': {
    controller: 'DashboardController',
    action: 'getChallenge'
  },
  '/dashboard/challenges/:challengeId': {
    controller: 'DashboardController',
    action: 'getChallenge'
  },
  '/dashboard/challenges/:challengeId/quizz': {
    controller: 'DashboardController',
    action: 'getQuizzes'
  },
  '/dashboard/challenges/:challengeId/quizz/addQuizz': {
    controller: 'DashboardController',
    action: 'addQuizz'
  },
  '/dashboard/challenges/:challengeId/quizz/addQuizz/:quizzId': {
    controller: 'DashboardController',
    action: 'addQuizz'
>>>>>>> d0cf39284733a4f2232747c8e83f9e6459878f7a
  }
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
