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
    },

    getChallengesList : async function(req,res){
        var challengeList = await getChallengeList.getChallengeList(10);
        var challengesChunk = [];
        var chunkSize = 4;

        for(var i =0 ; i < challengeList.d.length; i+=chunkSize){
            challengesChunk.push(challengeList.d.slice(i,i+chunkSize));
        }
        return res.render("challenges.ejs",{
            challengeList: challengesChunk
        })
    }
}