<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-bold">Login</h2>
    <form>
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <Input id="email" type="email" placeholder="Enter your email address" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <div class="flex items-center">
          <Checkbox id="remember" />
          <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
        <Button type="submit">Sign in</Button>
      </div>
    </form>
  </div>
</template>