import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useTodoListStore = defineStore('todoList', () => {
  // 1. 반응형 상태 (State)
  const BASEURI = '/api/todos';
  const todoList = ref([]);

  // 2. 데이터 조회 (Read)
  const fetchTodoList = async () => {
    try {
      const response = await axios.get(BASEURI);
      if (response.status === 200) {
        todoList.value = response.data; // ref이므로 .value 사용
      } else {
        alert('데이터 조회 실패');
      }
    } catch (error) {
      alert('에러 발생: ' + error);
    }
  };

  // 3. 추가 (Create)
  const addTodo = async ({ todo, desc }, successCallback) => {
    try {
      const payload = { todo, desc };
      const response = await axios.post(BASEURI, payload);
      if (response.status === 201) {
        // ref 배열에 직접 push
        todoList.value.push({ ...response.data, done: false });
        successCallback();
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      alert('에러 발생: ' + error);
    }
  };

  // 4. 수정 (Update)
  const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
    try {
      const payload = { id, todo, desc, done };
      const response = await axios.put(`${BASEURI}/${id}`, payload);
      if (response.status === 200) {
        const index = todoList.value.findIndex((t) => t.id === id);
        if (index !== -1) {
          todoList.value[index] = payload;
          successCallback();
        }
      } else {
        alert('Todo 변경 실패');
      }
    } catch (error) {
      alert('에러 발생: ' + error);
    }
  };

  // 5. 삭제 (Delete)
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${BASEURI}/${id}`);
      if (response.status === 200) {
        const index = todoList.value.findIndex((t) => t.id === id);
        if (index !== -1) {
          todoList.value.splice(index, 1);
        }
      } else {
        alert('Todo 삭제 실패');
      }
    } catch (error) {
      alert('에러 발생: ' + error);
    }
  };

  // 6. 완료 상태 토글 (Update done)
  const toggleDone = async (id) => {
    try {
      const todo = todoList.value.find((t) => t.id === id);
      if (todo) {
        const payload = { ...todo, done: !todo.done };
        const response = await axios.put(`${BASEURI}/${id}`, payload);
        if (response.status === 200) {
          todo.done = payload.done;
        } else {
          alert('Todo 완료 변경 실패');
        }
      }
    } catch (error) {
      alert('에러 발생: ' + error);
    }
  };

  // 7. 계산된 속성 (Getters)
  const doneCount = computed(() => {
    return todoList.value.filter((todoItem) => todoItem.done).length;
  });

  // 외부에서 사용할 수 있게 모두 반환
  return {
    todoList,
    fetchTodoList,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleDone,
    doneCount,
  };
});
