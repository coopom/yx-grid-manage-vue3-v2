import request from "../request";

class Incident {

    /**
     * 事件详情
     * @param {Object} params
     * @param {String} params.caseId 
     * @returns 
     */
    static Get(params) {
        return request.get(`http://10.99.16.88:8380/cim_bs/getFlowInstByCaseId`, { params })
    }

    /**
     * 获取事件动态
     * @param {Object} params 
     * @param {String} params.instid
     * @returns 
     */
    static GetMoments(params) {
        return request.get(`http://10.99.16.88:8380/cim_bs/getFlowRecord`, { params })
    }

    /**
     * 获取图片列表
     * @param {Object} params 
     * @param {String} params.instid
     * @returns 
     */
    static GetMedia(params) {
        return request.get(`http://10.99.16.88:8380/cim_bs/getFlowAtt`, { params })
    }

    /**
     * @param {*} params 
     * // params.in_date
     * @returns 
     */
    static GetAIList(params) {
        return request.get(`http://10.99.16.88:8380/cim_flow/getCaseSum`, { params })
    }

    /**
     * community=新二&bsType=城管&pageNum=1&pageSize=20&in_date=2023&state=接收&caseDetail=20230309009460
     * @param {*} params 
     * @returns 
     */
    static GetAIListBy(params) {
        return request.get(`http://10.99.16.88:8380/cim_bs/getFlowInstSearch`, { params })
    }

}

export default Incident;