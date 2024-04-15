<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { User } from "lucide-vue-next";

const handleSubmit = () => {
  // Handle form submission
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div class="text-center mb-6">
        <AspectRatio :ratio="1">
          <User class="w-12 h-12 text-gray-500" />
        </AspectRatio>
        <h2 class="text-xl font-bold">Login</h2>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <div class="flex items-center justify-between mb-4">
          <Checkbox id="remember" />
          <label for="remember" class="text-sm text-gray-700">Remember me</label>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  </div>
</template>