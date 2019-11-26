<template>
 <el-upload
    style='position: relative;top: 10px;height: 120px;'
    :file-list='fileList'
    class="avatar-uploader"
    :limit='1'
    :action="uploadUrl"
    accept="image/jpeg,image/gif,image/png,image/bmp"
    list-type="picture-card"
    :data='uploadData'
    :on-success="handleAvatarSuccess"
    :on-error="uploadError"
    :before-upload="beforeAvatarUpload"
    :on-preview="doLookImg"
    :on-remove="doDeleteImg">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      actionPath:'https://up-z1.qiniup.com',
      imageUrl: '',
      postData: {},
    };
  },
  created() {
  },
  methods: {
      },
  }
</script>