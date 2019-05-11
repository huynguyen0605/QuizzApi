var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')

module.exports = {
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
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { count, challengeId } = inputs;

            if (count) {
                var result = await Quizz.find({
                    challengeId: challengeId,
                    isActive: true
                }).limit(count);
                return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
            } else {
                var result = await Quizz.find({
                    challengeId: challengeId,
                    isActive: true
                });
                return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}