import { createContext, useEffect, useState } from 'react'
import {
  ITaskContext,
  ITaskFormProps,
  ITaskProps,
  ITaskProvider,
} from './types'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { MessageToast } from '../../components/toast/MessageToast'

export const TaskContext = createContext({} as ITaskContext)

export const TaskProvider = ({ children }: ITaskProvider) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [globalLoading, setGlobalLoading] = useState(false)
  const [task, setTask] = useState<ITaskProps | null>(null)
  const [tasks, setTasks] = useState([] as ITaskProps[])
  const [filterTask, setFilterTask] = useState([] as ITaskProps[])
  const [nonFavoriteFilterTask, setNonFavoriteFilterTask] = useState(
    [] as ITaskProps[],
  )
  const [favoriteFilterTask, setFavoriteFilterTask] = useState(
    [] as ITaskProps[],
  )
  const [showInputSearch, setShowInputSearch] = useState(false)
  useEffect(() => {
    ;(async () => {
      try {
        setGlobalLoading(true)
        const request = await api.get('tasks')
        const allTasks: ITaskProps[] = request.data.body
        setFavoriteFilterTask(allTasks.filter((task) => task.is_favorite))
        setNonFavoriteFilterTask(allTasks.filter((task) => !task.is_favorite))
        setTasks(allTasks)
      } catch {
        setTask(null)
      } finally {
        setTimeout(() => {
          setGlobalLoading(false)
        }, 500)
      }
    })()
  }, [task])

  const taskRegister = async (data: ITaskFormProps): Promise<void> => {
    try {
      setGlobalLoading(true)

      const request = await toast.promise(api.post('tasks', data), {
        pending: { render: () => <MessageToast message="Carregando..." /> },
        success: {
          render: () => (
            <MessageToast message="Cor do card alterado com sucesso!" />
          ),
        },
        error: {
          render: () => (
            <MessageToast message="Não foi possivel alterar a cor do card!" />
          ),
        },
      })
      setTasks([...tasks, request.data.body])
      setTask(request.data.body)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setGlobalLoading(false)
      }, 2000)
    }
  }

  const taskUpdate = async (
    data: ITaskFormProps,
    id: string,
  ): Promise<void> => {
    try {
      setGlobalLoading(true)
      const request = await toast.promise(api.patch(`tasks/${id}`, data), {
        pending: { render: () => <MessageToast message="Carregando..." /> },
        success: {
          render: () => (
            <MessageToast message="Conteúdo alterado com sucesso!" />
          ),
        },
        error: {
          render: () => (
            <MessageToast message="Não foi possivel alterar o conteúdo do card!" />
          ),
        },
      })
      setTasks([...tasks, request.data.body])
      setFilterTask([])
      setTask(request.data.body)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setGlobalLoading(false)
      }, 2000)
    }
  }

  const taskDelete = async (id: string): Promise<void> => {
    try {
      setGlobalLoading(true)
      const request = await toast.promise(api.delete(`tasks/${id}`), {
        pending: { render: () => <MessageToast message="Carregando..." /> },
        success: {
          render: () => <MessageToast message="Task removida com sucesso!" />,
        },
        error: {
          render: () => (
            <MessageToast message="Não foi possivel remover a task" />
          ),
        },
      })
      setFavoriteFilterTask((prevTasks) =>
        prevTasks.filter((task) => task.task_id !== id),
      )
      setNonFavoriteFilterTask((prevTasks) =>
        prevTasks.filter((task) => task.task_id !== id),
      )
      setTask(request.data.body)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setGlobalLoading(false)
      }, 2000)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        globalLoading,
        setGlobalLoading,
        filterTask,
        setFilterTask,
        showInputSearch,
        setShowInputSearch,
        taskRegister,
        tasks,
        setTasks,
        favoriteFilterTask,
        setFavoriteFilterTask,
        openDropdownId,
        setOpenDropdownId,
        taskDelete,
        taskUpdate,
        nonFavoriteFilterTask,
        setNonFavoriteFilterTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
