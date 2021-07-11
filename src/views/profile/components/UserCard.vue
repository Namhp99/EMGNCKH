<template>
  <el-card style="margin-bottom:20px; border-radius: 20px">
    <div slot="header">
      <span>Hồ sơ cá nhân</span>
    </div>
    <div class="user-profile">
      <div class="img">
        <img :src="LinkAva" alt="" onerror="this.onerror=null;this.src='https://play-lh.googleusercontent.com/a0LtLyjbJdqq_5tZLG9HsNIXt_sfUT7a2FFjZ1ece9a4LhyXiy6-TKcCYW1yM812Dg';" width="150px">
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ UserInfo.FullName }}</div>
      </div>
    </div>
    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-phone-outline"></i>
          <span class="contact">Liên hệ</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <i class="el-icon-date"></i>
            <span>Ngày sinh: {{ UserInfo.DateOfBirth }}</span>
          </div>
          <div class="progress-item">
            <i class="el-icon-phone"></i>
            <span>Số điện thoại: {{ UserInfo.PhoneNumber }}</span>
          </div>
          <div class="progress-item">
            <i class="el-icon-message"></i>
            <span>Email: {{ UserInfo.Email }}</span>
          </div>
          <div class="progress-item">
            <i class="el-icon-map-location"></i>
            <span>Địa chỉ: {{ UserInfo.Address }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { GetToken, GetUpharmaID } from '@/utils/auth'
import { GetUserInfo } from '@/api/UserNCKH'
export default {
  data() {
    return {
      LinkAva: 'http://103.35.64.5/EMGHealth/File/DownloadUserImage?UpharmaID=' + GetUpharmaID(),
      UserInfo: {
        UpharmaID: undefined,
        FullName: '',
        Sex: '',
        DateOfBirth: '',
        PhoneNumber: '',
        Address: '',
        Email: '',
        UType: undefined,
        Nation: '',
        Professtion: '',
        IDNumber: '',
        UserCode: '',
        Status: undefined
      }
    }
  },
  created() {
    this.GetInfo()
  },
  methods: {
    GetInfo() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetUserInfo(data).then(Response => {
        this.UserInfo = Response.data.UserInfo
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
.el-icon-phone-outline{
  font-size: 30px;
}
.user-profile {
  .user-name {
    font-weight: bold;
    font-size: 19px;
  }
  img {
    border-radius: 50%;
    overflow: hidden;
    display: block;
    display: block; margin-left: auto; margin-right: auto;
    }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}
.el-icon-phone-outline {
  color:#63BF37;
}
.el-icon-phone{
  color:#63BF37;

}
.el-icon-date {
  color:#63BF37;
}
.el-icon-message {
  color:#63BF37;
}
.el-icon-map-location {
  color:#63BF37;

}
.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;
.contact {
  font-size: 19px;
}
    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .progress-item{
      margin-bottom: 5px;
    }
  }
}
</style>
