<template>
  <div class="block">
    <div class="info">
      <h4 class="h4">Chỉ số sức khỏe cơ bản</h4>
      <el-row>
        <el-col class="img-content" :span="8" :xs="20">
          <p>Chiều cao: {{ HealthInfo.Height }} (Cm)</p>
          <p>Cân nặng: {{ HealthInfo.Weight }} (Kg)</p>
          <p>Nhóm máu: {{ HealthInfo.BloodType }}</p>
          <p>Huyết áp: {{ HealthInfo.BloodPressure }} (mmHg)</p>
        </el-col>
      </el-row>
    </div>
    <div class="HealthHistory">
      <h4 class="h3">Tiền sử mắc bệnh</h4>
      <el-timeline>
        <el-timeline-item v-for="(item,index) of List" :key="index" placement="top">
          <el-card style="margin-bottom:20px; border-radius: 20px">
            <h4 class="title">{{ item.TypeDisease }}</h4>
            <p>Chi tiết: {{ item.MoreInfo }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script>
import { GetHealthInfo, GetHealthHistory } from '@/api/HealthRecord'
import { GetToken, GetUpharmaID } from '@/utils/auth'
export default {
  data() {
    return {
      List: '',
      HealthInfo: {
        Weight: '',
        Height: '',
        BloodPressure: '',
        BloodType: ''
      }
    }
  },
  created() {
    this.HealthInf()
    this.History()
  },
  methods: {
    HealthInf() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetHealthInfo(data).then(Response => {
        this.HealthInfo = Response.data.HealthInfo
      })
    },
    History() {
      const data = { Token: GetToken(), UpharmaID: GetUpharmaID() }
      GetHealthHistory(data).then(Response => {
        this.List = Response.data.HealthHistoryLst
      })
    }
  }
}
</script>
<style>
.img-content {
  padding-left: 10px;
  margin-bottom: 0px;
  font-size: 14px;
}
.h4 {
  margin-bottom: 0px;
  font-size: 15px;
}
.h3 {
  margin-bottom: 18px;
  font-size: 15px;
}
.title {
  margin-top: 0px;
  font-size: 16px;
}
</style>
