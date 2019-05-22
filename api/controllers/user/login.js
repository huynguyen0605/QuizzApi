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
            var { username, password } = inputs; // lấy username & password từ đầu vào để xử lí
            
            //adminList định nghĩa sẵn: danh sách admin (trong 1 file tên adminList trong const)
            //username có trong listuser
            if (adminList.indexOf(username) > -1) this.req.session.isadmin = true;
            else this.req.session.isadmin = false;

            //Kiểm tra xem user có tồn tại không
            var user = await User.findOne({
                username: username,
            });
            
            if (user == null) {
                return exits.customsuccess(resList.errBusiness(resMsg.USERNAME_NOT_EXIST));
            } else {
                if (user.password != password) {
                    return exits.customsuccess(resList.errBusiness(resMsg.PASSWORD_NOT_MATCH));
                } else {
                    //đăng nhập thành công
                    //lưu lại id người dùng vào session
                    this.req.session.userid = user.id;
                    user.isadmin = this.req.session.isadmin
                    //xóa password trước khi trả về cho client
                    user.password = undefined;
                    return exits.customsuccess(resList.success(resMsg.LOGIN_SUCCESS, user));
                }
            }
        } catch (e) {
            return exits.error(e.message);
        }
    }
}