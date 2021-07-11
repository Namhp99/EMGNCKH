<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <img class="img" src="https://play-lh.googleusercontent.com/a0LtLyjbJdqq_5tZLG9HsNIXt_sfUT7a2FFjZ1ece9a4LhyXiy6-TKcCYW1yM812Dg" alt="" onerror="this.onerror=null;this.src='https://play-lh.googleusercontent.com/a0LtLyjbJdqq_5tZLG9HsNIXt_sfUT7a2FFjZ1ece9a4LhyXiy6-TKcCYW1yM812Dg';">
        <h1 class="title">HỆ THỐNG TRỢ LÝ ẢO CHO SỨC KHỎE </h1>
      </div>
      <div>
        <h3 class="h3">Đăng nhập</h3>
      </div>
      <el-form-item class="username" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.UserName"
          placeholder="Tài khoản"
          name="UserName"
          type="text"
          tabindex="1"
          auto-complete="on"
          class="name"
        />
      </el-form-item>

      <el-form-item class="password" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.Password"
          :type="passwordType"
          placeholder="Mật khẩu"
          name="password"
          tabindex="2"
          auto-complete="on"
          class="pass"
          @keyup.enter.native="Login()"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="login">
        <el-button class="btnlogin" @click="Login"><i class="el-icon-key"></i> Đăng nhập</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import UserLogin from '@/api/UserNCKH'
import { SetToken, SetUpharmaID, SetUserName } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        UserName: '',
        Password: ''
      },
      loginRules: {
        UserName: [{ required: true, trigger: 'blur' }],
        Password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Login() {
      const data = { UserName: this.loginForm.UserName, Password: this.loginForm.Password }
      UserLogin(data).then(Response => {
        const res = Response.data
        if (res.RespCode === 0) {
          SetToken(res.Token)
          SetUpharmaID(res.Info.UpharmaID)
          SetUserName(this.loginForm.UserName)
          this.$message.success(res.RespText)
          console.log(res)
          this.$router.push({ path: '/Main' })
        }
        else {
          this.$message.error(res.RespText)
          return
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color:rgb(12, 12, 12);
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px rgb(249, 249, 252) inset !important;
        -webkit-text-fill-color: $bg !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(228, 225, 225, 0.849);
    background: rgba(204, 6, 6, 0.1);
    border-radius: 10px;
    color: #ee0d0d;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#5fa9d1;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: rgb(216, 250, 211);
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 50px auto 50px auto;
    overflow: hidden;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.966);
    padding: 50px;
    height: 500px;
  }

  .tips {
    font-size: 14px;
    color: rgb(70, 216, 94);
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .username {
    background:rgb(249, 249, 252);
  }
  .password {
    background:rgb(249, 249, 252);
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #63BF37;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .el-icon-key {
    vertical-align: middle;
    width: 15px;
    display: inline-block;
    font-size: 18px;
  }

  .h3 {
    margin-bottom: 20px ;
    margin-top: 10px;
    padding-left: 2px;
  }
  .title-container {
    height: 100px;
    .img {
      width: 120px;
      height: 100%;
      float: left;
      padding-bottom: 10px ;
      object-fit: contain;
    }
    .title {
      font-size: 26px;
      color:black;
      margin: 0px auto 0px auto;
      text-align: center;
      font-weight: bold;
      padding-top: 15px;
    }
  }
  .user {
    color: rgb(80, 235, 80);
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login {
  overflow: hidden;
  width: 35%;
  height: 45px;
  //text-align: center;
  //color: rgb(245, 245, 245);
  margin: auto;

  // border-radius: 20px;
  // background-color: rgb(29, 16, 211);

}
.btnlogin {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #63BF37;
  color: #f0f0fa;
  font-weight: bold;
}
</style>
