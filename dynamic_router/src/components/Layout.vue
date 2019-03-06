<template>
  <div class="layout">
    <el-container class="container">
      <el-header>
        <button @click="loginOut">退出</button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :default-active="$route.path"
            :router="true"
            text-color="#909399"
            active-text-color="#409eff"
            background-color="#545c64"
          >
            <template v-for="route in newrouter">
              <!-- 没有子路由 -->
              <el-menu-item v-if="route.children.length == 1" :index="route.path" :key="route.name">
                <!-- <i class="fa fa-server" aria-hidden="true"></i> -->
                <span slot="title">{{route.children[0].meta.title}}</span>
              </el-menu-item>
              <!-- 判断有子列表时显示 -->
              <el-submenu
                :index="route.meta.title"
                v-else-if="route.children.length >1"
                :key="route.name"
              >
                <template slot="title">
                  <!-- <i class="fa" :class="route.meta.icon" aria-hidden="true"></i> -->
                  <span slot="title">{{route.meta.title}}</span>
                </template>
                <!-- 循环显示子列表 -->
                <el-menu-item :index="item.path" v-for="item in route.children" :key="item.name">
                  <!-- <i class="fa" :class="item.meta.icon" aria-hidden="true"></i> -->
                  <span>{{item.meta.title}}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import axios from "axios";
import { getRouters } from "../api/index.js";
export default {
  name: "Layout",
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

    //退出登录
    loginOut: function() {
      this.$store.dispatch("LoginOut", "").then(
        function() {
          this.$router.push("/login");
        }.bind(this)
      );
    }
  },
  computed: {
    ...mapGetters(["newrouter"])
  },
  created: function() {
    // console.log(this.$store.getters.newrouter);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-menu {
  border-right-width: 0;
  border-top-width: 0;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

/* body > .el-container {
  margin-bottom: 40px;
} */

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
