<template>
  <div class="layout">
    <el-container class="container">
      <el-container>
        <el-aside width="auto">
          <!-- <div class="logo"></div> -->
          <el-menu
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :default-active="$route.path"
            :router="true"
            :unique-opened="true"
            text-color="#fff"
            active-text-color="#409EFF"
            background-color="#304156"
          >
            <template v-for="route in newrouter">
              <!-- 没有子路由 -->
              <el-menu-item v-if="route.children.length == 1" :index="route.path" :key="route.name">
                <!-- <i class="fa fa-server" aria-hidden= "true"></i> -->
                <i class="el-icon-menu"></i>
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
                  <i class="el-icon-menu"></i>
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
        <el-container>
          <el-header style="height:50px;">
            <div class="header-left">
              <i class="el-icon-more" @click="isCollapseMenu"></i>
            </div>
            <div class="header-right">
              <ul>
                <li>
                  <el-tooltip content="Top center" placement="top">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </el-tooltip>
                </li>
                <li>关闭2</li>
                <li>全屏</li>
                <li>
                  <el-dropdown :hide-on-click="false">
                    <el-button type="primary" icon="el-icon-more-outline"></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="loginOut">退出登录</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
              <!-- <button @click="handleFullScreen">全屏</button> -->
            </div>
          </el-header>
          <el-main>
            <div class="tag-box">
              <el-tag
                v-for="tag in tagslist"
                :key="tag.title"
                closable
                :disable-transitions="false"
                @close="closeTag(tag)"
                @click="redirect(tag)"
                :class="{'active':isActive(tag.path)}"
              >{{tag.title}}</el-tag>
            </div>
            <router-view :key="activeDate" style="padding:5px;"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getRouters } from "../api/index.js";
export default {
  name: "Layout",
  data() {
    return {
      activeDate: 0,
      isCollapse: false,
      // tags: [],
      tagslist: [{ title: "首页", path: "/home" }],
      list: []
    };
  },
  methods: {
    isActive: function(path) {
      return path == this.$route.path;
    },
    //关闭标签页
    closeTag(tag) {
      if (tag.title != "首页") {
        var route = this.tagslist[this.tagslist.indexOf(tag) - 1];
        this.$router.push(route.path);
        this.tagslist.splice(this.tagslist.indexOf(tag), 1);
      }
    },
    //添加标签页
    addTag: function(route) {
      var tagObj = { title: route.meta.title, path: route.path };
      const isExist = this.tagslist.some(function(item) {
        return item.path == route.path;
      });
      !isExist && this.tagslist.push(tagObj);
      this.$store.dispatch("ADDTAGS", this.tagslist);
      // sessionStorage.setItem("TAGLIST", JSON.stringify(this.tagslist));
      // this.$store.dispatch("ADDTAGS", this.tags);
      // this.tags.push(tagObj);
      // console.log(this.tags);
    },
    //点击标签跳转路由
    redirect: function(tag) {
      this.$router.push(tag.path);
    },
    refresh: function() {
      console.log("路由变化");
      this.activeDate = new Date().getTime();
    },
    //退出登录
    loginOut: function() {
      this.$store.dispatch("LoginOut", "").then(
        function() {
          this.$router.push("/login");
        }.bind(this)
      );
    },
    isCollapseMenu: function() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {
    ...mapGetters(["newrouter"])
    // ...mapGetters(["tags"])
  },
  watch: {
    //监听路由变化
    $route: function(newVal, oldVal) {
      this.addTag(newVal);
      this.refresh();
    }
  },
  created: function() {
    // if (JSON.parse(sessionStorage.getItem("TAGLIST"))) {
    //   this.tagslist = JSON.parse(sessionStorage.getItem("TAGLIST"));
    // }
    if (JSON.parse(this.$store.getters.tags)) {
      this.tagslist = JSON.parse(this.$store.getters.tags);
    }
    console.log(JSON.parse(this.$store.getters.tags));
    // this.tagslist = JSON.parse(sessionStorage.getItem("TAGLIST"));
  }
};
</script>

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
  /* background-color: #b3c0d1; */
  color: #333;
  height: 50px;
  line-height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.el-aside {
  background-color: #304156;
  color: #333;
  /* line-height: 200px; */
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu {
  border-right-width: 0;
  border-top-width: 0;
  /* background-color: #ccc; */
  /* overflow: hidden; */
}
.el-main {
  padding: 0;
}
.tag-box {
  width: 100%;
  height: 45px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-tag {
  margin-right: 10px;
  cursor: pointer;
}
.el-tag.active {
  background-color: #409eff;
  color: #fff;
}

/* 修改默认样式 */
.el-tag.active /deep/ i {
  color: #fff;
}
.el-tag.active /deep/ i:hover {
  background-color: #fff;
  color: #409eff;
}
.header-left,
.header-right {
  height: 100%;
}
.header-left i {
  font-size: 20px;
  /* border: 1px solid #000; */
}
.header-right ul {
  height: 100%;
}
.header-right ul li {
  height: 100%;
  float: left;
  margin-right: 5px;
  cursor: pointer;
}
.header-right ul li:hover {
  background-color: rgb(253, 252, 252);
}
.header-right ul li i {
  font-size: 26px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/* @media print {
  .noprint {
    display: none;
  }
} */
</style>
