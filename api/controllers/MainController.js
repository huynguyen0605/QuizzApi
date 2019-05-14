var getChallengeList = require('./challenge/get-challenge-list')
var getRankList = require('./challenge/get-ranks')
module.exports = {
    rank: async function (req, res) {
        var challengeId = req.query ? req.query.challengeId : null;
        var challengeList = await getChallengeList.getChallengeList(10);
        var totalRanks = await getRankList.getRank(challengeId, 10);
        console.log('huynvq::', totalRanks);
        return res.render('rank.ejs', {
            challengeList: challengeList,
            totalRanks: totalRanks,
        });
    }
}