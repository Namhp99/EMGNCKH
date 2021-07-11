<template>
  <div class="app-container">
    <el-card class="card">
    <h2 class="h2">Tạo bài viết </h2>
    <el-form class="form" ref="HealthTipInfo" :model="HealthTipInfo" :rules="rules" label-width="100px" label-position="left">
      <el-form-item label="Tiêu đề:" prop="Title">
        <el-input v-model="HealthTipInfo.Title" />
      </el-form-item>
      <el-form-item  label="Thể loại:" prop="TypeDoc">
        <el-select v-model="HealthTipInfo.TypeDoc" placeholder="Vui lòng chọn thể loại">
          <el-option v-for="(item,index) of ValueLst" :key="index" :label="item.DefaultValue" :value= item.DefaultValue />
        </el-select>
      </el-form-item>
      <el-form-item label="Hình ảnh:" style="margin-bottom: 30px;margin-left: 10px" prop="LinkImage">
        <el-upload
        class="image"
        ref="Uploadimg"
        :action="Uploadimg"
        :auto-upload="false"
        :multiple="false"
        :limit= 1
        >
        <el-button class="image" type="success"><i class="el-icon-upload"></i>Tải ảnh</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="Chi tiết:" style="margin-bottom: 30px;" prop="Description">
        <Tinymce ref="editor" v-model="HealthTipInfo.Description" :height="400" />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="success" @click="submitForm('HealthTipInfo')" icon="el-icon-edit">Tạo bài viết</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage'
import { AddHealthTip, GetHealthTip } from '@/api/HealthTip'
import { GetToken, GetUpharmaID, GetUserName } from '@/utils/auth'
import GetDefaultValue from '@/api/DefaultValue'
export default {
  components: { Tinymce, Upload },
  data() {
    return {
      DocumentID:'',
      UserName: '0912481902',
      HealthTipInfo: {
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
          { required: true, message: 'Vui lòng chọn thể loại bài viết', trigger: 'change' }
        ],
        Description: [
          { required: true, message: 'Vui lòng ghi nội dung bài viết', trigger: 'blur' }
        ],
        LinkImage: [
          { required: false, message: 'Vui lòng ghi nội dung bài viết', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please input activity form', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.DefaultValue()
  },
  computed: {
    Uploadimg: {
      get() {
        return (
          "http://103.35.64.5/EMGHealth/File/UploadHealthTipImage?DocumentID="
          +this.DocumentID
          +"&Token="+GetToken()+"&UserName="
          +this.UserName
        )
      },
      set() {}
    }
  },
  methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = { UpharmaID: GetUpharmaID(), Token: GetToken(), HealthTipInfo: this.HealthTipInfo }
            AddHealthTip(data).then(res => {
              this.DocumentID = res.data.DocumentID
              console.log(this.DocumentID)
              setTimeout(()=>{
              this.$refs.Uploadimg.submit()
              })
              this.$message({
              message: 'Tạo bài viết thành công',
              type: 'success',
              center: 'true'
              })
            })
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      DefaultValue() {
        const data = { UserName: GetUserName(), TokenCode: GetToken(), TableName: 'TypeDoc'}
        GetDefaultValue(data).then(res => {
          this.ValueLst = res.data.DefaultValueLst
          console.log(this.ValueLst)
        })
      }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.app-container {
  padding: 20px 100px 20px 100px;
}
.h2 {
  margin-bottom: 30px;
  margin-left: 28px;
}
.card {
  border-radius: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.image {
  margin-left: -10px;
}
.form {
  margin: 0px 50px 50px 30px;
}
.el-icon-upload {
  padding-right: 4px;
}

</style>

