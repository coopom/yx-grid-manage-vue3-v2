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

}

export default Grid;