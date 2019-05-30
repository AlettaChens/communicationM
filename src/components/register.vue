<template>
  <div class="login-wrap">
    <div class="ms-title">管理员注册</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="nickname">
          <el-input v-model="ruleForm.nickname" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </div>
      </el-form>
      <p class="registerEnter" @click="()=>{this.$router.push('./login')}">去登录</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tips: "请填写正确的用户名和密码登录。",
      ruleForm: {
        nickname: "",
        password: "",
        phone: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const self = this;
      let params = {
        name: self.ruleForm.nickname,
        password: self.ruleForm.password,
      };
      this.$http.post(
        "/admin/register",
        params,
        response => {
          console.log(response);
          if (response.data.code == "200")
            this.$message({
              showClose: true,
              type: "success",
              message: "注册成功"
            });
        },
        () => {
          console.log("err");
        }
      );
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 180px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.registerEnter {
  margin-top: 10px;
  color: #3385ff;
  text-align: center;
  text-decoration: underline;
}
</style>
