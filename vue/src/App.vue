<script>
import { mapState } from 'vuex';



export default {
  computed: {
    ...mapState(["user"])  
  }
}
</script>

<template>
<router-view>
  
</router-view>
</template>

<style scoped>

</style>
