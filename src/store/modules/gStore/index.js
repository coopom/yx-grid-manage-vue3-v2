import { defineStore } from "pinia";

export default defineStore("gStore", {
    state: () => {
        return {
            menuCollapse: false
        }
    },
    actions: {
        setMenuCollapse(collapse) {
            this.menuCollapse = collapse;
        }
    }
})