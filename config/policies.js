/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'challenge/create-challenge': ['is-admin'],
  'challenge/put-challenge': ['is-admin'],
  'challenge/delete-challenge': ['is-admin'],
  'quizz/create-quizz': ['is-admin'],
  'quizz/put-quizz': ['is-admin'],
  'quizz/delete-quizz': ['is-admin'],

  'main/*': ['is-logged-in'],
  'dashboard/*': ['is-logged-in', 'is-admin'],
};
