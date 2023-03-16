import request from "../request"
export const list = [
    {
        id: 1,
        gbNo: "44030607011316000043",
        street: "新桥街道",
        district: "新二社区",
        grid: "新二19",
        address: "新二路138号1",
        lng: "113.83102594030309",
        lat: "22.734943424373025",
        ais: ["店外经营"],
        cameraid: "c18ceb8266304e1a820824d2d31d8c43"
    },
    {
        id: 3,
        gbNo: "44030607011316000076",
        street: "新桥街道",
        district: "新二社区",
        grid: "新二19",
        address: "55下埔路36号",
        lng: "113.8361493340004",
        lat: "22.7321210996968",
        ais: ["消防通道占用"],
        cameraid: "bc6e48e58c1a4bfabdf432974e383261"
    },
    {
        id: 4,
        gbNo: "44030607011316000072",
        street: "新桥街道",
        district: "新二社区",
        grid: "新二19",
        address: "51下埔路20号",
        lng: "113.8363752401155",
        lat: "22.731938493928343",
        ais: ["消防通道占用"],
        cameraid: "b82f51207b7f47479f6ac5a1a059e93f"
    },
    {
        id: 5,
        gbNo: "44030607011316000081",
        street: "新桥街道",
        district: "新二社区",
        grid: "新二18",
        lng: "113.83690231333851",
        lat: "22.732273335949262",
        address: "60新龙四巷3号",
        ais: ["消防通道占用"],
        cameraid: "3c5bd84a325d463e97b1c25180f0e280"
    }
]

const { VITE_YT_BASE_API, VITE_XH_BASE_API, VITE_XH_BASE_API1 } = import.meta.env;

/**
 * AI 探头
 */
class AIProbe {

    static GetList() {
        return Promise.resolve(list)
    }

    static Get(id) {
        return request.get(`http://10.99.16.88:8380/cim_bs/getFlowInstSum?objId=${id}`);
    }

    static Login(params) {
        return request.post(`${VITE_YT_BASE_API}/login`, params);
    }

    /**
     * 获取 AI 探头历史视频
     * @param {Object} params
     * @param {String} params.srcsysid 
     * @param {Number} params.duration 视频时长，单位 秒
     * @returns 
     */
    static GetHistoryVideo(params) {
        return request.get(`${VITE_YT_BASE_API}/iapp/camera/historyVideoPlayer/${params.srcsysid}/${params.duration ?? 15}`)
    }

    /**
     * 获取 AI 探头时间列表
     * @param {Object} params 
     * @returns 
     */
    static GetEvents(params) {
        return request.get(`http://10.99.16.88:8380/cim_bs/getFlowInst`, { params })
    }


    static LoginXH(params) {
        return request.post(`${VITE_XH_BASE_API}/AAA/auth/user/getUserInfoByLoginName`, params)
    }

    static GetXHDirTree(params, config) {
        return request.post(`${VITE_XH_BASE_API}/AAA/xEye/channel/getPlatformList.do`, params, config)
    }

    static GetXHStream(params) {
        // cmd=start&platform=pc&userid=i0bnZjACyQZQVNDeQBh&cameraid=c18ceb8266304e1a820824d2d31d8c43&type=realplay
        const searchParams = new URLSearchParams({
            cmd: "start",
            platform: "pc",
            type: "realplay",
            ...params
        })
        return request.post(`${VITE_XH_BASE_API1}/AAA/getCameraUrl/xhwebvideo.xhrtmp?${searchParams.toString()}`)
    }

    static GetXHHeart(params) {
        const searchParams = new URLSearchParams({
            cmd: "heartbeat",
            type: "realplay",
            ...params
        })
        return request.post(`${VITE_XH_BASE_API1}/AAA/getCameraUrl/xhwebvideo.xhrtmp?${searchParams.toString()}`)
    }

}

export default AIProbe;