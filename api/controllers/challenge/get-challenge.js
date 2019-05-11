var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'get challenge by id',
    inputs: {
        challengeId: {
            type: 'string',
            required: true,
        },
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {challengeId} = inputs;
            var result = await Challenge.findOne({
                id: challengeId,
                isActive: true,
            })
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}