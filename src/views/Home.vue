<template>
  <div>
    <h2>Dashboard</h2>
    <el-button @click.native.prevent="logout">注销</el-button>
    <el-button @click.native.prevent="setUserinfo">get info</el-button>
  </div>

</template>

<script>
import {removeToken} from "@/utils/auth";
import Config from "@/settings";

export default {
  name: "Dashboard",
  methods: {
    logout(){
      this.$request.delete('http://localhost:8000/auth/logout').then(res=>{
        removeToken(Config.TokenKey)
        this.$router.replace('/')
      })
    },

    setUserinfo(){
      this.$request.get('http://localhost:8000/auth/info').then(res=>{
        console.log(res.data);
      })
    }
  }
}
</script>

<style scoped>

</style>