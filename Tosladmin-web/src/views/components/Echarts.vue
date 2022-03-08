<template>
  <div class="app-container">
    <div class="dashboard-editor-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <div class="chart-wrapper">
          <word-cloud />
        </div>
      </el-row>
    </div>
    <div class="head-container">
      <Search />
      <crudOperation>
        <el-button
          slot="left"
          class="filter-item"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :loading="crud.delAllLoading"
          @click="confirmDelAll()"
        >
          清空
        </el-button>
      </crudOperation>
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="createBy" label="发送用户" />
      <el-table-column prop="message" label="消息内容" />
      <el-table-column prop="send_to" label="接收用户" />
      <el-table-column prop="createTime" label="发送时间" width="180px" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import WordCloud from '@/components/Echarts/WordCloud'
import Search from './search'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import { delAllMessage } from '../../api/message'

export default {
  name: 'Echarts',
  components: {
    WordCloud,
    Search,
    crudOperation,
    pagination
  },
  cruds() {
    return CRUD({ title: '消息', url: 'http://localhost:8000/message' })
  },
  mixins: [presenter()],

  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.crud.optShow = {
      add: false,
      edit: false,
      del: false,
      download: true
    }
  },
  methods: {
    confirmDelAll() {
      this.$confirm(`确认清空所有消息吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.crud.delAllLoading = true
        delAllMessage().then(res => {
          this.crud.delAllLoading = false
          this.crud.dleChangePage(1)
          this.crud.delSuccessNotify()
          this.crud.toQuery()
        }).catch(err => {
          this.crud.delAllLoading = false
          console.log(err.response.data.message)
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 22px 22px 22px 22px;
  //background-color: rgb(240, 242, 245);
  background-color: white;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 0;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 70px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.demo-table-expand .el-form-item__content {
  font-size: 12px;
}
</style>
