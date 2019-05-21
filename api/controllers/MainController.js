var getChallengeList = require('./challenge/get-challenge-list')
var getRankList = require('./challenge/get-ranks')
var getResults = require('./user/get-results')
var currentQuizzList = require('../const/CurrentQuizzList')
var startChallenge = require('./challenge/start-challenge')
var genQuizz = require('./quizz/gen-quizz-for-challenge')
module.exports = {
    logOut: function (req, res) {
        req.session.userid = null;
        req.session.isadmin = null;
        res.redirect('/')
    },
    rank: async function (req, res) {
        var challengeId = req.param('challengeId');
        console.log('duongsai::===>challengeId', challengeId);
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
        var currentQuizz = currentQuizzList.getQuizzByIndex(currentQuizzList.getCurrentQuizzIndex());
        if (!currentQuizz) return res.redirect('/main/statistic')
        var currentScore = currentQuizzList.getCurrentPoint();
        return res.render('singlequizz.ejs', {
            currentScore: currentScore,
            startTime: startTime,
            challengeId: challengeId,
            currentQuizz: currentQuizz,
            currentQuizzId: currentQuizz.id,
            quizzNum: currentQuizzList.getCurrentQuizzIndex()
        });
    },
}