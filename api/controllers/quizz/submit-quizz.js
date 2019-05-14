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
        //thoi gian bat dau cua bai thi
        startTime: {
            type: 'string',
            required: true,
        },
        //dap an da chon
        answer: {
            type: 'string',
            required: true,
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { quizzId, challengeId, startTime, answer } = inputs;
            //dùng id gói câu hỏi, id user & thời gian bắt đầu để xác định bài thi đang làm
            var result = await Result.findOne({
                challengeId: challengeId,
                userId: this.req.session.userid,
                startTime: startTime,
            })

            //nếu không tìm thấy kết quả --> trả ra lỗi
            if (!result) return exits.customsuccess(resList.errBusiness(resMsg.INTERNAL_ERROR));

            //tìm thấy kết quả
            var score = result.score; //lấy điểm hiện tại của bài thi để cập nhật
            var bestScore = result.bestScore; // điểm cao nhất của gói câu hỏi
            var bestTime = result.bestTime;     //thời gian ngắn nhất để đạt điểm cao nhất của gói

            var isCorrect = false;
            //tìm câu hỏi dựa vào id câu hỏi để tìm đáp án đúng
            var quizz = await Quizz.findOne({
                id: quizzId,
            });

            if (quizz) {
                //tra loi dung
                if (answer == quizz.correctAnswer) {
                    score = score + 1;
                    //đúng hay sai để trả về cho người dùng
                    isCorrect = true;
                    //cap nhat lai best score
                    if (score > bestScore) {
                        bestScore = score;
                        //xem có cập nhật lại thời gian không
                        var time = Date.now() - startTime; // thời gian làm bài
                        bestTime = time;
                    } else if (score == bestScore) {
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
                
                // trả ra làm đúng hay sai & điểm hiện tại
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