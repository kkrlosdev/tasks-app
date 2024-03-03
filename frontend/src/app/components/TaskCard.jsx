"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

function TaskCard({task}){

    const router = useRouter()
    const [edit, setEdit] = useState(false)

    const [newTitle, setNewTitle] = useState(task.title)
    const [newDescription, setNewDescription] = useState(task.description)

    const handleDelete = async (id) => {
        if (window.confirm('Eliminar tarea?')){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`,
            {method:"DELETE"})
            if (res.status === 204){
                router.refresh()
            }
        }
    }

    const handleTaskDone = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
        {method: "POST"})
        if (res.status === 200){
            router.refresh()
        }
    }

    const handleUpdate = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
            method: "PUT",
            body: JSON.stringify({title: newTitle, description: newDescription}),
            headers: {'Content-Type': "application/json"}
        })
        const data = await res.json()
        setNewTitle(data.title)
        setNewDescription(data.description)
        setEdit(false)
    }

    return (
    <div className={
        "px-4 py-3 mb-2 rounded-md text-black flex justify-between items-center" + (task.done ? " bg-green-700" : " bg-slate-500")
    }>
        <div className="flex flex-col">

            {
                !edit ? (
                    <h2 className="font-bold">
                        {newTitle} {task.done && <span>✅</span>}
                    </h2>
                ) :
                <input type="text" value={newTitle} className=
                "p-2 bg-slate-700 rounded-md text-white outline-none my-1"
                onChange={e => setNewTitle(e.target.value)}/>
            }
            {
                !edit ? (
                    <p>{newDescription}</p>
                ) :
                <textarea name="description" value={newDescription}
                className="bg-slate-700 p-2 rounded-md text-white outline-none w-full" rows={3}
                onChange={e => setNewDescription(e.target.value)}></textarea>
            }
        </div>

        <div className="flex justify-between gap-x-2">

            {edit && (
                <button className="text-black bg-slate-300 rounded-md p-2"
                onClick={() => handleUpdate(task.id)}>Guardar cambios</button>
            )}

            <button className={
                "text-white rounded-md p-2" + (task.done ? " bg-slate-800" : " bg-green-500")
            } onClick={() => handleTaskDone(task.id)}>{task.done ? "Desmarcar" : "Marcar"}</button>
            <button className="bg-red-500 text-white rounded-md p-2" onClick={() => handleDelete(task.id)}>Eliminar</button>
            <button className="bg-indigo-500 text-white rounded-md p-2" onClick={() => setEdit(!edit)}>Editar</button>
        </div>
    </div>
    )
}

export default TaskCard