<template>
  <div>
    <!-- 模块区域 -->
    <div class="content">
      <div class="disBorder">
        <div
          class="moban_item"
          v-for="(data,index) in template.m"
          :key="'item-'+index"
          @clik.prevent="removalEvent"
        >
          <!-- 拖拽区 -->
          <div draggable="true">
            <!-- 爆款v3推荐模快 -->
            <div
              :ref="data.fe_module_id"
              id="carouselMapX"
              class="border_dashed"
              :class="data.fe_module_id"
            >
              <div
                v-for="(map,index) in data.picture_list"
                :key="index"
                @click.stop="onRecChuildBut(map,data,index)"
                class="recChuildclass"
              >
                <div style="width:281.25px;cursor:pointer;">
                  <div style="margin: 0 auto;text-align: center;">
                    <el-divider direction="vertical"></el-divider>
                    <span>开始：{{formatTime(map.begin_ts)}}</span>
                    <el-divider direction="vertical"></el-divider>
                  </div>
                  <div style="margin: 0 auto;text-align: center;">
                    <el-divider direction="vertical"></el-divider>
                    <span>结束：{{formatTime(map.end_ts)}}</span>
                    <el-divider direction="vertical"></el-divider>
                  </div>
                </div>
                <div class="recchuildTemplate" v-if="isShowRecChuild===index">
                  <div
                    v-for="(item,index) in map.list"
                    :key="'item'+index"
                    @click.stop="recoChuildCurrent(item,map,data,index)"
                    class="crechuild"
                  >
                    <img
                      ref="img_height"
                      style="cursor:pointer;width:100%;height:60px;"
                      @clik.prevent
                      :src="cdn06 + item.img_url"
                    />
                  </div>
                </div>
                <div class="recchuildTemplate" v-else>
                  <div style="height:90px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </transition-group> -->
      </div>
      <!-- 工作区表单区域 -->
      <!-- 爆品推荐 新建模块-->
      <div v-if="isShowForm===28" class="right_form">
        <el-alert title="爆品推荐模块-一级" show-icon effect="dark" type="info"></el-alert>
        <el-form
          v-bind:style="{ width: myWidth,height: myHeight}"
          label-width="110px"
          ref="recommend"
          :model="recommend"
          class="height500"
        >
          <el-form-item label="模块名称" prop="module_title">
            <el-input v-model="recommend.module_title"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="show_begin_ts">
            <el-date-picker
              v-model="recommend.show_begin_ts"
              type="datetime"
              format="yyyy-MM-dd HH-mm-ss"
              value-format="timestamp"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="show_end_ts">
            <el-date-picker
              v-model="recommend.show_end_ts"
              type="datetime"
              value-format="timestamp"
              format="yyyy-MM-dd HH-mm-ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="按钮默认背景色">
            <el-color-picker v-model="recommend.bg_color_def"></el-color-picker>
          </el-form-item>
          <el-form-item label="按钮选中背景色">
            <el-color-picker v-model="recommend.bg_sel_color"></el-color-picker>
          </el-form-item>
          <el-form-item label="字体默认颜色">
            <el-color-picker v-model="recommend.font_def_color"></el-color-picker>
          </el-form-item>
          <el-form-item label="字体选中颜色">
            <el-color-picker v-model="recommend.font_sel_color"></el-color-picker>
          </el-form-item>
          <el-form-item label="是否置灰" prop="show_disable_tips">
            <el-switch v-model="recommend.show_disable_tips" active-text="打开" inactive-text="关闭"></el-switch>
          </el-form-item>
          <el-form-item v-if="recommend.show_disable_tips" label="置灰文案" prop="disable_tips">
            <el-input v-model="recommend.disable_tips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onRecommend"
            >{{redactVSadd===1?'确认修改':redactVSadd===2?'确认创建':''}}模块</el-button>
            <el-button
              v-show="redactVSadd===1"
              type="danger"
              icon="el-icon-delete"
              round
              @click.stop="DeleteMokuai"
            >删除当前模块</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 爆品推荐 list-->
      <div class="right_form" v-show="isShowForm === 20">
        <el-alert title="爆品推荐模块-二级" show-icon effect="dark" type="info"></el-alert>
        <el-form
          v-bind:style="{ width: myWidth,height: myHeight}"
          label-width="110px"
          ref="recommend_url"
          :model="recommend_url"
          class="height500"
          :rules="recommendL_rules"
          label-position="left"
        >
          <el-form-item label="开始时间" prop="begin_ts">
            <el-date-picker
              v-model="recommend_url.begin_ts"
              type="datetime"
              format="yyyy-MM-dd HH-mm-ss"
              value-format="timestamp"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="end_ts">
            <el-date-picker
              v-model="recommend_url.end_ts"
              type="datetime"
              value-format="timestamp"
              format="yyyy-MM-dd HH-mm-ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-if="recommend.module_type !== 16" label="啥都行原来是上传图片">
            <el-input v-model="recommend_url.img_url" placeholder="活动ID"></el-input>
          </el-form-item>
          <el-form-item v-show="recommend.module_type == 10" label="H5链接" prop="url_h5">
            <el-input v-model="recommend_url.url_h5"></el-input>
          </el-form-item>
          <el-form-item v-show="recommend.module_type == 10" label="小程序链接" prop="url_xcx">
            <el-input v-model="recommend_url.url_xcx"></el-input>
          </el-form-item>
          <el-form-item
            v-show="recommend.module_type === 13||recommend.module_type === 16"
            label="活动ID"
            prop="act_id"
          >
            <el-input v-model="recommend_url.act_id" placeholder="活动ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="recoBut(recommend_url)"
            >{{redactVSadd===1?'修改':redactVSadd===2?'添加':''}}</el-button>
            <el-button type="primary" @click="recoBut(recommend_url,2)">新增</el-button>
            <el-button
              v-if="redactVSadd===1"
              type="success"
              size="mini"
              @click.stop="recoBut(recommend_url,1)"
            >新增图片</el-button>
            <el-button type="danger" size="mini" @click.stop="DelRecommend('f')">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 爆品推荐 list chuild-->
      <div class="right_form" v-show="isShowForm === 29">
        <el-alert title="爆品推荐模块-三级" show-icon effect="dark" type="info"></el-alert>
        <el-form
          v-bind:style="{ width: myWidth,height: myHeight}"
          label-width="110px"
          ref="recommend_url"
          :model="recommend_ChildUrl"
          class="height500"
          label-position="left"
        >
          <el-form-item label="啥都行原来是上传图片">
            <el-input v-model="recommend_ChildUrl.img_url" placeholder="活动ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="recoChuildBut(recommend_ChildUrl)"
            >{{redactVSadd===1?'修改':redactVSadd===2?'添加':''}}</el-button>
            <el-button type="danger" size="mini" @click.stop="DelRecommend('c')">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 预览 -->
    <div class="yulan_box" v-show="showYlan">
      <div class="yulan_box_bg" @click.stop="yulanshouw"></div>
      <div class="yulan">
        <div class="erweima_chont">
          <div class="erweima_chont_box">
            <p style="text-align: center;font-weight:bold;color:#D22020">扫码可在移动端预览</p>
            <div id="qrcode"></div>
            <!-- 创建一个div，并设置id为qrcode -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 角色
