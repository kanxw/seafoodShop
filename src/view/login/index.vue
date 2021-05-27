<template>
  <div id="login">
    <el-form type="text" class="loginfrom" @keyup.13="submit">
      <div class="title-login">订货系统</div>
      <el-input v-model="user" placeholder="请输入账号"></el-input>
      <el-input v-model="psw" placeholder="请输入密码" show-password></el-input>
      <el-button type="primary" class="loginbut" @click="submit"
        >登录</el-button
      >
      <div class="loginerr"></div>
    </el-form>
  </div>
</template>
<script>
import { clientlogin, mangelogin } from "@/api/login";

export default {
  name: "login",
  data() {
    return {
      user: "",
      psw: "",
      token: "",
      isShowLogining: false,
    };
  },
  methods: {
    submit: function () {
      const loading = this.$loading({
        lock: true,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      if (this.user.indexOf("66") > -1 || this.user == "admin") {
        let params = {
          meetingcode: "1002",
          token: this.token,
          usercode: this.user,
          userpwd: this.psw,
        };
        mangelogin(params)
          .then((res) => {
            if (res.data.errormsg == "") {
              this.$router.push({
                name: "mangeindex",
              });
              this.$store.commit("user_token", res.data.data.token);
            } else {
              this.$message({
                type: "info",
                message: res.data.errormsg,
              });
            }

            loading.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let params = {
          type: "1",
          userType: "1",
          username: this.user,
          password: this.psw,
        };
        clientlogin(params)
          .then((res) => {
            if (res.data.msg == "操作成功") {
              this.$router.push({ name: "clientindex" });
              this.$store.commit("user_token", res.data.data.accessToken);
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }

            loading.close();
          })
          .catch((err) => {
            console.log(err, "err");
          });
      }
    },
  },
  created: function () {
    var that = this;
    document.onkeydown = function () {
      var key = window.event.keyCode;
      if (key == 13) {
        that.submit();
      }
    };
  },
};
</script>
<style scoped>
#login {
  width: 100%;
  height: 100%;
  background-image: url("../../../public/img/LoginBackground.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.loginfrom {
  width: 300px;
  position: absolute;
  top: 30%;
  left: 40%;
  font-size: 48px;
}
.title-login {
  color: #fff;
  text-align: center;
}
#login .el-input {
  margin-top: 40px;
}
.loginbut {
  width: 100%;
  margin-top: 40px;
}
</style>