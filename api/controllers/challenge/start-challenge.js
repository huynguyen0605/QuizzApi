var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
var instance = module.exports = {
    description: 'get challenge by id',
    inputs: {
        challengeId: {
            type: 'string',
            required: true,
        },
    },
    generateResult: async function (challengeId, userId) {
        var isResultExist = await Result.findOne({
            challengeId: challengeId,
            userId: userId,
        })
        console.log(challengeId, userId)
        if (!isResultExist) {
            var result = await Result.create({
                challengeId: challengeId,
                userId: userId,
                startTime: Date.now(),
            }).fetch()
            return result;
        } else {
            var result = await Result.updateOne({
                challengeId: challengeId,
                userId: userId,
            }).set({
                score: 0,
                startTime: Date.now(),
            })
            return result;
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { challengeId } = inputs;
            var userId = this.req.session.userid;
            var result = await instance.generateResult(challengeId, userId)
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}