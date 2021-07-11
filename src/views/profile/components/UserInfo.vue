<template>
  <div class="user-info">
    <div class="info">
      <h4 class="h4">Thông tin cá nhân</h4>
      <el-row>
        <el-col class="img-content" :span="8" :xs="20">
          <p>Họ và tên: {{ UserInfo.FullName }}</p>
          <p>Ngày sinh: {{ UserInfo.DateOfBirth }}</p>
          <p>Giới tính: {{ UserInfo.Sex }}</p>
        </el-col>
        <el-col class="img-content" :span="8" :xs="20">
          <p>Số điện thoại: {{ UserInfo.PhoneNumber }}</p>
          <p>Email: {{ UserInfo.Email }}</p>
          <p>CCCD/CMTND:</p>
        </el-col>
        <el-col class="img-content" :span="8" :xs="20">
          <p>Dân tộc:</p>
          <p>Tôn giáo:</p>
          <p>Quốc tịch:</p>
        </el-col>
      </el-row>
      <p class="p">Địa chỉ: {{ UserInfo.Address }}</p>
    </div>
    <div class="Relationship">
      <h4 class="h4">Thông tin người thân</h4>
      <el-row v-for="(item,index) of RelativeLst" :key="index" class="rowship">
        <el-col class="Relationship1" :span="8" :xs="20">
          <p>Họ và tên {{ item.Relationship }}: {{ item.FullName }}</p>
        </el-col>
        <el-col class="Relationship1" :span="8" :xs="20">
          <p>Số điện thoại: {{ item.PhoneNumber }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { GetToken, GetUpharmaID } from '@/utils/auth'
import { GetUserInfo, GetRelative } from '@/api/UserNCKH'
export default {
  data() {
    return {
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
      },
      RelativeLst: {
        RowID: '',
        RelativeID: '',
        FullName: '',
        Relationship: '',
        ShareInfo: true,
        MoreInfo: '',
        PhoneNumber: '',
        Email: ''
      }
    }
  },
  created() {
    this.GetInfo()
    this.Relative()
  },
  methods: {
    GetInfo() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetUserInfo(data).then(Response => {
        this.UserInfo = Response.data.UserInfo
      })
    },
    Relative() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetRelative(data).then(Response => {
        this.RelativeLst = Response.data.RelativeLst
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rowship {
  margin-bottom: 0px;
  margin-top: 0px;
}
.h4 {
  margin-bottom: 0px;
  font-size: 15px;
}
.p {
  padding-left: 10px;
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 40px;
}
.Relationship1 {
  padding-left: 10px;
  font-size: 14px;
}
.img-content {
  padding-left: 10px;
  margin-bottom: 0px;
  font-size: 14px;
}
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
