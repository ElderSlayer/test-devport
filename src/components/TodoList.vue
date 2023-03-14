<template>
  <div class="todo-list">
<!--    <br>-->
<!--    {{ user }}-->
<!--    <br>-->
    <div class="todo-list__wrap">
      <el-table  ref="multipleTable" @selection-change="handleSelectionChange" :data="baseTodoList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%">
        <el-table-column type="selection" width="55" />

        <el-table-column prop="title" label="Title" width="500">
          <template slot="header" slot-scope="">
            Title:
            <div class="el-input">
              <input class="el-input__inner" type="text" v-model="search">
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="completed" label="Completed" width="150" :filters="[{ text: 'true', value: true }, { text: 'false', value: false }]" :filter-method="filterCompeted" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.completed ? 'success' : 'danger'" disable-transitions>
              {{scope.row.completed}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>


export default {
  name: 'TodoList',
  props: {
    user: Object
  },
  data() {
    return {
      baseTodoList: [],
      search: '',
      favoritesSelection: []
    }
  },
  watch: {
    favoritesSelection: {
      deep: true,
      handler(value) {
        localStorage.setItem('favorites', JSON.stringify(value));
      }
    }
  },
  methods: {
    filterCompeted(value, row) {
      return row.completed === value;
    },
    handleSelectionChange(value) {
      this.favoritesSelection = value;
    }
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => this.baseTodoList = json.filter(item => item.userId === this.user.id) )
        .then( () => {
          JSON.parse(localStorage.getItem('favorites')).forEach((item, index) => {
            this.$refs.multipleTable.toggleRowSelection(this.baseTodoList[index])
          })
        })
  }
}
</script>

<style lang="scss">
.todo-list {
  width: 100%;
  display: flex;
  justify-content: center;

  &__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-input {
      width: auto;
    }
  }
}
</style>