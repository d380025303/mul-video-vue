<template>
    <div>
        <el-row class="mb20" :gutter="10">
            <el-col >
                <el-input placeholder="请输入内容" v-on:keyup.native="handleSearch" v-model="data.searchContent" class="input-with-select">
                    <el-select v-model.lazy:value="data.type" change="typeChange" no-data-text="请选择" slot="prepend" placeholder="请选择">
                        <el-option disabled label="腾讯" value="qq"></el-option>
                        <el-option label="爱奇艺" value="iqiyi"></el-option>
                        <el-option label="优酷" value="youku"></el-option>
                    </el-select>
                    <el-button slot="append" autofocus v-on:click="handleSearch" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col class="mb20" v-for="searchVo in searchVoList" :key="searchVo.url">
                <el-card>
                    <div v-on:click="handleMovie(searchVo.url, searchVo.movieVoList)" class="dm-search-card-contain">
                        <div >
                            {{searchVo.name}}
                        </div>
                        <div>
                            <el-link type="primary" >立即观看</el-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import _ from 'lodash';
    export default {
        name: "VideoSearch",
        data() {
            return {
                data: {
                    type: 'iqiyi',
                    searchContent: '',
                },
                searchVoList: []
            }
        },
        methods: {
            handleSearch: function () {
                const that = this;
                const { type , searchContent } = that.data;
                if (!_.isEmpty(searchContent)) {
                    this.axios.post('/daixinmini/video/searchList', { type, content: searchContent }).then(function (result) {
                        that.searchVoList = result.data.searchVoList;
                    });
                }
            },
            handleMovie: function (url, movieVoList) {
                const that = this;
                that.$router.push({
                    name: 'VideoMovie',
                    params: {
                        url,
                        type: that.data.type,
                        movieVoList
                    }
                });
            }
        },
        beforeCreate: function () {
            // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
            console.log('vue beforeCreate');
        },
        created: function () {
            // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
            console.log('vue created');
        },
        beforeMount: function () {
            // 在挂载开始之前被调用：相关的 render 函数首次被调用。
            console.log('vue beforeMount');
        },
        mounted: function () {
            console.log('vue mounted');
        }
    }
</script>

<style >
    .el-select {
        min-width: 100px;
    }
    .dm-search-card-contain {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>