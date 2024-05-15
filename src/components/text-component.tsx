import {useContadorStore} from "../store/useContadorStore.ts";

export function TextComponent(){

  const {contador}=useContadorStore()

  return (
    <div>
      <p>{contador}</p>
    </div>
  )
}