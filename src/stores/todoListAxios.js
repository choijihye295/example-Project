import { ref, computed, provide } from 'vue';
import Header from '@/components/Header.vue';
import axios from 'axios';

const BASEURL = '/api/todos';
const todoList = ref([]);

const fetchTodoList = async () => {
  try {
    const response = await axios.get(BASEURL);
    todoList.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

// const addTodo = ({ todo, desc }) => {
//   states.todoList.push({ id: new Date().getTime(), todo, desc, done: false });
// };

const addTodo = async ({ todo, desc }, successCallback) => {
  try {
    const payload = { todo, desc };
    const response = await axios.post(BASEURL, payload);
    if (response.status === 201) {
      todoList.value.push({ ...response.data, done: false });
      successCallback();
    } else {
      alert('Todo 추가 실패');
    }
  } catch (error) {
    console.log('에러발생: ' + error);
  }
};

// const updateTodo = ({ id, todo, desc, done }) => {
//   let index = states.todoList.findIndex((todo) => todo.id === id);
//   states.todoList[index] = { ...states.todoList[index], todo, desc, done };
// };

const updateTodo = async ({ id, todo, desc, done }, successCallback) => {
  try {
    const payload = { id, todo, desc, done };
    const response = await axios.put(`${BASEURL}/${id}`, payload);
    if (response.status === 200) {
      let index = todoList.value.findIndex((todo) => todo.id === id);
      todoList.value[index] = payload;
      successCallback();
    } else {
      alert('Todo 수정 실패');
    }
  } catch (error) {
    console.log('에러발생: ' + error);
  }
};

// const deleteTodo = (id) => {
//   let index = states.todoList.findIndex((todo) => todo.id === id);
//   states.todoList.splice(index, 1);
// };

const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${BASEURL}/${id}`);
    if (response.status === 200) {
      let index = todoList.value.findIndex((todo) => todo.id === id);
      todoList.value.splice(index, 1);
    } else {
      alert('Todo 삭제 실패');
    }
  } catch (error) {
    console.log('에러발생: ' + error);
  }
};

// const toggleDone = (id) => {
//   let index = states.todoList.findIndex((todo) => todo.id === id);
//   states.todoList[index].done = !states.todoList[index].done;
// };

const toggleDone = async (id) => {
  try {
    let todo = todoList.value.find((todo) => todo.id === id);
    let payload = { ...todo, done: !todo.done };
    const response = await axios.put(`${BASEURL}/${id}`, payload);
    if (response.status === 200) {
      todo.done = payload.done;
    } else {
      alert('Todo 상태 변경 실패');
    }
  } catch (error) {
    console.log('에러발생: ' + error);
  }
};

provide(
  'todoList',
  computed(() => todoList),
);
provide('actions', { addTodo, deleteTodo, toggleDone, updateTodo });

fetchTodoList();
