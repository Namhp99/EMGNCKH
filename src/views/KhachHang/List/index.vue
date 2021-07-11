<template>
  <div class="app-container">
    <div class="t">
      <h2 class="h2">Danh sách khách hàng</h2>
      <el-input placeholder="Nhập để tìm kiếm..." style="width: 25%" class="filter-item" @keyup.enter.native="GetList" />
      <el-button class="find" type="primary" icon="el-icon-search">Tìm kiếm</el-button>
    </div>    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column 
        align="center"
        label="STT"
        type="index"
      >
      </el-table-column>
      <el-table-column label="Họ tên" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Giới tính" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày sinh" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Số điện thoại" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email " width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Địa chỉ" width="400">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
  },
  methods: {
    indexMethod(index) {
      return index + 1
    }
  }
}
</script>
<style>
.t {
  margin-bottom: 20px;
}
.find {
  margin-left: 20px;
}
</style>
