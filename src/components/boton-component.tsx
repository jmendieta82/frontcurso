import {useContadorStore} from "../store/useContadorStore.ts";
import {Button} from "primereact/button";


export function BotonComponent(label: string) {
  const {contador,setContador} = useContadorStore()

  function click(){
    setContador(contador+1)
  }
  return (
    <>
      <Button onClick={click} label={label}></Button>
    </>
  )
}