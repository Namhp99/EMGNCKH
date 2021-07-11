<template>
  <div class="app-container">
    <el-card class="card">
    <h2 class="h2">Thay đổi mật khẩu </h2>
    <el-form class="form" ref="form" :model="Account" :rules="rules" label-width="150px" label-position="left">
      <el-form-item label="Mật khẩu cũ" prop="OldPassword">
         <el-input v-model="Account.OldPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="Mật khẩu mới" prop="NewPassword">
        <el-input v-model="Account.NewPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="Nhập lại mật khẩu" style="margin-bottom: 30px;" prop="ReNew">
        <el-input v-model="Account.ReNew" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')" icon="el-icon-edit">Lưu</el-button>
        <el-button @click="resetForm('form')" icon="el-icon-refresh-left">Hủy</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import ChangePassword from '@/api/UserNCKH'
import { GetUpharmaID } from '@/utils/auth'
export default {
  data() {
    return {
      Account: {
        OldPassword: '',
        NewPassword: '',
        ReNew: '',
      },
      ReNew: '',
      rules: {
        OldPassword: [
          { required: true, message: 'Vui lòng nhập mật khẩu cũ', trigger: 'blur' }
        ],
        NewPassword: [
          { required: true, message: 'Vui lòng nhập mật khẩu mới', trigger: 'blur' }
        ],
        ReNew: [
          { required: true, message: 'Vui lòng nhập lại mật khẩu', trigger: 'blur' }
        ],
            
      }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.Account.NewPassword ==this.Account.ReNew){
              const data = { UpharmaID: GetUpharmaID(), OldPassword: this.Account.OldPassword, NewPassword: this.Account.NewPassword}
              ChangePassword(data).then(res => {
                if (res.data.RespCode == 0) {
                  this.$message({
                    message: 'Đổi mật khẩu thành công',
                    type: 'success'
                  })
                  this.$refs[formName].resetFields();
                }
                else {
                  this.$message({
                    message: 'Đổi mật khẩu thất bại!',
                    type: 'warning'
                  })
                }
              })
            }
            else {
              this.$message.warning('Nhập lại mật khẩu chưa chính xác')
              return
            }
          } 
          else {
            this.$message.error('Vui lòng điền đầy đủ thông tin!')
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}

.h2 {
  margin-bottom: 50px;
}
.card {
  width: 450px;
  height: 500px;
  border-radius: 20px;
  margin: 20px auto auto 40px;
}
</style>

