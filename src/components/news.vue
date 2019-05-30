<template>
  <div>
    <div class="title_service">
      <span>
        <el-button type="primary" @click="handleAdd">添加资讯</el-button>
      </span>
    </div>

    <!-- 表单信息模块 -->
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="类型">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.date }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="发布时间" prop="date"></el-table-column>
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

    <!-- 资讯更新 -->
    <div>
      <el-dialog title="资讯信息更新" :visible.sync="editdialog" width="60%">
        <el-form :model="editrow" enctype="multipart/form-data">
          <el-form-item label="服务名称" :label-width="'120px'">
            <el-input v-model="editrow.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息类型" :label-width="'120px'">
            <el-select v-model="editrow.type" placeholder="请选择信息类型">
              <el-option label="最新政策" value="最新政策"></el-option>
              <el-option label="考研资讯" value="考研资讯"></el-option>
              <el-option label="考研动态" value="考研动态"></el-option>
              <el-option label="考研人物" value="考研人物"></el-option>
              <el-option label="考研心得" value="考研心得"></el-option>
              <el-option label="考研科目" value="考研科目"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资讯类容" :label-width="'120px'">
            <el-input
              v-model="editrow.content"
              type="textarea"
              placeholder="至少需要200字，否则影响APP显示"
              :rows="7"
            ></el-input>
          </el-form-item>
          <el-form-item label="资讯图片" label-width="120px">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/info/updateInfoUrl"
              :show-file-list="false"
              :on-success="handleEditAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击更新</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editdialog = false">取 消</el-button>
          <el-button type="primary" @click="editinfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 资讯添加对话框 -->
    <div>
      <el-dialog title="增加资讯信息" :visible.sync="adddialog" width="60%">
        <el-form :model="addform" enctype="multipart/form-data">
          <el-form-item label="服务名称" :label-width="'120px'">
            <el-input v-model="addform.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信息类型" :label-width="'120px'">
            <el-select v-model="addform.type" placeholder="请选择信息类型">
              <el-option label="最新政策" value="最新政策"></el-option>
              <el-option label="考研资讯" value="考研资讯"></el-option>
              <el-option label="考研动态" value="考研动态"></el-option>
              <el-option label="考研人物" value="考研人物"></el-option>
              <el-option label="考研心得" value="考研心得"></el-option>
              <el-option label="考研科目" value="考研科目"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资讯类容" :label-width="'120px'">
            <el-input v-model="addform.content" type="textarea" placeholder="不少于200字" :rows="7"></el-input>
          </el-form-item>
          <el-form-item label="资讯图片" label-width="120px">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/info/updateInfoUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="addService">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 删除资讯对话框 -->
    <div>
      <el-dialog title="提示（谨慎操作）" :visible.sync="deletedialog" width="30%" center>
        <span>您确认要删除这个资讯吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deletedialog = false">取 消</el-button>
          <el-button type="danger" @click="newsDelete">确 定</el-button>
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
      count: 0,
      pagesize: 6,
      currentPage: 1,

      editdialog: false,
      deletedialog: false,
      adddialog: false,

      editrow: {
        title: "",
        type: "",
        content: "",
        avatar: "",
        newId: ""
      },
      addform: {
        title: "",
        type: "",
        content: "",
        avatar: ""
      },
      deleterow: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$http.post(
        "/info/getInfoCount",
        null,
        response => {
          if (response.data.code == "200") {
            this.count = response.data.data;
            this.currentPage = 1;
            this.getOrderByPage();
          }
        },
        () => {
          console.log("err");
        }
      );
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderByPage();
    },

    //编辑预处理
    handleEdit(index, row) {
      this.editrow = Object.assign({}, row);
      console.log(this.editrow);
      this.editdialog = true;
    },

    //删除预处理
    handleDelete(index, row) {
      this.deleterow = Object.assign({}, row);
      this.deletedialog = true;
    },

    //添加预处理
    handleAdd() {
      this.adddialog = true;
    },

    //图片上传成功后的处理------添加
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.code == "200") {
        this.addform.avatar = res.data;
        this.$message({
          showClose: true,
          type: "success",
          message: "图片上传成功"
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "图片上传失败"
        });
      }
    },

    //图片上传成功后的处理----编辑
    handleEditAvatarSuccess(res, file) {
      if (res.code == "200") {
        this.editrow.avatar = res.data;
        this.$message({
          showClose: true,
          type: "success",
          message: "图片上传成功"
        });
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "图片上传失败"
        });
      }
    },

    //图片上传前的预处理
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },

    // 分页加载资讯信息
    getOrderByPage() {
      this.$http.post(
        "/info/getInfoByPage",
        { offset: this.currentPage, pagesize: this.pagesize },
        response => {
          if (response.data.code == "200") {
            const Order = response.data.data;
            this.tableData = [];
            Order.forEach((item, index) => {
              const tableData = {};
              tableData.newId = item.newId;
              tableData.title = item.title;
              tableData.content = item.content;
              tableData.date = item.date;
              tableData.type = item.type;
              tableData.avatar = item.avatar;
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

    // 更新资讯信息
    editinfo() {
      this.$http.post(
        "/info/updateInfo",
        this.editrow,
        response => {
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "资讯更新成功"
            });
            this.editdialog = false;
            this.editrow = [];
            this.initData();
          }
        },
        () => {
          console.log("err");
        }
      );
    },

    // 添加资讯信息
    addService() {
      if (
        this.addform.avatar != "" &&
        this.addform.title != "" &&
        this.addform.type != "" &&
        this.addform.content != ""
      ) {
        this.$http.post(
          "/info/publish",
          this.addform,
          response => {
            console.log(response);
            if (response.data.code == "200") {
              this.$message({
                showClose: true,
                type: "success",
                message: "资讯发布成功"
              });
            }
            this.adddialog = false;
            this.addform = [];
            this.initData();
          },
          () => {
            console.log("err");
          }
        );
      } else {
        this.$message({
          showClose: true,
          type: "error",
          message: "缺少图片或者信息，请上传"
        });
      }
    },

    //资讯删除
    newsDelete() {
      this.$http.post(
        "/info/deleteInfoById",
        { id: this.deleterow.newId },
        response => {
          if (response.data.code == "200") {
            this.$message({
              showClose: true,
              type: "success",
              message: "资讯已经被成功删除"
            });
          }
        },
        () => {
          console.log("err");
        }
      );
      this.deletedialog = false;
      this.initData();
    }
  }
};
</script>


<style>
.title_service {
  padding-top: 10px;
  padding-left: 20px;
  float: right;
}
.title_search {
  padding-top: 10px;
  padding-right: 20dp;
  float: right;
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
</style>