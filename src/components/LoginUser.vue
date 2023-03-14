<template>
  <div class="login">
    <div class="login__wrap">
      <div class="login__form">
        <el-input @blur="isUsernameTouched = true" :class="{ 'is-error': isUsernameError }" placeholder="User Name" v-model="username" type="text" />
        <el-input placeholder="Phone" v-model="userPhone" />
        <el-button type="success" @click="login">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const usernameCheckRegex = /^[a-zA-Z\s]+$/;

export default {
  name: 'LoginUser',
  data() {
    return {
      baseUsers: [],
      username: '',
      userPhone: '',
      isUsernameTouched: false,
      isSuccessLogin: false
    }
  },
  computed: {
    isUsernameValid() {
      return usernameCheckRegex.test(this.username)
    },
    isUsernameError() {
      return !this.isUsernameValid && this.isUsernameTouched;
    },
  },
  methods: {
    login() {
      if (!this.baseUsers.length) {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => this.baseUsers = json)
            .then( () => {
              this.matchCheck();
            })
      } else {
        this.matchCheck();
      }
    },
    matchCheck () {
      if (!this.isUsernameError) {
        const user = this.baseUsers.filter(user => user.name === this.username)[0];

        if (user?.phone === this.userPhone) {
          this.isSuccessLogin = true;

          this.$message({
            message: 'Login Success',
            type: 'success'
          });
        } else {
          this.isSuccessLogin = false;
          console.log('test')
          this.$message.error('Login Error');
        }

        this.$emit('login', {
          isSuccessLogin: this.isSuccessLogin,
          user: user
        })
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
.login {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrap {
    width: 1200px;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__form {
    width: 400px;
    display: flex;
    gap: 35px;
    flex-direction: column;

    .el-input.is-error {
      .el-input__inner {
        color: #f56c6c;
        border-color: #f56c6c;
      }
    }
  }
}
</style>