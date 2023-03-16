import { defineStore } from "pinia";
import { Storage } from "@/utils"

export default defineStore("userStore", {
    state: () => {
        return {
            get user() {
                return Storage.get("user")
            },
            set user(val) {
                Storage.set("user", val);
            },
            get token() {
                return Storage.get("token");
            },
            set token(val) {
                Storage.set("token", val);
            }
        }
    },
    getters: {
        getUser() {
            return this.user;
        },
        getToken() {
            return this.token;
        }
    }
})