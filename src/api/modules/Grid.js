import request from "../request";

class Grid {

    /**
     * // parentCode=4403&areaType=1
     * @param {*} params 
     * @returns 
     */
    static GetRegion(params) {
        return request.post(`http://10.97.36.11:9099/stdms/service/local/tbarea/wkt`, params)
    }

    /**
     * //street=福永&area=白石厦&gridno=白石厦21
     * @param {*} params 
     * @returns 
     */
    static GetUserNum(params) {
        return request.get(`http://10.99.16.88:8380/cim_inspector/getInspector`, { params })
    }

}

export default Grid;