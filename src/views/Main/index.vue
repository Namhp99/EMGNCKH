<template>
  <div class="Form" >
    <el-row :gutter="50">
      <el-col v-for="(item,index) of list" :key="index" class="img-content" :span="5" :xs="20" style="margin-left: 8px; margin-right: 8px; padding-left:0px; padding-right: 0px;
    border-radius: 10px;
    overflow: hidden;">
        <div class="event-item">
          <a href="#/Bai-viet/Danh-sach">
            <img class="imageurl" :src="item.LinkUrl" alt="" onerror="this.onerror=null;this.src='https://play-lh.googleusercontent.com/a0LtLyjbJdqq_5tZLG9HsNIXt_sfUT7a2FFjZ1ece9a4LhyXiy6-TKcCYW1yM812Dg';">
          </a>
          <div class="event-content">
            <a href="">
              <h4 class="h3">{{item.Title}}</h4>
            </a>
            <p class="title">Thể loại: {{item.TypeDoc}}</p>
            <i class="el-icon-time">{{item.TimeCreate}}</i>
            </div>
        </div>      
      </el-col>
    </el-row>
    <div class="pag">
    <el-pagination
  :page-size="5"
  :pager-count="9"
  layout="prev, pager, next"
  :total="30" style="margin-bottom: 40px;">
</el-pagination>
   </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetHealthTip, UpdateHealthTip, DelHealthTip } from '@/api/HealthTip'
import { GetToken, GetUpharmaID } from '@/utils/auth'
import parseTime from '@/utils/index'
import HealthTipImage from '@/api/UserNCKH'
export default {
  name: 'Main',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      list: '',
      HealthTipInfo: {
        RowID: '1',
        UpharmaID: '',
        TimeModify: '',
        ModifyID: '',
        DocumentID: '',
        Title: '',
        TypeDoc: '',
        LinkImage: 'https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-0/p180x540/183502733_261276015680417_2978575244587056990_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=730e14&_nc_ohc=aIDmtDCNj4sAX8vnt9D&_nc_ht=scontent-hkg4-2.xx&tp=6&oh=d581d8f9ec4c6039bf4e03803039e266&oe=60BCCC87',
        Status: '',
        Description: '',
        CreateID: '',
        TimeCreate: '',
      },
    }
  },
  created() {
    this.GetList()
  },
  methods: {
    GetList() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetHealthTip(data).then(Response => {
        console.log(Response)
        this.list = Response.data.HealthTipLst.map(item=>{
          return{
            ...item,
            LinkUrl: 'http://103.35.64.5/EMGHealth/File/DownloadHealthTipImage?DocumentID='+item.RowID
          }
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.h3 {
  margin: 5px auto 7px auto;
  font-size: 14px;
  font-weight: 600px;
  overflow: hidden;
  text-overflow: ellipsis; 
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-family: arial, verdana, sans-serif;
  color:rgb(68, 67, 67);

}
.title {
  margin-top: 5px;
  margin-bottom: 2px;
  font-size: 13px;
  color:rgb(82, 80, 80);
  font-family: arial, verdana, sans-serif;
  }
.Form {
  margin: 50px auto 0px 11%;
  border: 4;
}
.event-item {
  img {
    height: 160px;
    width: 100%;
  }
}
.el-icon-time {
  font-size: 13px;
  padding-bottom: 5px;
  color: rgb(78, 76, 76);
}

.img-content {
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: rgb(240, 243, 239);
box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
}
.event-content {
  padding: 0px 5px 0px 5px;

}

</style>
