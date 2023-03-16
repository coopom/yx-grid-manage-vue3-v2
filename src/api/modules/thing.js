import request from '../request'

class Thing {
  /**
   * 查询视频AP事件列表
   * @param {Object} params
   * @param {String} loginName  区域
   * @param {String} password   时间（按年、按月、按日）
   * Body application/json
   * @returns
   */
  static getCaseSum(params) {
    return request.get(
      `http://10.99.16.88:8380/cim_flow/getCaseSum?area=${params.area}&in_date=${
        params.in_date ?? ''
      }`
    )
  }
  /**
   * 根据区域编码查询城管事件列表
   * 区域（例：西丽街道/社区），时间（按年、按月、按日），状态，编号，名称，操作人，分页条件
   * @returns
   */
  static getFlowInstSearch(params) {
    return request.get(`http://10.99.16.88:8380/cim_bs/getFlowInstSearch?${params}`)
  }
}

export default Thing
