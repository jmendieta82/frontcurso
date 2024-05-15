import {Button} from "primereact/button";
import {get, post} from "../shared/api_conection.tsx";
import {Divider} from "primereact/divider";
import {useEffect, useState} from "react";
import { TodoCardComponent } from "./todo_card_component.tsx";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";



export function InicioComponent() {

  const [todosActive,setTodosActive]= useState([]);
  const [todosInActive,setTodosInActive]= useState([]);
  const [todosFound,settodosFound]= useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const {handleSubmit,register,reset} = useForm()


  const onSubmit = async (data:any) => {
    const obj = {
      usuario:2,
      todo:data.todoText,
    }

    try{
      const todosResponse = await post('todos/',obj)
      console.log(todosResponse);
      getTodosActivos();
      getTodosInActivos();
      setVisible(false)
      reset()
    }catch (error){
      console.log(error)
    }
  }
  const changeStateTodo = async(todoId:number) => {
    try{
      const obj = {
        id_todo:todoId
      }
      const todosResponse = await post('change_state',obj)
      console.log(todosResponse);
      getTodosActivos();
      getTodosInActivos();
    }catch (error){
      console.log(error)
    }
  }

  const buscarTodo = (todoSearch:string) => {
    if(todoSearch){
      const todos1 = todosActive.filter((todo:any) => todo.todo.toLowerCase().includes(todoSearch.toLowerCase()))
      const todos2 = todosInActive.filter((todo:any) => todo.todo.toLowerCase().includes(todoSearch.toLowerCase()))
      settodosFound(todos1.concat(todos2))
    }else{
      settodosFound([])
    }
  }

  const getTodosActivos = async () =>{
    try{
      const todosResponse = await get('todos_active/?usuario=2')
      setTodosActive(todosResponse)
      console.log(todosResponse)
    }catch (error){
      console.log(error)
    }
  }
  const getTodosInActivos = async () =>{
    try{
      const todosResponse = await get('todos_inactive/?usuario=2')
      setTodosInActive(todosResponse)
      console.log(todosResponse)
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getTodosActivos();
    getTodosInActivos();
  }, [])

  return(
    <>
      <Dialog header="Header" visible={visible} style={{ width: '50vw' }}
       onHide={() => setVisible(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-column gap-2">
                <label htmlFor="todo">Todo</label>
                <InputText id="todo" {...register('todoText')}/>
            </div>
            <div className="mt-4">
              <Button label="Guardar" type="submit" />
            </div>
          </form>         
      </Dialog>
      <div className="flex justify-content-between">
        <Button label="Nuevo TODO" icon="pi pi-plus" onClick={() => setVisible(true)} />       
        <div className="flex flex-column gap-2 w-3">
          <label htmlFor="buscador">Buscar</label>
          <InputText id="buscador" onChange={(e) => buscarTodo(e.target.value)} />
          <small id="username-help">
            Ingrese la palabra clave para buscar.
          </small>
        </div>
      </div>
      <Divider/>
      <h1>Tareas Activas</h1>
      <TodoCardComponent todoSet={todosActive} changeStateTodo={changeStateTodo}/>
      <Divider/>
      <h1>Tareas Terminadas</h1>
      <TodoCardComponent todoSet={todosInActive} changeStateTodo={changeStateTodo}/>
      <h1>Tareas Encontradas</h1>
      <TodoCardComponent todoSet={todosFound} changeStateTodo={changeStateTodo}/>
    </>
  )
}