// const cityOptions = [
//     { name: "会员", value: "show_with_vip" },
//     { name: "非会员", value: "show_with_not_vip" },
// ];
//爆品推荐模块
const recommendUrl = {
  img_url: "",
  url_xcx: "",
  act_type: "1",
  act_id: "",
  url_h5: "",
  begin_ts: "", // 开始时间
  end_ts: "", // 结束时间
  list: []
};
//爆品v3
const recommendChildUrl = {
  img_url: "" // 图片地址
};
// import draggable from "vuedraggable";
// import {
//     handleimgSearch,
//     handleimgPost,
//     eventPageConfigs,
//     activityGoods
// } from "@/api/EventPage/EventPageEditing";
// import { formatDate } from "@/utils/utils";
// import { parse } from "path";
// import commodityTool from "./commodity";
// import carouselMap from "./carousel_map";
// import { setTimeout } from "timers";
// import QRCode from 'qrcodejs2'  // 引入qrcode
// import { log } from 'util';
// import { thistle } from 'color-name';
//将浏览器默认拖拽图片事件关掉
export default {
  name: "EventPage",
  data() {
    return {
      isShowForm: 28,
      redactVSadd: 2,
      showYlan: false,
      myWidth:
        window.innerWidth - 1020 < 480
          ? 480 + "px"
          : 600 > window.innerWidth - 1020 > 480
          ? 560 + "px"
          : 665 + "px", //自适应宽度
      myHeight: window.innerHeight - 220 + "px", //自适应高度
      index: 0,
      //爆品推荐
      isShowRecChuild: 0,
      recommend: {
        img_url: "",
        show_disable_tips: false, // 是否显示置灰文案: 是 true; 否 false; 3.1期增加
        picture_list: [], //轮播列表
        show_mode: ["show_with_vip", "show_with_not_vip"] //显示模式,十进制整数存储,目前最大为15,以二进制与运算检查权限
      },
      recommend_url: { ...recommendUrl },
      recommendL_rules: {
        begin_ts: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        end_ts: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      },
      recommend_ChildUrl: { ...recommendChildUrl },
      // 提交数据
      template: {
        activity_id: "", //活动ID,如果没有该参数则为创建,如果存在则为更新操作
        title: "", //活动名称--页面标题
        m: []
      }
    };
  },
  methods: {
    //爆款推荐模块
    onRecommend() {
      if (this.redactVSadd === 1) {
        this.redactVSadd = 2;
        this.template.m[this.templateIndex] = { ...this.recommend };
        this.recommend_url = { ...recommendUrl };
      } else {
        this.template.m.splice(this.templateIndex + 1, 0, {
          ...this.recommend
        });
        this.recommend_url = { ...recommendUrl };
      }
      this.isShowForm = 20;
    },
    //创建/修改 爆款推荐图片
    recoBut(recommend_url, m_type) {
      let valids = true;
      this.$refs.recommend_url.validate(valid => {
        if (valid) {
          valids = false;
        } else {
          valids = true;
          return false;
        }
      });
      if (valids) return;
      if (this.redactVSadd === 1) {
        this.redactVSadd = 2;
        if (m_type === 1) {
          return (this.isShowForm = 29);
        } else if (m_type === 2) {
          this.redactVSadd = 2;
          this.recommend_url = { ...recommendUrl };
          return;
        }
        this.recommend.picture_list.splice(this.index, 1, this.recommend_url);
        this.recommend_url = { ...recommendUrl };
        this.recommend_ChildUrl.img_url = "";
        // this.sortfunc(this.recommend.picture_list);
        return;
      } else {
        this.recommend.picture_list.push(this.recommend_url);
        this.recommend_url = { ...recommendUrl };
        this.recommend_ChildUrl.img_url = "";
        this.sortfunc(this.recommend.picture_list);
      }
      this.isShowForm = 29;
    },
    //爆品v3 模块 添加数据
    recoChuildBut() {
      if (this.redactVSadd === 1) {
        this.redactVSadd = 2;
        this.recommend_url.list.splice(this.index, 1, this.recommend_ChildUrl);
        this.recommend_ChildUrl = { ...recommendChildUrl };
        return;
      } else {
        this.recommend_url.list.push(this.recommend_ChildUrl);
        this.recommend_ChildUrl = { ...recommendChildUrl };
      }
    },
    //爆款推荐选中图片
    recoCurrent(map, data, index) {
      this.recommend_url = map;
      this.recommend = data;
      this.redactVSadd = 1;
      this.index = index;
      this.isShowForm = 20;
    },
    // 点击爆品v3时间
    onRecChuildBut(item, data, index) {
      console.log(item);
      this.recommend_url = item;
      this.recommend = data;
      this.redactVSadd = 1;
      this.isShowRecChuild = index;
      this.isShowForm = 20; //倒计时表单
    },
    //爆款v3推荐选中图片
    recoChuildCurrent(item, map, data, index) {
      console.log(item);
      this.recommend_ChildUrl = item;
      this.recommend_url = map;
      this.recommend = data;
      this.redactVSadd = 1;
      this.index = index;
      this.isShowForm = 29;
    },
    //爆款v1v2v3删除二级页面删除
    DelRecommend(type) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          switch (this.recommend.picture_list.length) {
            case 1:
              this.isShowForm = "";
              break;
          }
          if (type === "c") {
            this.recommend_url.list.splice(
              this.recommend_url.list.indexOf(this.recommend_ChildUrl),
              1
            );
            this.recommend_ChildUrl = { ...recommendChildUrl };
            return;
          } else {
            this.recommend.picture_list.splice(
              this.recommend.picture_list.indexOf(this.recommend_url),
              1
            );
            this.recommend_url = { ...recommendUrl };
          }
        })
        .catch(() => {});
    },

    // --------------------公共区域--------------------
    //mousedown.stop 事假终止
    moveStop() {
      return false;
    },
    //权限显示
    handleClick(tab) {
      this.isShowFormNavs = tab.index;
    },
    // 点击事件禁止冒泡
    removalEvent() {
      return false;
    },
    // //时间
    formatTime: function(cellValue) {
      let date = cellValue / 1000;
      // return formatDate(date)
      return date;
    },
    //自动排序sort
    sortfunc(array) {
      function sortNumber(a, b) {
        return a.end_ts - b.end_ts;
      }
      return array.sort(sortNumber);
    }
  },
  mounted() {
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    // 注：window.onresize(onresize如果有多个那么只会执行一个)
    window.onresize = () => {
      return (() => {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        this.myHeight = window.innerHeight - 220 + "px";
        // this.myWidth = (window.innerWidth - 1100)/14 + 'rem';
        this.myWidth =
          window.innerWidth - 1020 < 480
            ? 480 + "px"
            : 600 > window.innerWidth - 1020 > 480
            ? 560 + "px"
            : 665 + "px"; //自适应宽度
      })();
    };
  }
};
</script>

