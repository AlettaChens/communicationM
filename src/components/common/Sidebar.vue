<template>
    <div class="sidebar">
        <el-menu :default-active="defaultActive" @open="handleOpen" class="el-menu-vertical-demo" background-color="#3385FF" text-color="#fff"
                 unique-opened router>
            <el-menu-item index="news">
            <i class="el-icon-location"></i>
            <span slot="title">资讯管理</span>
            </el-menu-item>
           <el-menu-item index="book">
           <i class="el-icon-menu"></i>
           <span slot="title">图书管理</span>
           </el-menu-item>
           <el-menu-item index="feedback">
           <i class="el-icon-setting"></i>
           <span slot="title">反馈列表</span>
           </el-menu-item>
           <el-menu-item index="user">
           <i class="el-icon-document"></i>
           <span slot="title">用户列表</span>
           </el-menu-item>
        </el-menu>
    </div>

</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #3385FF;
}

.sidebar > ul {
  height: 100%;
}

.el-menu-item,
.el-submenu__title {
  height: 45px !important;
  line-height: 45px !important;
}
</style>


