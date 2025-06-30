import { useForm } from 'react-hook-form'
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
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useGetTask } from '../hooks/data/use-get-task'
import { useUpdateTask } from '../hooks/data/use-update-task'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId)
  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId)
  const { data: task } = useGetTask({
    taskId,
    onSuccess: reset,
  })

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success('Tarefa atualizada com sucesso!')
        navigate('/')
      },
      onError: () => {
        toast.error('Erro ao atualizar tarefa')
      },
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
        navigate('/')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa')
      },
    })
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
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
            <Button
              className="h-fit self-end"
              color="danger"
              onClick={handleDeleteClick}
            >
              <TrashIcon />
              Deletar tarefa
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="rounded-12 space-y-6 bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Nome"
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O titulo não pode ser vazio'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register('time', {
                  required: 'O horário é obrigatório',
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatória',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
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
              type="submit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
