var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'get account results',
    inputs: {
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var userId = this.req.session.userid;
            var results = await Result.find({
                userId: userId,
            })

            var listChallengeId = [];
            for (var result of results) {
                listChallengeId.push(result.challengeId);
            }

            var listChallenge = await Challenge.find(listChallengeId);
            for (var result of results) {
                for (var challenge of listChallenge) {
                    if (result.challengeId == challenge.id) {
                        result.challengeName = challenge.name;
                        result.challengeDesc = challenge.description;
                    }
                }
            }

            return exits.customsuccess(resList.success(resMsg.SUCCESS, results));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}