var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')

function shuffle(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

var instance = module.exports = {
    description: 'get quizz list by challenge id',
    inputs: {
        count: {
            type: 'number',
        },
        challengeId: {
            type: 'string',
            required: true,
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    genQuizz: async function (count, challengeId) {
        //lay tat ca cau hoi theo goi cau hoi

        var allQuizz = await Quizz.find({
            challengeId: challengeId,
            isActive: true
        })

        //neu count khong duoc truyen len hoac count lon hon so luong cau hoi thi coi nhu tim tat ca cau hỏi
        if (!count || (count && count > allQuizz.length)) {
            count = allQuizz.length;
        }

        //lay count phan tu ngau nhien trong tat ca cau hoi de tra ve
        var output = shuffle(allQuizz, count);
        return output;
    },
    fn: async function (inputs, exits) {
        try {
            var { count, challengeId } = inputs;
            var output = await instance.genQuizz(count, challengeId);
            return exits.customsuccess(resList.success(resMsg.SUCCESS, output));
        } catch (e) {
            return exits.error(e.message);
        }
    }
}