const request = require('request');
const extend = require('deep-extend');
const ab2str = require('arraybuffer-to-string');

const WWPASS_QRCODE_LIBRARY = 'https://cdn.wwpass.com/packages/wwpass.qrcode.js/2.0/wwpass.qrcode.min.js';

class WWPass {
  constructor(options) {
    this.defaultWWPassProductionCA = ab2str(
      '-----BEGIN CERTIFICATE-----\n\
MIIGATCCA+mgAwIBAgIJAN7JZUlglGn4MA0GCSqGSIb3DQEBCwUAMFcxCzAJBgNV\n\
BAYTAlVTMRswGQYDVQQKExJXV1Bhc3MgQ29ycG9yYXRpb24xKzApBgNVBAMTIldX\n\
UGFzcyBDb3Jwb3JhdGlvbiBQcmltYXJ5IFJvb3QgQ0EwIhgPMjAxMjExMjgwOTAw\n\
MDBaGA8yMDUyMTEyODA4NTk1OVowVzELMAkGA1UEBhMCVVMxGzAZBgNVBAoTEldX\n\
UGFzcyBDb3Jwb3JhdGlvbjErMCkGA1UEAxMiV1dQYXNzIENvcnBvcmF0aW9uIFBy\n\
aW1hcnkgUm9vdCBDQTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAMmF\n\
pl1WX80osygWx4ZX8xGyYfHx8cpz29l5s/7mgQIYCrmUSLK9KtSryA0pmzrOFkyN\n\
BuT0OU5ucCuv2WNgUriJZ78b8sekW1oXy2QXndZSs+CA+UoHFw0YqTEDO659/Tjk\n\
NqlE5HMXdYvIb7jhcOAxC8gwAJFgAkQboaMIkuWsAnpOtKzrnkWHGz45qoyICjqz\n\
feDcN0dh3ITMHXrYiwkVq5fGXHPbuJPbuBN+unnakbL3Ogk3yPnEcm6YV+HrxQ7S\n\
Ky83q60Abdy8ft0RpSJeUkBjJVwiHu4y4j5iKC1tNgtV8qE9Zf2g5vAHzL3obqnu\n\
IMr8JpmWp0MrrUa9jYOtKXk2LnZnfxurJ74NVk2RmuN5I/H0a/tUrHWtCE5pcVNk\n\
b3vmoqeFsbTs2KDCMq/gzUhHU31l4Zrlz+9DfBUxlb5fNYB5lF4FnR+5/hKgo75+\n\
OaNjiSfp9gTH6YfFCpS0OlHmKhsRJlR2aIKpTUEG9hjSg3Oh7XlpJHhWolQQ2BeL\n\
++3UOyRMTDSTZ1bGa92oz5nS+UUsE5noUZSjLM+KbaJjZGCxzO9y2wiFBbRSbhL2\n\
zXpUD2dMB1G30jZwytjn15VAMEOYizBoHEp2Nf9PNhsDGa32AcpJ2a0n89pbSOlu\n\
yr/vEzYjJ2DZ/TWQQb7upi0G2kRX17UIZ5ZfhjmBAgMBAAGjgcswgcgwHQYDVR0O\n\
BBYEFGu/H4b/gn8RzL7XKHBT6K4BQcl7MIGIBgNVHSMEgYAwfoAUa78fhv+CfxHM\n\
vtcocFPorgFByXuhW6RZMFcxCzAJBgNVBAYTAlVTMRswGQYDVQQKExJXV1Bhc3Mg\n\
Q29ycG9yYXRpb24xKzApBgNVBAMTIldXUGFzcyBDb3Jwb3JhdGlvbiBQcmltYXJ5\n\
IFJvb3QgQ0GCCQDeyWVJYJRp+DAPBgNVHRMBAf8EBTADAQH/MAsGA1UdDwQEAwIB\n\
BjANBgkqhkiG9w0BAQsFAAOCAgEAE46CMikI7378mkC3qZyKcVxkNfLRe3eD4h04\n\
OO27rmfZj/cMrDDCt0Bn2t9LBUGBdXfZEn13gqn598F6lmLoObtN4QYqlyXrFcPz\n\
FiwQarba+xq8togxjMkZ2y70MlV3/PbkKkwv4bBjOcLZQ1DsYehPdsr57C6Id4Ee\n\
kEQs/aMtKcMzZaSipkTuXFxfxW4uBifkH++tUASD44OD2r7m1UlSQ5viiv3l0qvA\n\
B89dPifVnIeAvPcd7+GY2RXTZCw36ZipnFiOWT9TkyTDpB/wjWQNFrgmmQvxQLeW\n\
BWIUSaXJwlVzMztdtThnt/bNZNGPMRfaZ76OljYB9BKC7WUmss2f8toHiys+ERHz\n\
0xfCTVhowlz8XtwWfb3A17jzJBm+KAlQsHPgeBEqtocxvBJcqhOiKDOpsKHHz+ng\n\
exIO3elr1TCVutPTE+UczYTBRsL+jIdoIxm6aA9rrN3qDVwMnuHThSrsiwyqOXCz\n\
zjCaCf4l5+KG5VNiYPytiGicv8PCBjwFkzIr+LRSyUiYzAZuiyRchpdT+yRAfL7q\n\
qHBuIHYhG3E47a3GguwUwUGcXR+NjrSmteHRDONOUYUCH41hw6240Mo1lL4F+rpr\n\
LEBB84k3+v+AtbXePEwvp+o1nu/+1sRkhqlNFHN67vakqC4xTxiuPxu6Pb/uDeNI\n\
ip0+E9I=\n\
-----END CERTIFICATE-----');
    this.options = extend({
      key: null,
      cert: null,
      spfeAddress: 'https://spfe.wwpass.com',
      spfeCA: this.defaultWWPassProductionCA,
      requestOptions: {
        Accept: '*/*',
        'User-Agent': 'node-wwpass'
      }
    }, options);
    let authenticationOptions = {
      agentOptions: {
        key: this.options.key,
        cert: this.options.cert,
        ca: this.options.spfeCA
      }
    };
    this.request = request.defaults(
      extend(
        this.options.requestOptions,
        authenticationOptions
      )
    );
    this.allowPromise = (typeof Promise === 'function');
  }
  __performRequest(method, path, handler, params, callback) {
    let options = {
      method: method.toLowerCase(),
      url: this.options.spfeAddress+path
    };
    if (method === 'get') {
      options.qs = params;
    }
    else {
      options.form = params;
    }
    this.request(options, function(error, response, data) {
      if (error) {
        return callback(error, data);
      }
      if(response.statusCode !== 200) {
        return callback(new Error('HTTP Error: ' + response.statusCode + ' ' + response.statusMessage), data);
      }
      try {
        data = JSON.parse(data);
      }
      catch(parseError) {
        return callback(new Error('JSON parseError with HTTP Status: ' + response.statusCode + ' ' + response.statusMessage), data);
      }
      if (!data.result) {
        return callback(new Error('Request error: ' + data.data), data);
      }
      if (handler) {
        try {
          data = handler(data);
        }
        catch(handlerError) {
          error = handlerError;
        }
      }
      return callback(error, data);
    });
  }
  __request(method, path, handler, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }
    else if (callback === undefined && this.allowPromise) {
      let _this = this;
      return new Promise((resolve, reject) => {
        _this.__performRequest(method, path, handler, params,
          (error, data) => {
            if (error) {
              reject(error);
            }
            resolve(data);
          });
      });
    }
    return this.__performRequest(method, path, handler, params, callback);
  }
  __get(path, handler, params, callback) {
    return this.__request('get', path, handler, params, callback);
  }
  __post(path, handler, params, callback) {
    return this.__request('post', path, handler, params, callback);
  }
  getTicket(params, callback) {
    if (params&&params.shouldAskPin) {
      params.auth_type = (params.auth_type||'').concat('p');
    }
    return this.__get('/get.json', (response) => {
      let result = {};
      if (response.data) {
        result.ticket = response.data;
      }
      else {
        throw new Error('No ticket in response');
      }
      result.ttl = response.ttl;
      return result;
    }, params, callback);
  }
  getPuid(params, callback) {
    return this.__post('/puid.json', (response) => {
      let result = {};
      if (response.data) {
        result.puid = response.data;
      }
      else {
        throw new Error('No PUID in response');
      }
      return result;
    }, params, callback);
  }
  getQrCodeLibraryUrl() {
    return WWPASS_QRCODE_LIBRARY;
  }
}
module.exports = WWPass;
