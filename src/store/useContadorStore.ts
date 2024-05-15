import {create} from "zustand";


type ContadorStore = {
  contador :number
  setContador: (newContador:number) => void

}

export const useContadorStore = create<ContadorStore>((set)=> (
  {
    contador:0,
    setContador: (newContador:number) => set({contador:newContador}),
  }
))