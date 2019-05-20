var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
var instance = module.exports = {
    description: 'get rank by challenge id',
    inputs: {
        challengeId: {
            //nếu không truyền lên --> xếp hạng trên tổng điểm
            //nếu truyền lên: xếp hạng theo gói câu hỏi
            type: 'string',
        },
        count: {
            //nếu truyền lên: Chỉ lấy count người có kêt quả tốt nhất
            //không truyền lên: lấy tất cả
            type: 'number',
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    getRank: async function (challengeId, count) {
        //dieu kien tim kiem: neu request gui len challengeId thi tim kiem theo challengeId
        //nguoc lai tim tat ca
        var criteria = {}; // tìm tất cả 
        if (challengeId) criteria.challengeId = challengeId;
        //thuc hien truy van trong mongodb
        //nơi quản lí model Result
        var db = Result.getDatastore().manager; //hàm để lấy ra 1 instance của DB: quizzDB
        //aggregate: kết hợp nhiều query 1 lúc
        //$match: đúng với điều kiên criteria
        //$group: 
        var result = await db.collection('result').aggregate([
            {
                //dieu kien
                $match: criteria
            },
            {
                //tim tat ca bai thi cua user --> tinh diem
                //voi moi user: sẽ cộng điểm tất cả các bài lại --> trả ra kết quả:
                //danh sách: {userId, tổng điểm của user, tổng thời gian của user}
                $group: {
                    _id: "$userId",
                    totalScore: { $sum: "$bestScore" },
                    totalTime: { $sum: "$bestTime" },
                },
            },
        ]).toArray()
        //sap xep lai danh sách trả ra ở trên theo tổng điểm & tổng thời gian
        result.sort((a, b) => {
            if (a.totalScore < b.totalScore) {
                return true;
            }
            if (a.totalTime > b.totalTime) {
                return true;
            }
            return false;
        })

        //danh sách chỉ gồm userId, tổng điểm tổng thời gian
        //thực tế cần lấy cả thông tin của user: Tên, email

        //lay list user id trong ket qua de tim userinfo
        var listUserId = [];
        for (item of result) {
            listUserId.push(item._id);
        }

        //truy vấn 1 lần nữa: tìm tất cả thông tin user dựa trên các userId của danh sách trên
        //trả ra danh sách thông tin
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

        //nguoc lai lay tat ca ket qua
        //lấy ra count kết quả đầu tiên của danh sách kết quả nếu count được truyền vào
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