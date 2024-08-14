export interface ITaskProvider {
  children: React.ReactNode
}

export interface ITaskContext {
  task: ITaskProps | null
  setTask: React.Dispatch<React.SetStateAction<ITaskProps | null>>
  globalLoading: boolean
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>
  tasks: ITaskProps[]
  setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
  filterTask: ITaskProps[]
  setFilterTask: React.Dispatch<React.SetStateAction<ITaskProps[]>>
  nonFavoriteFilterTask: ITaskProps[]
  setNonFavoriteFilterTask: React.Dispatch<React.SetStateAction<ITaskProps[]>>
  favoriteFilterTask: ITaskProps[]
  setFavoriteFilterTask: React.Dispatch<React.SetStateAction<ITaskProps[]>>
  showInputSearch: boolean
  setShowInputSearch: React.Dispatch<React.SetStateAction<boolean>>
  openDropdownId: string | null
  setOpenDropdownId: React.Dispatch<React.SetStateAction<string | null>>
  taskRegister: (data: ITaskFormProps) => Promise<void>
  taskUpdate: (data: ITaskFormProps, id: string) => Promise<void>
  taskDelete: (id: string) => Promise<void>
}

export interface ITaskProps {
  task_id: string
  title: string
  content: string
  color: string
  is_favorite: boolean
}

export interface ITaskFormProps {
  title?: string
  content?: string
  isFavorite?: boolean
  color?: string
}

export interface ITaskCardColorProps {
  color: string
}
