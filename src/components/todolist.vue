<template>
  <section class=" min-w-screen min-h-screen  bg-blue-100 bg-opacity-30 container px-8 py-8 mx-auto  ">
    <div class="container  mx-auto flex flex-col container items-stretch px-5 py-5   rounded-3">
      <h1 class="text-4xl  font-bold">My To Do List</h1>
      <div class="container flex items-center  mb-6 mt-6 ">
        <input v-model="newTodo" type="text" placeholder="Enter To Do"
          class="items-center  appearance-none border shadow-lg rounded-lg w-4/6 py-4 px-3 mr-4 text-grey-darker" />
        <button type="submit" @click="addTodo()">
          <svg xmlns="http://www.w3.org/2000/svg"
            class=" mb-6 mt-6 rounded-full shadow-xl bg-red-400 text-white p-3 w-14 h-14  inline-block"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <div
        class="font-medium  text-lg flex-wrap flex justify-between  w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-red-400 px-4 py-6 mb-6"
        v-for="(todo, index) in todos" :key="index">
        <div class=" p-2   md:w-2/6  w-full">
          <h5 :class="{ 'line-through': todo.status === 'finished' }">
            {{ todo.note }}
          </h5>
        </div>
        <div class=" col-span-2 pl-32">
          <div class="flex flex-wrap ">
            <div class="status-indicator mr-2 mt-3.5" :class="{
              'status-indicator-todo': todo.status === 'to-do',
              'status-indicator-ongoing': todo.status === 'on-going',
              'status-indicator-finished': todo.status === 'finished',
            }"></div>
            <!-- Text -->
            <div class="font-semibold text-xl" @click="changeStatus(index)" :class="{
              'status-text-todo': todo.status === 'to-do',
              'status-text-ongoing': todo.status === 'on-going',
              'status-text-finished': todo.status === 'finished',
            }">
              <div class="flex flex-wrap">
                <button>
                  <h5 class="font-semibold text-xl">{{ todo.status }}</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 ">
          <div class="flex space-x-6 space-x-reverse justify-end">
            <div class="hover:text-red-600 flex space-x-6 space-x-reverse" @click="upTodo(index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18" />
              </svg>
              <i class="uil uil-arrow-up ms-4 "></i>
            </div>
            <div class="hover:text-red-600" @click="downTodo(index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
              <i class="uil uil-arrow-down ms-4"></i>
            </div>

            <div class=" focus:outline-none  hover:text-red-600" @click="editTodo(index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <i class="uil uil-edit-alt ms-4"></i>
            </div>
            <div class="hover:text-red-600" @click="deleteTodo(index)">
              <i class="uil uil-trash-alt ms-4"></i>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useStore } from 'vuex'
const axios = require("axios");
// import { onBeforeMount } from 'vue'
// import { useStore } from 'vuex'
export default {
  note: "ToDo",
  // setup() {
  // 	const store = useStore()
  // 	onBeforeMount(() => {
  // 		store.dispatch('fetchUser')
  // 	})
  // },
  created() {
    const store = useStore();
    this.userId = store.state.user.uid;
    this.todos = []
    
    this.refreshToDos()
  },
  data() {
    return {
      newTodo: "",
      indexEditTodo: null,
      order: "",
      tempNameTodo: "",
      tempStatusTodo: "",
      todoStatus: ["to-do", "on-going", "finished"],
      todos: [],
      userId: null,
    };
  },
  methods: {
    refreshToDos() {
      axios.post(this.firebaseBase + this.apiBase + '/to-do', {
            "user_id": this.userId,
          })
          .then(resp => {
            this.todos = resp.data.to_do_list;
          });
    },
    addTodo() {
      if (this.newTodo.length === 0) return;
      if (this.indexEditTodo === null) {
        axios.post(this.firebaseBase + this.apiBase + '/to-do/new', {
          "note": this.newTodo,
          "status": "to-do",
          "order": this.todos.length + 1,
          "user_id": this.userId,
        })
          .then(resp => {
            this.todos.push({
              "id": resp.data.id,
              "note": this.newTodo,
              "status": "to-do",
              "order": this.todos.length + 1,
            });
            this.newTodo = "";
          })
          .catch(resp => {
            console.log(resp)
            this.refreshToDos()
          });
      } else {
        axios.put(this.firebaseBase + this.apiBase + '/to-do', {
          "id": this.todos[this.indexEditTodo].id,
          "note": this.newTodo,
        })
          .then(resp => {
            this.todos[this.indexEditTodo].note = this.newTodo;
            this.indexEditTodo = null;
            this.newTodo = "";
          })
          .catch(resp => {
            console.log(resp)
            this.refreshToDos()
          });
      }
    },
    editTodo(index) {
      this.newTodo = this.todos[index].note;
      this.indexEditTodo = index;
    },
    deleteTodo(index) {
      console.log(index, this.todos[index].id)
      axios.delete(this.firebaseBase + this.apiBase + '/to-do', {
        data: {
          "id": this.todos[index].id
        }
      })
        .then(resp => {
          console.log(resp)
          this.todos.splice(index, 1);
        })
        .catch(resp => {
          console.log(resp)
          this.refreshToDos()
        });
    },
    changeStatus(index) {
      let statusIndex = this.todoStatus.indexOf(this.todos[index].status);
      if (++statusIndex > 2) statusIndex = 0;
      axios.put(this.firebaseBase + this.apiBase + '/to-do', {
        "id": this.todos[index].id,
        "status": this.todoStatus[statusIndex],
      })
        .then(resp => {
          console.log(resp)
          this.todos[index].status = this.todoStatus[statusIndex];
        })
        .catch(resp => {
          console.log(resp)
          this.refreshToDos()
        });
    },
    upTodo(index) {
      if (index === 0) return;
      axios.post(this.firebaseBase + this.apiBase + '/to-do/up', {
        "id": this.todos[index].id
      })
        .then(resp => {
          this.tempNameTodo = this.todos[index].note;
          this.tempStatusTodo = this.todos[index].status;
          this.tempIdTodo = this.todos[index].id;
          this.todos[index].note = this.todos[index - 1].note;
          this.todos[index].status = this.todos[index - 1].status;
          this.todos[index].id = this.todos[index - 1].id;
          this.todos[index - 1].note = this.tempNameTodo;
          this.todos[index - 1].status = this.tempStatusTodo;
          this.todos[index - 1].id = this.tempIdTodo;
        })
        .catch(resp => {
          console.log(resp)
          this.refreshToDos()
        });
    },
    downTodo(index) {
      axios.post(this.firebaseBase + this.apiBase + '/to-do/down', {
        "id": this.todos[index].id
      })
        .then(resp => {
          this.tempNameTodo = this.todos[index].note;
          this.tempStatusTodo = this.todos[index].status;
          this.todos[index].note = this.todos[index + 1].note;
          this.todos[index].status = this.todos[index + 1].status;
          this.todos[index + 1].note = this.tempNameTodo;
          this.todos[index + 1].status = this.tempStatusTodo;
        })
        .catch(resp => {
          console.log(resp)
          this.refreshToDos()
        });
      if (index === this.todos.length - 1) return;
    },
  },
};
</script>

<style scoped>
.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-indicator-todo {
  background: red;
}

.status-indicator-ongoing {
  background: orange;
}

.status-indicator-finished {
  background: green;
}

.status-text-todo {
  color: red;
}

.status-text-ongoing {
  color: orange;
}

.status-text-finished {
  color: green;
}
</style>
