<script setup>
import { ref } from 'vue'
import { ReviewTool } from 'vue-page-review'

const active = ref(false)
const cards = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <div style="padding: 40px; font-family: system-ui, sans-serif">
    <h1>Vue Page Review Test</h1>
    <button @click="active = true">Start Review</button>

    <div style="margin-top: 40px; display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr)">
      <div
        v-for="i in cards"
        :key="i"
        class="test-card"
        style="padding: 24px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa"
      >
        <h3>Card {{ i }}</h3>
        <p>This is card number {{ i }}. Click to select it in review mode.</p>
        <button>Action {{ i }}</button>
      </div>
    </div>

    <ReviewTool v-model:active="active" page-path="/test" />
  </div>
</template>
