<template>
  <div>
    <el-row class="mb20" :gutter="10">
      <el-col>
        <el-select
          class="wid100"
          v-on:change="handleParseUrlChange(selectParseUrl)"
          v-model="selectParseUrl"
          value-key="id"
          placeholder="请选择"
        >
          <el-option
            v-for="parseUrlVo in parseUrlVoList"
            :key="parseUrlVo.id"
            :label="parseUrlVo.name"
            :value="parseUrlVo"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="mb20" :gutter="10">
      <el-col>
        <div class="movieListContain">
          <el-button
            class="mb20 mr20 movieButton"
            v-for="movieVo in movieVoList"
            v-on:click="handleSee(movieVo.url)"
            >{{ movieVo.num }}</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-row class="mb20" :gutter="10">
      <iframe v-bind:src="nowSrc" width="100%" height="600px" frameborder="0">
      </iframe>
    </el-row>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "VideoMovie",
  data() {
    return {
      outerData: {},
      movieVoList: [],
      parseUrlVoList: [],
      selectParseUrl: null,
      nowSrc: null
    };
  },
  methods: {
    handleMovieList: function() {
      const that = this;
      const { url, type, movieVoList } = that.outerData;

      if (movieVoList && movieVoList.length > 0) {
        that.movieVoList = movieVoList;
      } else {
        this.axios
          .post("/daixinmini/video/movieList", { url, type })
          .then(function(result) {
            console.log(result);
            that.movieVoList = result.data;
          });
      }
    },
    handleParseUrlList: function() {
      const that = this;
      this.axios
        .get("/daixinmini/videoparse/handlevideoparseurl")
        .then(function(result) {
          that.parseUrlVoList = result.data;
          that.selectParseUrl = result.data[0];
        });
    },
    handleSee: function(url) {
      const that = this;
      let baseUrl = that.selectParseUrl.url;
      that.nowSrc = baseUrl.replace(/"/g, "") + url;
    },
    handleParseUrlChange: function(selectParseUrl) {
        that.selectParseUrl = selectParseUrl;
    }
  },
  created: function() {
    const that = this;

    const { url, type } = that.$route.params;
    if (_.isEmpty(url) || _.isEmpty(type)) {
      this.$router.push("/");
    }
    that.outerData = { ...that.outerData, ...that.$route.params };
    that.handleParseUrlList();
    that.handleMovieList();
  }
};
</script>

<style scoped>
.movieListContain {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.movieButton {
  min-width: 100px;
  margin-left: 0 !important;
}
</style>
