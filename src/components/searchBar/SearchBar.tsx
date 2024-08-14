import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormSearchValues } from './types'
import SearchIcon from '../../assets/img/SearchIcon.svg'
import '../../styles/components/_searchBar.scss'
import { TaskContext } from '../../providers/TaskContext/TaskContext'
import { useContext } from 'react'

export const SearchBar = () => {
  const { setFilterTask, tasks } = useContext(TaskContext)
  const { register, handleSubmit, reset } = useForm<IFormSearchValues>({
    mode: 'onBlur',
  })

  const submit: SubmitHandler<IFormSearchValues> = (data) => {
    const searchTerm = data.filter.toLowerCase()
    const filteredTasks = tasks
      .filter(
        (task) =>
          task.content.toLowerCase().includes(searchTerm) ||
          task.title.toLowerCase().includes(searchTerm),
      )
      .sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0))
    reset()
    setFilterTask(filteredTasks)
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        id="filter"
        placeholder="Digite sua pesquisa"
        {...register('filter')}
      />
      <button type="submit">
        <img src={SearchIcon} alt="" />
      </button>
    </form>
  )
}
