<template>
  <div class="min-w-screen min-h-screen flex items-center justify-center pb-40   px-8  ">
    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
      <div class="p-4 border-b">
        <h2 class="text-2xl ">
          Profile Information
        </h2>
        <div class="flex justify-between">
          <p class="text-sm text-gray-500">
            Update your account's profile information and email address.
          </p>
          <button type="button" @click="editProfileButtonClickedHandler" v-if="!isEditing"
            class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Edit</button>
          <button type="button" @click="saveProfileButtonClickedHandler" v-if="isEditing"
            class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Save</button>
        </div>
      </div>
      <div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            First Name
          </p>
          <p>
            <a v-if="!isEditing">{{ userFirstName }}</a>
            <input v-if="isEditing" v-model="userFirstName" style="border: 2px solid black" />
            <br>
            <a v-if="firstnameInvalid" class="text-red-500">Please input a valid firstname</a>
          </p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Last Name
          </p>
          <p>
            <a v-if="!isEditing">{{ userLastName }}</a>
            <input v-if="isEditing" v-model="userLastName" style="border: 2px solid black" />
            <br>
            <a v-if="lastnameInvalid" class="text-red-500">Please input a valid lastname</a>
          </p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Email Address
          </p>
          <p>
            <a>{{ email }}</a>
          </p>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Token
          </p>
          <div>
            <span>{{ myToken }}</span>
            <input type="hidden" id="my-token" :value="myToken">
            <button type="button" @click.stop.prevent="copyMyTokens" v-show="myToken && myToken!='Linked'"
              class="ml-1 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-1 mb-1  ">
              Copy</button>
            <button type="button" @click="createNewToken"
              class="ml-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 mr-1 mb-1 ">
              {{ (myToken!='Linked') ? 'Create token' : 'Unlink' }} </button>
            <p v-show="myToken && myToken!='Linked'">Token is valid for 5 minutes.</p>
          </div>
        </div>
        <div class="p-4 border-b">
          <h2 class="text-2xl ">
            Update Password
          </h2>
          <div class="flex justify-between">
            <p class="text-sm text-gray-500">
              Ensure your account is using a long, random password to stay secure.
            </p>
            <button type="button" @click="editPasswordClickedHandler" v-if="!isEditingPassword"
              class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Edit</button>
            <button type="button" @click="savePasswordClickedHandler" v-if="isEditingPassword"
              class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Save</button>
            <button type="button" @click="cancelPasswordClickedHandler" v-if="isEditingPassword"
              class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
              Cancel</button>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p class="text-gray-600">
            Password
          </p>
          <div v-if="!isEditingPassword" class="flex">
            <a>********</a>
          </div>
          <div v-if="isEditingPassword" class="flex">
            <input v-model="password" placeholder="Enter a Current Password" type="password"
              style="border: 2px solid black" />
            <a v-if="passwordInvalid" class="text-red-500">Please input a valid password</a>
          </div>
          <p class="text-gray-600">

          </p>
          <div v-if="isEditingPassword" class="flex">
            <input v-model="newPassword" placeholder="Enter a New Password" type="password"
              style="border: 2px solid black" />
            <a v-if="newPasswordInvalid" class="text-red-500">Please input a valid password</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, updatePassword } from "firebase/auth";
const axios = require("axios");

