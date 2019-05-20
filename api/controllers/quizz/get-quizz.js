var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
var instance = module.exports = {
    description: 'get quizz by id',
    inputs: {
        quizzId: {
            type: 'string',
            required: true,
        }
    },
    getQuizzById: async function (quizzId) {
        var result = await Quizz.findOne({
            id: quizzId,
            isActive: true,
        })
        return result;
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {quizzId} = inputs;
            var result = await instance.getQuizzById(quizzId);
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}