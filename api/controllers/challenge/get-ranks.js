var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
var instance = module.exports = {
    description: 'get rank by challenge id',
    inputs: {
        challengeId: {
            type: 'string',
        },
        count: {
            type: 'number',
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    getRank: async function (challengeId, count) {
        //dieu kien tim kiem: neu request gui len challengeId thi tim kiem theo challengeId
        //nguoc lai tim tat ca
        var criteria = {};
        if (challengeId) criteria.challengeId = challengeId;

        //thuc hien truy van trong mongo
        var db = Result.getDatastore().manager;
        var result = await db.collection('result').aggregate([
            {
                //dieu kien
                $match: criteria
            },
            {
                //tinh tong diem & thoi gian theo userId
                $group: {
                    _id: "$userId",
                    totalScore: { $sum: "$score" },
                    totalTime: { $sum: "$bestTime" },
                },
            },
        ]).toArray()

        //sap xep lai ket qua
        result.sort((a, b) => {
            if (a.totalScore < b.totalScore) {
                return true;
            }
            if (a.totalTime > b.totalTime) {
                return true;
            }
            return false;
        })


        //lay list user id trong ket qua de tim userinfo
        var listUserId = [];
        for (item of result) {
            listUserId.push(item._id);
        }

        var listUserInfo = await User.find(listUserId);

        //map lai userinfo tim duoc vao ket qua theo userid
        for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < listUserInfo.length; j++) {
                if (result[i]._id == listUserInfo[j].id) {
                    result[i].username = listUserInfo[j].username;
                    result[i].fullname = listUserInfo[j].fullname;
                    result[i].email = listUserInfo[j].email;
                }
            }
        }

        //lay count ket qua dau tien neu count dc truyen len
        //nguoc lai lay tat ca ket qua
        return count != undefined ? result.slice(0, count) : result
    },
    fn: async function (inputs, exits) {
        try {
            var { challengeId, count } = inputs;
            var result = await instance.getRank(challengeId, count);
            return exits.customsuccess(resList.success(resMsg.SUCCESS, result));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}