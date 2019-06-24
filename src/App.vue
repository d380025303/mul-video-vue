<template>
  <el-container class="dm-main-contain">
    <el-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
  }
</style>
