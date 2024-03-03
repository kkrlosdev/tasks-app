"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"


function FormTask(){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
            method: "POST",
            body: JSON.stringify({title, description}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        router.refresh();
    }

    return (
        <div className="bg-slate-200 p-7 rounded-md h-fit">
                <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold">Añadir tarea</h1>
                    <label htmlFor="title" className="text-xs text-black">Título de la tarea:</label>
                    <input type="text" name="title"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full"
                    onChange={e => setTitle(e.target.value)}
                    />


                    <label htmlFor="description" className="text-xs text-black">Descripción de la tarea:</label>
                    <textarea name="description"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full"
                    onChange={e => setDescription(e.target.value)}
                    ></textarea>


                    <button className="bg-indigo-500 w-full rounded-md p-2 block">Guardar tarea</button>
                </form>

        </div>
    )
}

export default FormTask