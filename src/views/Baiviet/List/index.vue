<template>
  <div class="app-container">
    <div>
      <h2>Danh sách bài viết</h2>
    </div>
    <div class="t">
      <router-link :to="'/Bai-viet/Tao-bai-viet'">
        <el-button class="create" type="success" icon="el-icon-circle-plus" style="width: 120px">Tạo bài</el-button>
      </router-link>
        <el-input placeholder="Tìm kiếm..." class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
    <el-table
      class="table"
      v-loading="listLoading"
      :data="list"
      border 
      fit 
      highlight-current-row 
      style="width: 100%" 
    >
     <el-table-column align="center" label="Tác vụ" width="100px">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" icon="el-icon-edit" circle @click="Update(row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="Del(row)"></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="STT" type="index" width="50px">
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" width="100px">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.Status | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Thể loại" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.TypeDoc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tiêu đề" align="center" width="300px">
        <template slot-scope="{row}">
          <a href="">
          <p class="Description">{{ row.Title }}</p>
          </a>        
          </template>
      </el-table-column>
      <el-table-column label="Ngày tạo" align="center" width="180px">
        <template slot-scope="{row}">
          <i class="el-icon-time"></i>
          <span>{{ row.TimeCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Chi tiết" align="center">
        <template slot-scope="{row}">
          <a href="">
          <p class="Description" v-html="row.Description"></p>
          </a>
        </template>
      </el-table-column>   
    </el-table>
    <el-dialog style="border-radius: 15px;" width="68%" :visible.sync = dialogform>
      <h1 class="h1">Cập nhật bài viết </h1>
    <el-form class="dataForm" ref="HealthTipInfo" :model="HealthTipInfo" :rules="rules" label-width="100px" label-position="left">
      <el-form-item label="Tiêu đề" prop="Title">
        <el-input v-model="HealthTipInfo.Title" />
      </el-form-item>
      <el-form-item  label="Thể loại:" prop="TypeDoc">
        <el-select v-model="HealthTipInfo.TypeDoc" placeholder="Vui lòng chọn thể loại">
          <el-option v-for="(item,index) of ValueLst" :key="index" :label="item.DefaultValue" :value= item.DefaultValue />
        </el-select>
      </el-form-item>
      <el-form-item label="Chi tiết:" style="margin-bottom: 30px;" prop="Description">
        <Tinymce ref="editor" v-model="HealthTipInfo.Description" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="success" @click="submitForm('HealthTipInfo')" icon="el-icon-edit">Cập nhật</el-button>
        <el-button class="btn" type="info" @click="Thoat()" icon="el-icon-circle-close">Thoát</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <el-pagination
  :page-size="5"
  :pager-count="9"
  layout="prev, pager, next"
  :total="30">
</el-pagination>    
  </div>
</template>

<script>
import { GetHealthTip, UpdateHealthTip, DelHealthTip } from '@/api/HealthTip'
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage'
import { GetToken, GetUpharmaID, GetUserName } from '@/utils/auth'
import GetDefaultValue from '@/api/DefaultValue'
const calendarTypeOptions = [
  { key: '0', display_name: 'Mới tạo' },
  { key: '1', display_name: 'Đã xem' },
  { key: '2', display_name: 'Đã in' },
  { key: '100', display_name: 'Chỉnh sửa' },
  { key: '-1', display_name: 'Đã hủy' }
]
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  components: { Tinymce, Upload },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(Status) {
      return calendarTypeKeyValue[Status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      dialogform: false,
      HealthTipInfo: {
        RowID: '',
        UpharmaID: '',
        TimeModify: '',
        ModifyID: '',
        DocumentID: '',
        Title: '',
        TypeDoc: '',
        LinkImage: '',
        Status: '',
        Description: '',
        CreateID: '',
        TimeCreate: '',
      },
      ValueLst: {
        TableName: '',
        DefaultValue: ''
      },
      rules: {
        Title: [
          { required: true, message: 'Vui lòng thêm tiêu đề bài viết ', trigger: 'blur' }
        ],
        TypeDoc: [
          { required: true, message: 'Vui lòng chọn thể loại', trigger: 'change' }
        ],
        Description: [
          { required: true, message: 'Vui lòng ghi nội dung', trigger: 'blur' }
        ],
      }
    } 
  },
  created() {
    this.GetList()
    this.DefaultValue()
  },
  methods: {
    GetList() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetHealthTip(data).then(Response => {
        console.log(Response)
        this.list = Response.data.HealthTipLst
      })
    },
    DefaultValue() {
        const data = { UserName: GetUserName(), TokenCode: GetToken(), TableName: 'TypeDoc'}
        GetDefaultValue(data).then(res => {
          this.ValueLst = res.data.DefaultValueLst
        })
      },
    Update(row) {
      this.HealthTipInfo = row
      console.log(this.HealthTipInfo.RowID)
      this.dialogform = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = { UpharmaID: GetUpharmaID(), Token: GetToken(), HealthTipInfo: this.HealthTipInfo }
          UpdateHealthTip(data).then(res => {
            this.$message({
            message: 'Cập nhật bài viết thành công',
            type: 'success',
            center: 'true'
            })
          })
          this.dialogform = false
        } 
        else {
          this.$message({
            message: 'Vui lòng điền đầy đủ thông tin!',
            type: 'error',
            center: 'true'
            })
        }
      });
    },
    Thoat() {
      this.dialogform = false
    },
    Del(row) {
      const data = { UpharmaID: GetUpharmaID(), Token: GetToken(), RowID: row.RowID }      
      DelHealthTip(data).then(res => {
        this.$message.success('Xoá bài viết thành công!')
        this.GetList()
      })
    },
    Create() {
      this.$router.push({ name: 'Baiviet' })
    } 
  }
}
</script>
<style>
.t {
  margin-bottom: 20px;
}
.create {
      border-radius: 6px
}
.find {
  margin-left: 20px;
}
.Description {
  word-break: break-word;
  font-weight: 600px;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.Des {
  word-break: break-word;
}
.dataForm {
  margin-right: 40px;
  margin-left: 20px;
}
.h1 {
  padding-left: 20px;
}
.image {
  margin-left: -10px;
  
}
.btn {
  width: 120px;
}
.input-with-select {
  width: 35%;
  float: right;
  border-radius: 15px;
}
</style>