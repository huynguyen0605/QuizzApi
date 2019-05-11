var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'get challenge by id',
    inputs: {
        challengeId: {
            type: 'string',
            required: true,
        },
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { challengeId } = inputs;
            var isResultExist = await Result.findOne({
                challengeId: challengeId,
                userId: this.req.session.userid,
            })
            
            if (!isResultExist) {
                var result = await Result.create({
                    challengeId: challengeId,
                    userId: this.req.session.userid,
                    startTime: Date.now(),
                }).fetch()
                return exits.customsuccess(resList.success(result));
            } else {
                var result = await Result.updateOne({
                    challengeId: challengeId,
                    userId: this.req.session.userid,
                }).set({
                    score: 0,
                    startTime: Date.now(),
                })
                return exits.customsuccess(resList.success(result));
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}