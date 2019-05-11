var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'create challenge',
    inputs: {
        name: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            defaultsTo: '',
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {name, description} = inputs;
            var challenge = await Challenge.findOne({
                name: name,
            })
            if (challenge) {
                if (challenge.isActive = false) {
                    var result = await Challenge.update({
                        name: name,
                    }).set({
                        description: description,
                        isActive: true,
                    })
                    return exits.customsuccess(resList.success(resMsg.CREATE_CHALLENGE_SUCCESS, result))
                } else {
                    return exits.customsuccess(resList.errBusiness(resMsg.CHALLENGE_EXIST))
                }
            } else {
                var result = await Challenge.create({
                    name: name,
                    description: description,
                }).fetch();
                return exits.customsuccess(resList.success(resMsg.CREATE_CHALLENGE_SUCCESS, result));
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}