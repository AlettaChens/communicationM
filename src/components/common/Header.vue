<template>
  <div class="header">
    <div class="logo">考研交流服务管理系统</div>
    <div class="logout">
      <img src="../../../static/img/loginOut.png" alt width="25" @click="dialogVisible = true">
    </div>
    <div class="headerTimer"></div>
    <el-dialog title="管理员登出提示信息" :visible.sync="dialogVisible" width="20%">
      <span class="dialoginfo">您确定要退出系统吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.$router.push("/login");
    },
    autoTime() {
      var timeEle = document.querySelector(".headerTimer");
      setInterval(function() {
        let time = new Date();
        var year = time.getFullYear();
        var month =
          time.getMonth() >= 9
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1);
        var day = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
        var hour =
          time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
        var minute =
          time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
        var second =
          time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
        timeEle.innerHTML =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second;
      }, 1000);
    }
  },
  mounted: function() {
    this.autoTime();
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
}

.logout {
  float: right;
  text-align: center;
  font-size: 16px;
  padding-right: 20px;
  padding-top: 6px;
}
.headerTimer {
  float: right;
  padding-right: 20px;
  font-weight: 300;
  font-size: 20px;
}
.dialoginfo {
  padding-left: 20px;
}
</style>
