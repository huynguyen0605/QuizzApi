var getChallengeList = require('./challenge/get-challenge-list')
var getRankList = require('./challenge/get-ranks')
var getQuizzList = require('./quizz/get-quizz-list');
var getResults = require('./user/get-results')
var currentQuizzList = require('../const/CurrentQuizzList')
var startChallenge = require('./challenge/start-challenge')
var genQuizz = require('./quizz/gen-quizz-for-challenge')

function tsToDate(ts) {
    ts = 30 * 60 * 1000 - ts;
    var d = new Date(ts);
    var minute = d.getMinutes();
    if (minute < 10) minute = "0" + minute;
    var sec = d.getSeconds();
    if (sec < 10) sec = "0" + sec;
    return minute + ":" + sec; 
};

module.exports = {
    logOut: function (req, res) {
        req.session.userid = null;
        req.session.isadmin = null;
        res.redirect('/')
    },
    rank: async function (req, res) {
        var challengeId = req.param('challengeId');
        var challengeList = await getChallengeList.getChallengeList();
        var totalRanks = await getRankList.getRank(challengeId, 10);

        //nếu user chưa đăng nhập --> chuyển về trang login
        if (!req.session.userid) {
            return res.redirect('/login')
        } else {
            return res.render('rank.ejs', {
                challengeList: challengeList,
                totalRanks: totalRanks,
            });
        }
    },

    getChallengesList: async function (req, res) {
        var challengeList = await getChallengeList.getChallengeList();

        //nếu user chưa đăng nhập --> chuyển về trang login
        if (!req.session.userid) {
            return res.redirect('/login')
        } else {
            return res.render("challenges.ejs", {
                challengeList: challengeList
            })
        }
    },

    getStatistic: async function (req, res) {
        var resultList = await getResults.getResult(req.session.userid);

        //nếu user chưa đăng nhập --> chuyển về trang login
        if (!req.session.userid) {
            return res.redirect('/login')
        } else {
            return res.render("statistic.ejs", {
                resultList: resultList
            })
        }
    },
    getQuizzById : async function(req,res){
        return res.render("quizzList.ejs",{
            getQuizzList: getQuizzList
        })
    },

    startContest: async function (req, res) {
        var challengeId = req.param('challengeId');
        if (!challengeId) res.redirect('/main/rank');
        var result = await startChallenge.generateResult(challengeId, req.session.userid);
        var quizzList = await genQuizz.genQuizz(10, challengeId);
        //khoi tao goi cau hoi hien tai
        currentQuizzList.reset();
        currentQuizzList.setCurrentQuizzList(quizzList);
        res.redirect('/main/contest/' + challengeId + "?quizz=" 
            + currentQuizzList.getCurrentQuizzIndex() + "&startTime=" + result.startTime)
    },

    getSingleQuizz: async function (req, res) {
        var challengeId = req.param('challengeId');
        var startTime = req.param('startTime');
        var quizzNum = Number(req.param('quizz'));
        var currentQuizz = currentQuizzList.getQuizzByIndex(quizzNum != null ? quizzNum : currentQuizzList.getCurrentQuizzIndex());
        var remainTime = Date.now() - startTime + 1000;
        if (!currentQuizz || remainTime <= 0 || currentQuizzList.getTotalAnserwed() == 10) return res.redirect('/main/statistic')
        var currentScore = currentQuizzList.getCurrentPoint();
        var isAnserwed = currentQuizzList.getAnserwed()[currentQuizz.id];
        return res.render('singlequizz.ejs', {
            currentScore: currentScore,
            startTime: startTime,
            didTime: tsToDate(remainTime),
            challengeId: challengeId,
            currentQuizz: currentQuizz,
            currentQuizzId: currentQuizz.id,
            quizzNum: quizzNum != null ? quizzNum : currentQuizzList.getCurrentQuizzIndex(),
            anserwedList: currentQuizzList.getAnserwed(),
            correctAnswer: currentQuizz.correctAnswer,
            isAnserwed,
            isCorrect: isAnserwed == currentQuizz.correctAnswer,
        });
    },
}