export default {
  created() {
    this.user = this.$store.state.user;
    if (this.user) {
      this.userFullName = this.user.displayName.split(' ');
      this.userFirstName = this.userFullName[0];
      this.userLastName = this.userFullName[1];
      this.email = this.user.email;
      this.updateLinker()
    }
    else {
      this.userFullName = "";
      this.userFirstName = "";
      this.userLastName = "";
      this.email = "";
    }
    this.isEditing = false;
    this.firstnameInvalid = false;
    this.lastnameInvalid = false;
    this.passwordInvalid = false;
    this.newPasswordInvalid = false;
    this.isEditingPassword = false;
    this.password = "";
    this.newPassword = "";
  },
  data() {
    return {
      user: this.user,
      userFullName: this.userFullName,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      email: this.email,
      isEditing: this.isEditing,
      firstnameInvalid: this.firstnameInvalid,
      lastnameInvalid: this.lastnameInvalid,
      passwordInvalid: this.passwordInvalid,
      newPasswordInvalid: this.newPasswordInvalid,
      isEditingPassword: this.isEditingPassword,
      password: this.password,
      newPassword: this.newPassword,
      myToken: "",
      linker: null
    }
  },
  watch: {
    '$store.state.user': function () {
      this.user = this.$store.state.user;
      this.userFullName = this.user.displayName.split(' ');
      this.userFirstName = this.userFullName[0];
      this.userLastName = this.userFullName[1];
      this.email = this.user.email;
      this.updateLinker();
    },
    userFirstName(value) {
      this.userFirstName = value.replace(/ +/g, '');
    },
    userLastName(value) {
      this.userLastName = value.replace(/ +/g, '');
    }
  },
  methods: {
    updateLinker: function() {
      axios.post(this.firebaseBase + this.apiBase + '/line-user-linker', {
        "user_id": this.user.uid,
      })
      .then(resp => {
        if (resp.data.msg === "success" && resp.data.line_user_id !== "") {
          this.linker = {
            firebase_user_id: resp.data.firebase_user_id,
            line_user_id: resp.data.line_user_id
          };
          this.myToken = "Linked"
        }
      });
    },
    copyMyTokens: function() {
      let token = document.querySelector('#my-token');
      token.setAttribute('type', 'text');
      token.select();
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        alert('Copy token ' + msg );
      } catch (err) {
        alert('Oops, unable to copy');
      }
      token.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    },
    createNewToken: function() {
      axios.post(this.firebaseBase + this.apiBase + '/line-user-linker/new', {
          "user_id": this.user.uid,
          "force": (this.myToken == 'Linked')
        })
          .then(resp => {
            this.myToken = "LINK" + resp.data.id
          })
          .catch(resp => {
            console.log(resp)
          });
    },
    editPasswordClickedHandler: function (e) {
      this.isEditingPassword = true;
    },
    savePasswordClickedHandler: function (e) {
      const password = this.password;
      if (password === "") {
        this.passwordInvalid = true;
      }
      else {
        this.passwordInvalid = false;
      }
      const newPassword = this.newPassword;
      if (newPassword === "") {
        this.newPasswordInvalid = true;
      }
      else {
        this.newPasswordInvalid = false;
      }
      if (this.passwordInvalid || this.newPasswordInvalid) {
        return;
      }
      this.updatePassword(password, newPassword);
      this.password = "";
      this.newPassword = "";
      this.isEditingPassword = false;
    },
    cancelPasswordClickedHandler: function (e) {
      this.isEditingPassword = false;
    },
    editProfileButtonClickedHandler: function (e) {
      this.isEditing = !this.isEditing;
    },
    saveProfileButtonClickedHandler: function (e) {
      this.firstnameInvalid = false;
      this.lastnameInvalid = false;
      if (this.userFirstName === "") {
        this.firstnameInvalid = true;
      }
      if (this.userLastName === "") {
        this.lastnameInvalid = true;
      }
      if (this.lastnameInvalid || this.firstnameInvalid) {
        return;
      }
      this.userNameChangedHandler()
      this.isEditing = !this.isEditing;
    },
    userNameChangedHandler: function (e) {
      this.userFullName = `${this.userFirstName} ${this.userLastName}`;
      this.user.displayName = this.userFullName;
      // this.user.email = this.email
      this.$store.dispatch('updateProfile', {
        displayName: this.user.displayName,
        // email: this.user.email
      });
      console.log('dispatched')
    },

    updatePassword: function (password, newPassword) {
      this.$store.dispatch(
        'login',
        {
          email: this.email,
          password: password,
          stay: true,
        }
      ).then((e) => {
        if (e.code == "auth/wrong-password") {
          this.passwordInvalid = true;
        }
      });

      const auth = getAuth();
      const user = auth.currentUser;

      updatePassword(user, newPassword).then(() => {
        // Update successful.
        // TODO: popup > update password completed
      }).catch((error) => {
        console.log(error)
      });
    }
  }

};
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Mitr";

h1,
h2,
h3,
p {
  font-family: "Mitr", sans-serif;
}
</style>