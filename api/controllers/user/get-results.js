var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
var instance = module.exports = {
    description: 'get account results',
    inputs: {
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    getResult: async function (userId) {
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
        return results;
    },
    fn: async function (inputs, exits) {
        try {
            var userId = this.req.session.userid;
            var result = await instance.getResult(userId);
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}