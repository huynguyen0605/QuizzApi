var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'delete quizz by id',
    inputs: {
        quizzId: {
            type: 'string',
            required: true,
        },
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {quizzId} = inputs;
            var result = await Quizz.updateOne({
                id: quizzId,
            }).set({
                isActive: false,
            })
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}