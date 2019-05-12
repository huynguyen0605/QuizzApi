var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'submit quizz',
    inputs: {
        quizzId: {
            type: 'string',
            required: true,
        },
        challengeId: {
            type: 'string',
            required: true,
        },
        startTime: {
            type: 'string',
            required: true,
        },
        answer: {
            type: 'string',
            required: true,
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { quizzId, challengeId, startTime, answer } = inputs;

            var result = await Result.findOne({
                challengeId: challengeId,
                userId: this.req.session.userid,
                startTime: startTime,
            })
            if (!result) return exits.customsuccess(resList.errBusiness(resMsg.INTERNAL_ERROR));

            var score = result.score;
            var bestScore = result.bestScore;
            var bestTime = result.bestTime;

            var isCorrect = false;
            var quizz = await Quizz.findOne({
                id: quizzId,
            });
            if (quizz) {
                //tra loi dung
                if (answer == quizz.correctAnswer) {
                    score = score + 1;
                    isCorrect = true;
                    //cap nhat lai best score
                    if (score > bestScore) {
                        bestScore = score;
                        //thoi gian lam goi cau hoi tinh den cau hien tai
                        var time = Date.now() - startTime;
                        if (time < bestTime) {
                            bestTime = time;
                        }
                    }
                    var newResult = await Result.update({
                        challengeId: challengeId,
                        userId: this.req.session.userid,
                        startTime: startTime,
                    }).set({
                        score: score,
                        bestScore: bestScore,
                        bestTime: bestTime,
                    })
                }
                
                var output = {
                    isCorrect: isCorrect,
                    score: score,
                }
                return exits.customsuccess(resList.success(resMsg.SUCCESS, output));
            } else {
                return exits.customsuccess(resList.errBusiness(resMsg.INTERNAL_ERROR));
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}