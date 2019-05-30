<template>
  <div>
    <div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="图书价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="图书详情">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书标题" prop="title"></el-table-column>
        <el-table-column label="联系电话" prop="phone"></el-table-column>
        <el-table-column label="图书价格" prop="price"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
 <div>
      <el-dialog title="图书信息更新" :visible.sync="dialogFormVisible" width="40%">
  <el-form :model="form" enctype="multipart/form-data">
    <el-form-item label="图书名称" :label-width="'120px'">
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图书价格" :label-width="'120px'">
    <el-input v-model="form.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" :label-width="'120px'">
    <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="服务描述" :label-width="'120px'">
    <el-input v-model="form.description" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addService">确 定</el-button>
  </div>
</el-dialog>
</div>
<div>
  <el-dialog title="提示（谨慎操作）" :visible.sync="deletedialog" width="30%" center>
  <span>您确认要删除这个服务吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deletedialog = false">取 消</el-button>
    <el-button type="danger" @click="serviceDelete()">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      pagesize: 8,
      count: 0,
      currentPage: 1,
      form: {
        bookId:'',
        title: "",
        price:0,
        phone:'',
        description: "",
      },
      dialogFormVisible: false,
      deletedialog: false,
      deleterow: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    serviceDelete() {
      this.$http.post(
        "/book/deleteBookById",
        { id: this.deleterow.bookId },
        response => {
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "图书已经被成功删除"
            });
            this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
      this.deletedialog = false;
    },
    handleEdit(index, row) {
      this.form = Object.assign({}, row);
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.deleterow = Object.assign({}, row);
      this.deletedialog = true;
    },
    addService() {
      this.$http.post(
        "/book/updateBookAdmin",
        this.form,
        response => {
          console.log(response);
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "成功更新服务"
            });
           this.dialogFormVisible = false;
            this.form = [];
            this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
    },
    dataClear() {
      this.initData();
    },
    initData() {
      this.$http.post(
        "/book/getInfoCount",
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
        "/book/getBookByPage",
        { offset: this.currentPage, pagesize: this.pagesize },
        response => {
          if (response.data.code == "200") {
            const Service = response.data.data;
            this.tableData = [];
            Service.forEach((item, index) => {
              const tableData = {};
              tableData.bookId = item.bookId;
              tableData.title = item.title;
              tableData.description = item.description;
              tableData.price = item.price;
              tableData.phone = item.phone;
              tableData.date = item.date;
              tableData.index = index;
              this.tableData.push(tableData);
            });
          }
        },
        () => {
          console.log("err");
        }
      );
    },
  }
};
</script>


<style>
.title_service {
  padding-top: 10px;
  padding-left: 20px;
  float: left;
}
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80;
  display: block;
}
</style>