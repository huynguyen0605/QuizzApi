var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'create quizz',
    inputs: {
        challengeId: {
            type: 'string',
            required: true,
        },
        content: {
            type: 'string',
            required: true,
        },
        listAnswer: {
            type: 'string',
            required: true,
        },
        correctAnswer: {
            type: 'string',
            required: true,
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var {challengeId, content, listAnswer, correctAnswer} = inputs;
            var answer = await Quizz.findOne({
                content: content,
            })
            if (answer) {
                //neu cau hoi da tung duoc tao thi active lai
                if (!answer.isActive) {
                    var result = await Quizz.updateOne({
                        content: content,
                    }).set({
                        challengeId: challengeId,
                        listAnswer: listAnswer,
                        correctAnswer: correctAnswer,
                        isActive: true,
                    })
                    exits.customsuccess(resList.success(resMsg.SUCCESS, result));
                } else {
                    //cau hoi da ton tai thi bao ma loi
                    exits.customsuccess(resList.errBusiness(resMsg.QUIZZ_EXIST));
                }
            } else {
                //tao cau hoi moi
                var result = await Quizz.create({
                    content: content,
                    challengeId: challengeId,
                    listAnswer: listAnswer,
                    correctAnswer: correctAnswer,
                }).fetch()
                exits.customsuccess(resList.success(resMsg.SUCCESS, result))
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}