<style scoped>
ul li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.inputwidth {
  width: 200px;
}
.heder {
  width: 100%;
  display: flex;
  position: absolute;
  z-index: 999;
  background-color: rgba(0 0 0, 0.5);
}
.hederAddBut {
  left: 60%;
  position: absolute;
}
.hederSaveBut {
  left: 70%;
  position: absolute;
}
.content {
  display: flex;
  padding-top: 40px;
}
.right_form {
  left: 60%;
  position: absolute;
  /* background-color: rgba(201,231,255); */
}
.HotZone {
  position: relative;
  overflow: hidden;
}
.HotZone_box {
  position: absolute;
  background-color: rgba(255, 100, 97, 0.5);
}
.HotZone_img {
  width: 562.5px;
  vertical-align: top;
}
#carouselMap {
  width: 546.5px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding-right: 14px;
}
.carouselMap_box {
  /* padding: px; */
  display: inline-block;
  width: 110.5px;
}
.crechuild {
  margin: 18px 5px 0 5px;
  display: inline-block;
  width: 110.5px;
}
.moban_item {
  display: flex;
  align-items: center;
}
/* 导航 */
.navigation {
  width: 562.5px;
  white-space: nowrap;
  overflow-x: auto;
}
.border_dashed {
  border: 1px dashed #000;
  margin: 1px;
}
.navigation_box {
  display: inline-block;
  width: 110.5px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: solid 2px #c8c5c5;
}
.navigation_int {
  display: inline-block;
  width: 110.5px;
  height: 52px;
  text-align: center;
  line-height: 25px;
  border: solid 2px #c8c5c5;
}
.barrage_box {
  height: 30px;
  line-height: 30px;
  /* overflow-y: auto; */
}
.workButton div {
  margin: 5px 0 5px 0;
}
.headeList ul {
  display: flex;
}
.foldMod {
  height: 30px;
  width: 100px;
  text-align: content;
  line-height: 30px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.foldMod:hover {
  width: auto;
  /* text-overflow:inherit; 
  overflow: visible; 
  white-space: pre-line;     
  合并空白符序列，但是保留换行符。 */
}
.couponCla {
  width: 562.5px;
  /* height: 150px; */
  text-align: content;
  line-height: 150px;
}
.couponCla_yijian {
  width: 562.5px;
  text-align: content;
}
.couponClaSingle {
  margin: 0 auto;
  width: 430px;
  height: 86px;
  background: url("http://mint-ui.github.io/docs/static/img/phone.5909f66.png")
    10% 10% no-repeat;
  background-size: cover;
}
.couponPrice {
  display: flex;
}
.price_rmb {
  width: 100px;
  font-weight: bold;
  font-size: 20px;
  margin: 0 0 0 24px;
  line-height: 90px;
}
.price_spa {
  line-height: 30px;
  font-size: 18px;
  padding-top: 14px;
}
.Group {
  font-weight: bold;
}
.height500 {
  padding: 5px;
  /* width: 470px; */
  /* height: 500px; */
  overflow-y: auto;
  border: 5px solid #e3e197;
  box-shadow: 0 0 5px #e3e197 inset;
}
.disBorder {
  width: 700px;
  /* height: 575px; */
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 5px rgba(201, 231, 255) inset;
  padding: 5px;
  border: 5px solid rgba(201, 231, 255);
  /* background-color: #e3e197; */
}
.el-button--small {
  width: 128px !important;
}
.coupon_title {
  width: 130px;
  vertical-align: middle;
  overflow: hidden;
  background-size: cover;
  display: inline-block;
  cursor: pointer;
  box-shadow: 0 0 1px rgba(201, 231, 255) inset;
  border: 1px solid rgba(201, 231, 255);
}
.coupon_title :hover {
  background-color: antiquewhite;
}
.titleClassW {
  display: flex;
  width: 562.5px;
  /* height: ; */
  color: #dc2992;
}
.titleCmargin {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  margin: 0 auto;
}
.svg_icon {
  width: 30px;
  height: 60px;
  margin: 0 70px;
}
.svg_icon_list {
  width: 30px;
  height: 30px;
  margin: 0 80px;
}
.svg_icon_tab {
  width: 30px;
  height: 30px;
  margin: 0 80px;
}
.danmuclass {
  width: 562.5px;
  position: relative;
  overflow: hidden;
}
.mosedow_rag {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 100%;
  color: #000000;
  z-index: 9999;
}
.time_aixs {
  position: relative;
  text-align: center;
  width: 25%;
  height: 64px;
}
.time_aixs .line {
  width: 97.4%;
  height: 0.05rem;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 1.3%;
  -webkit-transform: translateX(-0.025rem);
  transform: translateX(-0.025rem);
}
.time_aixs .time_aixs_box {
  width: 97%;
  position: absolute;
  top: 0;
  left: 1.5%;
}
.time_aixs .time_aixs_box div {
  font-size: 16px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  height: 64px;
  line-height: 26px;
}
.time_aixs .time_aixs_box div .dot {
  background: #fff;
  width: 0.225rem;
  height: 0.225rem;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-0.1125rem, -0.1125rem);
  transform: translate(-0.1125rem, -0.1125rem);
  border-radius: 50%;
}
.time_aixs .time_aixs_box .time_aix_red .text_bottom {
  border-radius: 0.325rem;
  padding: 0 8%;
}
.time_aixs .time_aixs_box div .text_bottom {
  display: inline-block;
  margin-top: 9px;
}
/* 预览 */
.yulan_box {
  position: fixed;
  z-index: 9990;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.yulan_box_bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.yulan {
  position: relative;
  z-index: 9992;
  padding-bottom: 44px;
  background: #fff;
  padding-top: 40px;
  width: 412px;
  height: 715px;
  background-size: 100% 100%;
  background-image: url("http://mint-ui.github.io/docs/static/img/phone.5909f66.png");
}
.erweima_chont {
  position: relative;
  margin: 20px 0 0 10px;
  width: 392px;
  height: 640px;
  background-color: #fff;
}
.erweima_chont_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.image_placeholder {
  text-align: center;
}
.block {
  display: inline-block;
  margin: 0 20px 0 20px;
}
.w100h100 {
  width: 200px;
}
#carouselMapX {
  width: 560.5px;
  height: 135px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}
.recChuildclass {
  display: inline-block;
}
.recchuildTemplate {
  position: absolute;
}
</style>
