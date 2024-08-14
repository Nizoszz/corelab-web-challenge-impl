import FavoriteIcon from '../../assets/img/FavoriteIcon.svg'
import FavoriteIconColor from '../../assets/img/FavoriteIconColor.svg'
import EditIcon from '../../assets/img/EditIcon.svg'
import PaintIcon from '../../assets/img/PaintIcon.svg'
import CloseIcon from '../../assets/img/CloseIcon.svg'
import SendIcon from '../../assets/img/SendIcon.svg'
import '../../styles/components/_taskCard.scss'
import { IFormValues, ITaskCardProps } from './types'
import { useContext, useState } from 'react'
import { ColorPickerDropdown } from '../colorPickerDropDown/ColorPickerDropDown'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TaskContext } from '../../providers/TaskContext/TaskContext'

export const TaskCard = ({
  id,
  title,
  content,
  color,
  isFavorite,
}: ITaskCardProps) => {
  const {
    taskUpdate,
    taskDelete,
    setOpenDropdownId,
    openDropdownId,
    globalLoading,
  } = useContext(TaskContext)
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      title,
      content,
    },
  })

  const handleEditClick = () => {
    setIsEditing(true)
    setValue('title', title)
    setValue('content', content)
  }

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    await taskUpdate(data, id)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    reset()
    setIsEditing(false)
  }

  const handleCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const buttonId = e.currentTarget.id
    setOpenDropdownId((prevId) => {
      if (prevId === buttonId) return null
      return buttonId
    })
  }

  const handleFavoriteCLick = async (data: boolean) => {
    const input = { isFavorite: data }
    await taskUpdate(input, id)
  }

  const handleDeleteCLick = async () => {
    await taskDelete(id)
  }
  return (
    <div
      className={`task-card ${color} ${
        isFavorite ? 'favorited shadow-border-card ' : ''
      }`}
      key={id}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <div className="form-header">
            <input
              {...register('title', { required: true })}
              placeholder={title}
            />
            <button disabled>
              <img
                src={isFavorite ? FavoriteIconColor : FavoriteIcon}
                alt="Favorite"
              />
            </button>
          </div>
          <textarea
            {...register('content', { required: true })}
            placeholder={content}
          />
          <div className={'task-actions'}>
            <div className="task-update-buttons">
              <button onClick={handleCancelClick}>
                <img src={EditIcon} alt="Edit" />
              </button>
              <button id={id} onClick={handleCardClick} disabled>
                <img src={PaintIcon} alt="Paint" />
              </button>
            </div>
            <button type="submit">
              <img src={SendIcon} alt="Send" />
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={`task-header`}>
            <h3 className="task-title">{title}</h3>
            <button
              onClick={() => {
                handleFavoriteCLick(!isFavorite)
              }}
            >
              <img
                src={isFavorite ? FavoriteIconColor : FavoriteIcon}
                alt="Favorite"
              />
            </button>
          </div>
          <div className="task-content">
            <p className="task-text">{content}</p>
          </div>
          <div className={'task-actions'}>
            <div className="task-update-buttons">
              <button onClick={handleEditClick}>
                <img src={EditIcon} alt="Edit" />
              </button>
              <button id={id} onClick={handleCardClick}>
                <img src={PaintIcon} alt="Paint" />
              </button>
            </div>
            <button onClick={handleDeleteCLick} disabled={globalLoading}>
              <img src={CloseIcon} alt="Delete" />
            </button>
          </div>
        </>
      )}
      {openDropdownId === id && !isEditing && <ColorPickerDropdown id={id} />}
    </div>
  )
}
