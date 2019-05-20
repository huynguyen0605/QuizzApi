var getChallengeList = require('./challenge/get-challenge-list')
var getChallengeById = require('./challenge/get-challenge')
var getQuizzList = require('./quizz/get-quizz-list')
var getQuizzById = require('./quizz/get-quizz')
module.exports = {
    getDashboard: async function (req, res) {
        var challengeList = await getChallengeList.getChallengeList();
        res.render("dashboard.ejs", {
            challengeList: challengeList,
        })
    },

    getChallenge: async function (req, res) {
        //nếu có challengeId --> sửa challenge
        var challengeId = req.param('challengeId');
        //k có --> thêm mới

        var challengeInfo = {
            name: '',
            description: '',
        }
        if (challengeId) {
            var challenge = await getChallengeById.getChallengeById(challengeId);
            challengeInfo.id = challengeId;
            challengeInfo.name = challenge.name;
            challengeInfo.description = challenge.description;
        }
        res.render("addchallenge.ejs", {
            challengeInfo: challengeInfo
        })
    },
    getQuizzes: async function (req, res) {
        var challengeId = req.param('challengeId');
        var quizzList = await getQuizzList.getQuizzList(null, challengeId);

        res.render("quizzlist.ejs", {
            quizzList: quizzList,
            challengeId: challengeId
        })
    },
    addQuizz: async function (req, res) {
        var challengeId = req.param('challengeId');

        //neu k ton tai quizzid --> them moi
        //neu ton tai --> sua quizz cu
        var quizzId = req.param('quizzId');

        var quizzInfo = {
            content: '',
            listAnswer: '',
            correctAnswer: '',
        }

        console.log('quizzId', quizzId);
        if (quizzId) {
            var quizz = await getQuizzById.getQuizzById(quizzId);
            quizzInfo.id = quizzId;
            quizzInfo.content = quizz.content;
            quizzInfo.listAnswer = quizz.listAnswer;
            quizzInfo.correctAnswer = quizz.correctAnswer;
        }
        res.render("addquizz.ejs", {
            challengeId: challengeId,
            quizzInfo: quizzInfo,
        })
    }
}