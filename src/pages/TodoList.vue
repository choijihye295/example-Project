<template>
  <div>
    <br />
    <div class="mb-3">
      <router-link class="btn btn-primary" to="/todos/add"
        >할일 추가</router-link
      >
    </div>
    <ul class="list-group">
      <TodoItem
        v-for="todoItem in todoList"
        :key="todoItem.id"
        :todoItem="todoItem"
      />
    </ul>
    <div class="mt-3">완료된 할일 수 : {{ doneCount }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTodoListStore } from '@/stores/todoList.js';
import TodoItem from '@/components/TodoItem.vue';

const todoListStore = useTodoListStore();

const doneCount = computed(() => todoListStore.doneCount);
const todoList = computed(() => todoListStore.todoList);
</script>
