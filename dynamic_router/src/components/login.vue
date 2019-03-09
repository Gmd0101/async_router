<template>
  <div class="container">
    <div class="login-box">
      <el-form :model="loginmsg" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label prop="username">
          <el-input v-model="loginmsg.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input type="password" v-model="loginmsg.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="Login" style="width:100%;">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/index";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loginmsg: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //   { validator: validateUserName, trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Login: function() {
      var msg = this.loginmsg;
      login({ msg: msg }).then(function(res) {
        // console.log(res);
        if (res.state == "1") {
          this.$message(res.message);
          this.$store.dispatch('Login','角色').then(function(){
            this.$router.push('/');
          }.bind(this));
        }else{
        }
      }.bind(this));
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../static/images/login_bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.login-box {
  width: 350px;
  height: 220px;
  position: relative;
  top: calc(50% - 150px);
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  padding: 25px;
}
.el-form {
  width: 300px;
  /* height: 200px; */
  /* border: 1px solid #000; */
}
/* .el-input {
  background: rgba(0, 0, 0, 0.2);
} */
</style>

