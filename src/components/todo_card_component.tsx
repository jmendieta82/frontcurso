import { Button } from "primereact/button";
import {Divider} from "primereact/divider";

export function TodoCardComponent({todoSet,changeStateTodo}:any){

return(
    <>
    <div className='flex justify-content-between'>
        {
        todoSet.map((todo:any) => (
            <div className='w-9 mr-3 p-3 bg-white text-black-alpha-90 border-round '>
            <div className='flex flex-column'>
                <div className='flex justify-content-between'>
                <div className='flex flex-column'>
                    <span className='font-bold'>Creado en : {todo.created_at}</span>
                </div>
                </div>
                <Divider/>
                <span>{todo.todo}</span>
            </div>
            <Divider/>
            <div>
            <Button icon={todo.status?'pi pi-check':'pi pi-times'} tooltip="Terminar taera" onClick={()=>changeStateTodo(todo.id)} 
                severity={todo.status?'success':'danger'} rounded text raised aria-label="Filter" />
            </div>
            </div>
        ))
        }
    </div>
    </>
)
}