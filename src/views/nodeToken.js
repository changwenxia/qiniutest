function uploadToQiniu(path){
  let qiniu = require('qiniu');
  // 获取token
  var accessKey = 'HPzpKJavfeJqBTVDoIhJFH5jpps_l-ELnEhqSTyx'; 
  var secretKey = '_NPvXsB2wB3IpOc0NCXgppQPqVv9i52MFOGcv_-r'; 
  var bucket = "cwx1";  //存储空间名称
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var options = {
    scope: bucket
  }
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);

  var config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z1; // 空间对应的机房
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();

  var key=path.substring(path.lastIndexOf('/')+1, path.length);  //上传到服务器的名称,和本地名称保持一致
  // 文件上传
  formUploader.putFile(uploadToken, key, path, putExtra, function(respErr,
    respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log('上传成功');
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });
}

const file = "/Users/changwenxia/Downloads/1.jpg"
uploadToQiniu(file)