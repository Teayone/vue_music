<template>
  <div id="comment">
    <div class="comment-publish">
      <div class="top">
        <textarea v-model.trim="commentInfo"></textarea>
      </div>
      <div class="publish">
        <button @click="publishComment">评论</button>
      </div>
    </div>
    <LoadingMove v-if="showLoading" />
    <!-- 其他用户的评论 -->
    <div class="outhor-comment" v-if="newComment.length !== 0">
      <!-- 精彩评论(有的歌单没有) -->
      <div class="comment" v-if="hotComment.length !== 0">
        <h5>精彩评论</h5>
        <div class="user-info" v-for="item in hotComment" :key="item.time">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="right">
            <!-- 用户名和评论内容 -->
            <p class="uname-ucomment">
              <strong class="name">{{ item.user.nickname }}：</strong
              ><span class="ucomment">{{ item.content }}</span>
            </p>
            <!-- 评论日期和点赞按钮+赞数 -->
            <div class="publish-time">
              <span class="ptime">{{ item.timeStr }}</span>
              <div class="zan">
                <i class="iconfont icon-dianzan"></i>
                <em class="zan-num">({{ item.likedCount }})</em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment" id="newcomment">
        <h5>最新评论({{ total }})</h5>
        <div class="user-info" v-for="item in newComment" :key="item.time">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="right">
            <!-- 用户名和评论内容 -->
            <p class="uname-ucomment">
              <strong class="name">{{ item.user.nickname }}：</strong
              ><span class="ucomment">{{ item.content }}</span>
            </p>
            <!-- 评论日期和点赞按钮+赞数 -->
            <div class="publish-time">
              <span class="ptime">{{ item.timeStr }}</span>
              <div class="zan">
                <i class="iconfont icon-dianzan"></i>
                <em class="zan-num">({{ item.likedCount }})</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 翻页 -->
      <div class="fanye">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="20"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 如果没有评论 -->
    <div class="no-comment" v-if="showComment">暂无评论</div>
  </div>
</template>

<script>
import { getPlayListComment, sendComment } from "../../../network/api";
import LoadingMove from "../../../components/common/LoadingMove/LoadingMove.vue";
export default {
  name: "Comment",
  components: { LoadingMove },
  data() {
    return {
      hotComment: [],
      newComment: [],
      total: 0,
      showLoading: false, // 是否显示加载中动画
      showComment: false, // 有评论就显示评论，没有就显示暂无评论
      Blist: null, // 评论DOM元素
      commentInfo: "",
    };
  },
  created() {
    this.getCommentData(this.$route.query.id);
  },
  mounted() {
    setTimeout(() => {
      this.Blist = document.querySelector(".b-list");
    }, 100);
  },
  methods: {
    async getCommentData(id, offset, before) {
      this.showLoading = true;
      let { data: res } = await getPlayListComment(id, offset, before);
      this.showLoading = false;
      if (res.comments.length === 0) {
        this.showComment = true;
        return;
      }
      this.hotComment = res.hotComments || [];
      this.newComment = res.comments || [];
      this.total = res.total;
    },
    // 翻页
    currentChange(newPage) {
      let id = this.$route.query.id;
      if (this.total >= 5000) {
        let l = this.newComment[this.newComment.length - 1].time;
        this.getCommentData(id, newPage, l);
      } else {
        this.getCommentData(id, newPage);
      }
      this.Blist.scrollIntoView();
    },
    // 发布评论
    publishComment() {
      if (this.commentInfo === "") {
        return;
      }
      sendComment({
        t: 1,
        type: 2,
        id: this.$route.query.id,
        content: this.commentInfo,
      }).then(
        (v) => {
          this.commentInfo = "";
          this.getCommentData(this.$route.query.id);
        },
        (err) => {
          // 只要接收到错误就显示登录框
          this.$root.$children[0].$children[0].ShowloginBox();
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
#comment {
  padding: 40px 40px 60px 40px;
  overflow: hidden;
  .comment-publish {
    .top {
      width: 100%;
      height: 100px;
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        outline: none;
        border: 1px solid #ccc;
        font-size: 18px;
        border-radius: 5px;
      }
    }
    .publish {
      margin-top: 10px;
      float: right;
      button {
        border-radius: 15px;
        border: 1px solid #ccc;
        padding: 6px 15px;
        background: #fff;
        cursor: pointer;
        &:hover {
          background: #f2f2f2;
        }
      }
    }
  }
  .outhor-comment {
    margin-top: 50px;
    .comment {
      margin-top: 60px;
      h5 {
        font-weight: 900;
        font-size: 18px;
        font-family: 宋体;
      }
      .user-info {
        display: flex;
        margin-top: 20px;
        padding-bottom: 15px;
        &:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }
        .avatar {
          width: 50px;
          height: 50px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .right {
          flex: 1;
          margin-left: 15px;
          font-size: 14px;
          .uname-ucomment {
            line-height: 22px;
            .name {
              color: #767dc0;
              cursor: pointer;
            }
            .ucomment {
              color: #333;
            }
          }
          .publish-time {
            height: 30px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .ptime {
              color: #999;
              font-size: 12px;
            }
            .zan {
              i {
                font-size: 18px;
                cursor: pointer;
              }
              .zan-num {
                font-size: 12px;
                vertical-align: 2px;
              }
            }
          }
        }
      }
    }
    .fanye {
      text-align: center;
      margin-top: 30px;
      ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #ff7a9e;
      }
    }
  }
  .no-comment {
    text-align: center;
    font-size: 18px;
    margin-top: 40px;
    color: #333;
    font-weight: 700;
  }
}
</style>