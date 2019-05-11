var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'put challenge by id',
    inputs: {
        challengeId: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
        },
        description: {
            type: 'string',
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {challengeId, name, description} = inputs;
            var change = {};
            if (name) change.name = name;
            if (description) change.description = description;
            
            var result = await Challenge.updateOne({
                id: challengeId,
            }).set(change)
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}