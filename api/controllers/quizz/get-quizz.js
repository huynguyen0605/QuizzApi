var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'get quizz by id',
    inputs: {
        quizzId: {
            type: 'string',
            required: true,
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {quizzId} = inputs;
            var result = await Quizz.findOne({
                id: quizzId,
                isActive: true,
            })
            return exits.customsuccess(resList.success(result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}