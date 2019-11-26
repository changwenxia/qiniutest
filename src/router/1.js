let config = {
  "AK":"HPzpKJavfeJqBTVDoIhJFH5jpps_l-ELnEhqSTyx",
  "SK":"_NPvXsB2wB3IpOc0NCXgppQPqVv9i52MFOGcv_-r",
  "Bucket":"cwx"
}

router.post('/token', async(ctx, next)=> {
  let mac = new qiniu.auth.digest.Mac(config.AK, config.SK);
  let code = '1',msg = '', data = {};
  let options = {
      scope: config.Bucket,
      expires: 3600 * 24
  };
  let putPolicy =  new qiniu.rs.PutPolicy(options);
  let uploadToken= putPolicy.uploadToken(mac);
  if (uploadToken) {
      code = '0';
      data.uploadToken = uploadToken;
      ctx.body = {code, data, msg}
  } else {
      ctx.body = {code, data, msg}
  }
})

module.exports = router