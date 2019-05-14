var getChallengeList = require('./challenge/get-challenge-list')
var getRankList = require('./challenge/get-ranks')
var getResults = require('./user/get-results')
module.exports = {
    rank: async function (req, res) {
        var challengeId = req.query ? req.query.challengeId : null;
        var challengeList = await getChallengeList.getChallengeList(10);
        var totalRanks = await getRankList.getRank(challengeId, 10);
        return res.render('rank.ejs', {
            challengeList: challengeList,
            totalRanks: totalRanks,
        });
    },

    getChallengesList: async function (req, res) {
        var challengeList = await getChallengeList.getChallengeList();
        return res.render("challenges.ejs", {
            challengeList: challengeList
        })
    },

    getStatistic: async function (req, res) {
        var resultList = await getResults.getResult(req.session.userid);
        return res.render("statistic.ejs", {
            resultList: resultList
        })
    }
}