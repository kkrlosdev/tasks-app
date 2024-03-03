import TaskCard from "./TaskCard";

async function LoadTasks(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`)
    const tasks = await res.json()
    return tasks
}

async function ListTask(){

    const tasks = await LoadTasks()

    return (
        <div className="bg-slate-700 p-4 w-full rounded-md">
            <h1 className="mb-2">Lista de tareas</h1>

            {tasks.map(task => (
                <TaskCard task={task} key={task.id}/>
            ))}
        </div>

    )
}

export default ListTask