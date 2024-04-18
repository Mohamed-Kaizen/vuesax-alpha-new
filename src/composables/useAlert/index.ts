import { Ref } from "vue";

export function useAlert(message: Ref<string>) {
  
    function open(){
        alert(message.value)
    }

    return {
        open
    }
}