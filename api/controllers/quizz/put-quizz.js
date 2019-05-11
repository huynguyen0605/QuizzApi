var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'put challenge by id',
    inputs: {
        quizzId: {
            type: 'string',
            required: true,
        },
        challengeId: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
        listAnswer: {
            type: 'string',
        },
        correctAnswer: {
            type: 'string',
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {quizzId, challengeId, content, listAnswer, correctAnswer} = inputs;
            var change = {};
            //tim xem co nhung tham so nao duoc truyen len thi thay doi gia tri do trong db
            if (challengeId) change.challengeId = challengeId;
            if (content) change.content = content;
            if (listAnswer) change.listAnswer = listAnswer;
            if (correctAnswer) change.correctAnswer = correctAnswer;

            var result = await Quizz.updateOne({
                id: quizzId,
            }).set(change)
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}