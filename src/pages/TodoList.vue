<template>
  <div class="row">
    <!-- 부트스트랩 Flexbox -->
    <div class="col p-3">
      <!-- 자동너비 -->
      <router-link class="btn btn-primary" to="/todos/add"
        >할일추가</router-link
      >
    </div>
  </div>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <TodoItem v-for="todoItem in todoList" :todoItem="todoItem" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import TodoItem from '@/components/TodoItem.vue';
import { inject } from 'vue';

const todoList = inject('todoList');
</script>
