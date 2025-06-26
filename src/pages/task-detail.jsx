import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeft,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [saveIsLoading, setSaveIsLoading] = useState()
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()
  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })

      const data = await response.json()

      setTask(data)
    }

    fetchTask()
  }, [taskId])

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    const newErrors = []

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O campo título é obrigatório',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O campo horário é obrigatório',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'O campo descrição é obrigatório',
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })

    if (!response.ok) {
      toast.error('Erro ao salvar a tarefa')
      return setSaveIsLoading(false)
    }
    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
    toast.success('Tarefa salva com sucesso!')
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeft />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link
                to="/"
                className="pointer cursor-pointer text-brand-text-gray"
              >
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <div>
            <Button className="h-fit self-end" color="danger">
              <TrashIcon />
              Deletar tarefa
            </Button>
          </div>
        </div>

        {/* dados da tarefa */}
        <div className="rounded-12 space-y-6 bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Nome"
              ref={titleRef}
              defaultValue={task?.title}
              errorMessage={titleError?.message}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secundary" onClick={handleBackClick}>
            Cancelar
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
