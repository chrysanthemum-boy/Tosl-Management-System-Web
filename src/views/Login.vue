<template class="temp">
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        TOSL 后台管理系统
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" alt="">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <!--    <div v-if="$store.state.settings.showFooter" id="el-login-footer">-->
    <!--      <span v-html="$store.state.settings.footerTxt" />-->
    <!--      <span> ⋅ </span>-->
    <!--      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Background from '@/assets/background.png'
import Cookies from 'js-cookie'
import {encrypt} from "@/utils/rsaEncrypt"
import Config from '@/settings'
import {setToken} from "@/utils/auth"
import { Notification } from 'element-ui'
// import {getCodeImg} from "@/api/login";
// import url from "url";


export default {
  name: "Login",
  created() {
    this.getCode()
    this.getCookie()
    this.point()
  },
  data(){
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        uuid: '',
        rememberMe: false,
        code: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      Background: Background,
      codeUrl: '',
      loading: false,
      // 存放加密密码
      cookiePass: '',
    }
  },

  methods: {
    getCode(){
      // 发送请求
      this.$request.get('http://localhost:8000/auth/code').then(res=>{
        this.codeUrl =  res.data.img
        this.loginForm.uuid = res.data.uuid
      })
    },

    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },

    handleLogin(){
      this.$refs.loginForm.validate(valid=>{
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, {expires: Config.passCookieExpires})
            Cookies.set('password', user.password, {expires: Config.passCookieExpires})
            Cookies.set('rememberMe', user.rememberMe, {expires: Config.passCookieExpires})
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$request.post('http://localhost:8000/auth/login', user).then(res => {
            // this.loading = false
            setToken(res.data.token, user.rememberMe)
            this.$router.push('/')
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
          // this.$store.dispatch('Login', user).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: this.redirect || '/' })
          // }).catch(() => {
          //   this.loading = false
          //   this.getCode()
          // })
        } else this.$notify ({
          title: "请完善登录信息！",
          type: 'warning',
          duration: 5000
        })
      })

    },

    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.temp{
  position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  overflow: hidden;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img{
    cursor: pointer;
    vertical-align:middle
  }
}
</style>
