var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')

var instance = module.exports = {
    description: 'get quizz list by challenge id',
    inputs: {
        count: {
            type: 'number',
        },
        challengeId: {
            type: 'string',
            required: true,
        }
    },
    getQuizzList: async function (count, challengeId) {
        if (count) {
            var result = await Quizz.find({
                challengeId: challengeId,
                isActive: true
            }).limit(count);
            return result;
        } else {
            var result = await Quizz.find({
                challengeId: challengeId,
                isActive: true
            });
            return result;
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { count, challengeId } = inputs;

            var result = await instance.getQuizzList(count, challengeId);
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}