<template>
  <div>
    <div class="crud-opts">
      <span class="crud-opts-left">
        <!--左侧插槽-->
        <slot name="left" />
        <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
        >
          <!--            v-if="crud.optShow.add"-->
          <!--            v-permission="permission.add"-->
          <!--            @click="crud.toAdd"-->

          新增
        </el-button>
        <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-edit"
        >
          <!--            v-if="crud.optShow.edit"-->
          <!--            v-permission="permission.edit"-->
          <!--            :disabled="crud.selections.length !== 1"-->
          <!--            @click="crud.toEdit(crud.selections[0])"-->

          修改
        </el-button>
        <el-button
            class="filter-item"
            type="danger"
            icon="el-icon-delete"
            size="mini"
        >
<!--            v-if="crud.optShow.del"-->
          <!--            slot="reference"-->
          <!--            v-permission="permission.del"-->
          <!--            :loading="crud.delAllLoading"-->
          <!--            :disabled="crud.selections.length === 0"-->
          <!--            @click="toDelete(crud.selections)"-->

          删除
        </el-button>
        <el-button
            class="filter-item"
            size="mini"
            type="warning"
            icon="el-icon-download"
        >导出</el-button>
        <!--            v-if="crud.optShow.download"-->
        <!--            :loading="crud.downloadLoading"-->
        <!--            :disabled="!crud.data.length"-->

        <!--            @click="crud.doExport"-->

        <!--右侧-->
        <slot name="right" />
      </span>
      <el-button-group class="crud-opts-right">
        <el-button
            size="mini"
            plain
            type="info"
            icon="el-icon-search"/>
        <!--            @click="toggleSearch()"-->

        <el-button
            size="mini"
            icon="el-icon-refresh"/>
        <!--            @click="crud.refresh()"-->

        <el-popover
            placement="bottom-end"
            width="150"
            trigger="click"
        >
          <el-button
              slot="reference"
              size="mini"
              icon="el-icon-s-grid"
          >
            <i
                class="fa fa-caret-down"
                aria-hidden="true"
            />
          </el-button>
          <el-checkbox
          >
            <!--              v-model="allColumnsSelected"-->
            <!--              :indeterminate="allColumnsSelectedIndeterminate"-->
            <!--              @change="handleCheckAllChange"-->

            全选
          </el-checkbox>
          <!--          <el-checkbox-->
          <!--              v-for="item in tableColumns"-->
          <!--              :key="item.property"-->
          <!--              v-model="item.visible"-->
          <!--              @change="handleCheckedTableColumnsChange(item)"-->
          <!--          >-->
          <!--            {{ item.label }}-->
          <!--          </el-checkbox>-->
        </el-popover>
      </el-button-group>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="username"
          label="用户名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="gender"
          label="性别"
          width="120">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
          width="200">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="200">
      </el-table-column>
      <el-table-column
          prop="dept.name"
          label="部门"
          width="120">
      </el-table-column>
      <el-table-column
          prop="enabled"
          label="状态"
          width="120">
        <template slot-scope="scope">
          <el-switch ref="enabled"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          :show-overflow-tooltip="true"
          prop="createTime"
          label="创建日期"
          width="200">
      </el-table-column>
      <el-table-column
          prop="operation"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button type="text" size="big">Edit</el-button>
          <el-button type="text" size="big">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "User",
  created() {
    this.getUserInfo()
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },

    getUserInfo() {
      this.$request.get('http://localhost:8000/api/users').then(res => {
        console.log(res.data);
        this.tableData = res.data.content  })
    },
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style scoped>

</style>