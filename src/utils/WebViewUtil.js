import CryptoJS from 'crypto-js';
export const buildVNPayURL = (amountParam) => {
    const sortObject = (obj) => {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
    const moment = require('moment');
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    const ipAddr = "127.0.0.1";

    let tmnCode = "0HMW9F90"
    let secretKey = "4IKW54V2L7D1RN4L8PDKTP2Y2UP3O9BI"
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    // let returnUrl = `https://capyventure.eastasia.cloudapp.azure.com/payment/vnpay_return/${packageTy}/${accId}`
    let returnUrl = `https://www.google.com/`
    let orderId = moment(date).format('DDHHmmss');
    let amount = amountParam;
    let bankCode = "";
    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'ThanhtoanchomaGD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    // let crypto = require("crypto");
    // let hmac = crypto.createHmac("sha512", secretKey);
    // let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    const hmacSHA512 = (key, data) => {
        return CryptoJS.HmacSHA512(data, key).toString(CryptoJS.enc.Hex);
    };
    const secureHash = hmacSHA512(secretKey, signData);
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl
}