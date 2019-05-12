var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
module.exports = {
    description: 'register new account',
    inputs: {
        username: {
            type: 'string',
            required: true,
        },
        fullname: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string',
            required: true,
        }
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            //lay cac tham so dau vao
            var { username, fullname, password, email } = inputs;
            //kiem tra xem username da ton tai chua
            var isUserExist = await User.findOne({
                username: username,
            })

            /*
                username da ton tai: tra thong bao user da ton tai ma loi -1
                username chua ton tai: tao user moi, tra ma loi 0, thong tin user
            */
            if (isUserExist) {
                return exits.customsuccess(resList.errBusiness(resMsg.USER_EXIST));
            } else {
                var user = await User.create({
                    username: username,
                    fullname: fullname,
                    password: password,
                    email: email,
                }).fetch()
                this.req.session.userid = user.id;
                user.password = undefined;
                return exits.customsuccess(resList.success(resMsg.REGISTER_SUCCESS, user));
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}