import MD5 from "crypto-js/md5";

/**
 * 签名类
 */
class Signor {

    static md5(string) {
        return MD5(string);
    }

}

export default Signor;