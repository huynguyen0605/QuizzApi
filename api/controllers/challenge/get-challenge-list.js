var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'get challenge list',
    inputs: {
        count: {
            type: 'number',
        },
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {count} = inputs;
            if (count) {
                var result = await Challenge.find({isActive: true}).limit(count);
                return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
            } else {
                var result = await Challenge.find({isActive: true});
                return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}