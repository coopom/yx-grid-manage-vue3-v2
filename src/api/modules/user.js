import request from "../request";

class User {

    static Login(params) {
        return request.post(``, params)
    }

}

export default User;