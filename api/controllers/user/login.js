var resList = require('../../const/ResponseList')
var resMsg = require('../../const/ResponseMsg')
var adminList = require('../../const/Admin').ADMIN_LIST
module.exports = {
    description: 'login account',
    inputs: {
        username: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,
    fn: async function (inputs, exits) {
        try {
            var { username, password } = inputs;
            if (adminList.indexOf(username) > -1) this.req.session.isadmin = true;
            else this.req.session.isadmin = false;
            
            var user = await User.findOne({
                username: username,
            });

            if (!user) {
                return exits.customsuccess(resList.errBusiness(resMsg.USERNAME_NOT_EXIST));
            } else {
                if (user.password != password) {
                    return exits.customsuccess(resList.errBusiness(resMsg.PASSWORD_NOT_MATCH));
                } else {
                    this.req.session.userid = user.id;
                    user.password = undefined;
                    return exits.customsuccess(resList.success(resMsg.LOGIN_SUCCESS, user));
                }
            }

        } catch (e) {
            return exits.error(e.message);
        }
    }
}