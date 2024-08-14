import { useContext, useState } from 'react'
import FavoriteIcon from '../../assets/img/FavoriteIcon.svg'
import '../../styles/components/_taskCard.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IFormValues } from './types'
import { TaskContext } from '../../providers/TaskContext/TaskContext'
import SendIcon from '../../assets/img/SendIcon.svg'

export const TaskImplementCard = () => {
  const { taskRegister, globalLoading } = useContext(TaskContext)
  const [text, setText] = useState('')

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    setText(textarea.value)
  }

  const { register, handleSubmit } = useForm<IFormValues>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    await taskRegister(data)
  }

  return (
    <form
      className="task-card created-card shadow-border-card"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="task-header default">
        <input
          {...register('title', { required: 'Título é obrigatório' })}
          className="task-title clean-input"
          type="text"
          placeholder="Título"
        />
        <button disabled>
          <img src={FavoriteIcon} alt="Favorite" />
        </button>
      </div>
      <div className="task-content">
        <textarea
          {...register('content', { required: 'Conteúdo é obrigatório' })}
          className="text-area-modify clean-input"
          placeholder="Criar uma nota..."
          onChange={handleContentChange}
        />
      </div>
      {text.length > 0 ? (
        <button type="submit" className="send-button" disabled={globalLoading}>
          <img src={SendIcon} alt="Send" />
        </button>
      ) : null}
    </form>
  )
}
