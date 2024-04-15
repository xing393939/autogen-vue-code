<template>
  <main class="vx-dev-wrapper relative">
    <div class="flex justify-end p-1">
      <Button @click="goTo">
        Home
      </Button>
    </div>
    <div
      class="rounded-lg border border-black/5 bg-white shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.04)] mx-1 p-1"
    >
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { Button } from "./components/ui/button";
import { useRouter } from 'vue-router'
const router = useRouter()
const goTo = () => {
  router.push("/preview");
};
</script>

<style scoped>
</style>
