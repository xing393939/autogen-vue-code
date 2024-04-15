<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
const handleSubmit = () => {
  // Handle form submission
};
</script>
<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <Input id="username" type="text" placeholder="Enter your username" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <Input id="password" type="password" placeholder="Enter your password" />
      </div>
      <div class="flex items-center justify-between mb-4">
        <Checkbox id="rememberMe" />
        <label for="rememberMe" class="ml-2 text-sm text-gray-600">Remember me</label>
      </div>
      <Button type="submit">Login</Button>
    </form>
  </div>
</template>

