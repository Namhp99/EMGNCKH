<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="22">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card class="test">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Thông tin cá nhân" name="UserInfo">
                <UserInfo />
              </el-tab-pane>
              <el-tab-pane label="Hồ sơ y tế" name="HealthHistory">
                <HealthHistory />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import UserInfo from './components/UserInfo'
import HealthHistory from './components/HealthHistory'

export default {
  name: 'Profile',
  components: { UserCard, UserInfo, HealthHistory },
  data() {
    return {
      user: {},
      activeTab: 'UserInfo'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>
<style>
.test {
  border-radius: 20px;
}
</style>