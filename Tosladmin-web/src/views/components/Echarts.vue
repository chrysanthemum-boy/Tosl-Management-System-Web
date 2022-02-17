<template>
  <!--  <div class="dashboard-container">-->
  <!--    <div class="dashboard-editor-container">-->
  <!--      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
  <!--        <heat-map />-->
  <!--      </el-row>-->
  <!--      <el-row :gutter="32">-->
  <!--        <el-col :xs="24" :sm="24" :lg="8">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <radar-chart />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--        <el-col :xs="24" :sm="24" :lg="8">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <sunburst />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--        <el-col :xs="24" :sm="24" :lg="8">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <gauge />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-row :gutter="12">-->
  <!--        <el-col :span="12">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <rich />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--        <el-col :span="12">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <theme-river />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-row :gutter="32">-->
  <!--        <el-col :xs="24" :sm="24" :lg="8">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <graph />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--        <el-col :xs="24" :sm="24" :lg="8">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <sankey />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--        <el-col :xs="24" :sm="24" :lg="8">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <line3-d />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-row :gutter="12">-->
  <!--        <el-col :span="12">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <scatter />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--        <el-col :span="12">-->
  <!--          <div class="chart-wrapper">-->
  <!--            <point />-->
  <!--          </div>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
  <!--        <div class="chart-wrapper">-->
  <!--          <word-cloud />-->
  <!--        </div>-->
  <!--      </el-row>-->
  <!--      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
  <!--        <div class="chart-wrapper">-->
  <!--          <category />-->
  <!--        </div>-->
  <!--      </el-row>-->
  <!--    </div>-->
  <!--  </div>-->
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
    <el-table ref="table" v-loading="crud.loading" :data="tableData" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <!--      <el-table-column type="expand">-->
      <!--        <template slot-scope="props">-->
      <!--          <el-form label-position="left" inline class="demo-table-expand">-->
      <!--            <el-form-item label="请求方法">-->
      <!--              <span>{{ props.row.method }}</span>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="请求参数">-->
      <!--              <span>{{ props.row.params }}</span>-->
      <!--            </el-form-item>-->
      <!--          </el-form>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="createBy" label="发送用户" />
      <el-table-column prop="message" label="消息内容" />
      <el-table-column prop="send_to" label="接收用户" />
      <!--      <el-table-column prop="requestIp" label="IP" />-->
      <!--      <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />-->

      <!--      <el-table-column prop="browser" label="浏览器" />-->
      <!--      <el-table-column prop="time" label="发送耗时" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>-->
      <!--          <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>-->
      <!--          <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="createTime" label="发送时间" width="180px" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
// import RadarChart from '@/components/Echarts/RadarChart'
// import HeatMap from '@/components/Echarts/HeatMap'
// import Gauge from '@/components/Echarts/Gauge'
// import Rich from '@/components/Echarts/Rich'
// import ThemeRiver from '@/components/Echarts/ThemeRiver'
// import Sunburst from '@/components/Echarts/Sunburst'
// import Graph from '@/components/Echarts/Graph'
// import Sankey from '@/components/Echarts/Sankey'
// import Scatter from '@/components/Echarts/Scatter'
// import Line3D from '@/components/Echarts/Line3D'
// import Category from '@/components/Echarts/Category'
// import Point from '@/components/Echarts/Point'
import WordCloud from '@/components/Echarts/WordCloud'
import Search from './search'
import { delAllInfo } from '@/api/monitor/log'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import { getMessage } from '../../api/message'
import { getInfo } from '../../api/login'

export default {
  name: 'Echarts',
  components: {
    WordCloud,
    Search,
    crudOperation,
    pagination
  },
  cruds() {
    return CRUD({ title: '日志', url: 'api/logs' })
  },
  mixins: [presenter()],

  data() {
    return {
      tableData: [],
      id: 0
    }
  },
  created() {
    this.setMessage()
    // this.setUserinfo()
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
        delAllInfo().then(res => {
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
    },

    setMessage() {
      // eslint-disable-next-line no-unused-vars
      let id = 0
      getInfo().then(res => {
        id = res.user.id
        // console.log(res.user.id)
        getMessage(id).then(res => {
          // console.log(res)
          this.tableData = res
          // console.log(this.tableData)
        })
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
