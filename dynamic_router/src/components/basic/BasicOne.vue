<template>
  <div>
    basicOne
    当前date:{{date}}
    <br>
    {{tag}}
  </div>
</template>

<script>
export default {
  name: "BasicOne",
  data() {
    return {
      date: "",
      tag: {}
    };
  },
  methods: {},
  created: function() {
    var D = new Date();
    this.date = D;
    console.log('刷新过');
  }
};
</script>


<style>
</style>