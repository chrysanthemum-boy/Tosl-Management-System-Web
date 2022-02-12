<template>
  <div style="height: 100%">
    <el-container style="height: 100%; border: 0 solid #33af45">
      <!--左边任务栏-->
      <div>
        <h3>首页</h3>
      <el-aside width="205px" >
        <el-menu text-color="#bfcbd9" class="sidebar-container" style="text-align: left">
          <div>

          </div>
          <el-submenu :index="item.name" v-for="item in menuList" >

            <template slot="title">
              <svg-icon slot="prefix" :icon-class="item.meta.icon"/>
              {{item.meta.title}}
            </template>

            <el-menu-item :index="child.name" v-for="child in item.children" style="padding-left: 15px; text-align: center" @click="selectMenu(item.path, child.path)">
              <template slot="title">
                <svg-icon slot="prefix" :icon-class="child.meta.icon"/>
                {{child.meta.title}}
              </template>
            </el-menu-item>

          </el-submenu>
        </el-menu>
      </el-aside>
  </div>
      <!--右边主界面-->
      <el-container>
        <el-header style="text-align: right; font-size: 16px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px; font-size: 16px"></i>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="align-content: center">{{ user.username }}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>



<script>
import {removeToken} from "@/utils/auth";
import Config from "@/settings";

export default {
  name: "Dashboard",
  created() {
    this.getMenus()
    this.setUserinfo()

  },
  methods: {
    logout(){
      this.$request.delete('http://localhost:8000/auth/logout').then(res=>{
        removeToken(Config.TokenKey)
        this.$router.replace('/login')
      })
    },

    setUserinfo(){
      this.$request.get('http://localhost:8000/auth/info').then(res=>{
        this.user = res.data.user
        console.log(res.data.user);
      })
    },


    getMenus() {
      this.$request.get('http://localhost:8000/api/menus/build').then(res => {
        this.menuList = res.data
        console.log(this.menuList);
      })
    },

    selectMenu(path1, path2) {
      this.$router.replace(path1 + '/' + path2).catch(err=>err)
    }
  },

  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    user = {

    }
    return {
      tableData: Array(10).fill(user),
      menuList: [],
      user: {}
    }
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 100%;
}

.aside{
  width: 200px;
  background-color: rgb(238, 241, 246)
}
</style>