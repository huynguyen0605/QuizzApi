var getChallengeList = require('./challenge/get-challenge-list')
var getRankList = require('./challenge/get-ranks')
var getResults = require('./user/get-results')
module.exports = {
    rank: async function (req, res) {
        var challengeId = req.query ? req.query.challengeId : null;
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
    }
}