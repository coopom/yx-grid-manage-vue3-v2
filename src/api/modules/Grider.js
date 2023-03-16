import request from "../request";

class Grider {

    /**
     * pid=2381 YONGHUBIANHAO
     * @param {*} params 
     * @returns 
     */
    static Get(params) {
        return request.get(`http://10.99.16.88:8380/cim_inspector/getInspectorInfo`, { params })
    }

}

export default Grider;