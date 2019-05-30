<template>
  <div>
    <div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="反馈用户" prop="userName"></el-table-column>
        <el-table-column label="建议" prop="suggestion"></el-table-column>
      </el-table>
    </div>
    <div class="padination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagesize: 10,
      count: 0,
      currentPage: 1
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$http.post(
        "/suggestion/getSuggestionCount",
        null,
        response => {
          if (response.data.code == "200") {
            this.count = response.data.data;
            this.currentPage = 1;
            this.getUserByPage();
          }
        },
        () => {
          console.log("err");
        }
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserByPage();
    },
    getUserByPage() {
      this.$http.post(
        "/suggestion/getSuggestionByPage",
        { offset: this.currentPage, pagesize: this.pagesize },
        response => {
          if (response.data.code == "200") {
            const User = response.data.data;
            this.tableData = [];
            User.forEach((item, index) => {
              const tableData = {};
              tableData.id = item.id;
              tableData.userName = item.userName;
              tableData.suggestion = item.suggestion;
              tableData.index = index;
              this.tableData.push(tableData);
            });
          }
        },
        () => {
          console.log("err");
        }
      );
    }
  }
};
</script>


<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.padination {
  text-align: right;
  margin-top: 10;
}
</style>
