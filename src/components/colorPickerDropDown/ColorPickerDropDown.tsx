import { useContext } from 'react'
import '../../styles/components/_colorPickerDropDown.scss'
import { getColorClass } from './GetColors'
import { TaskContext } from '../../providers/TaskContext/TaskContext'
import { ColorPickerProps } from './types'
import { useOutsideClick } from '../../hooks/OutsideClick'

export const ColorPickerDropdown = ({ id }: ColorPickerProps) => {
  const colors = [
    '#BAE2FF',
    '#B9FFDD',
    '#FFE8AC',
    '#FFCAB9',
    '#F99494',
    '#9DD6FF',
    '#ECA1FF',
    '#DAFF8B',
    '#FFA285',
    '#CDCDCD',
    '#979797',
    '#A99A7C',
  ]

  const { taskUpdate, setOpenDropdownId } = useContext(TaskContext)
  const handlerColor = async (color: string) => {
    const getColor = getColorClass(color)
    const input = { color: getColor }
    await taskUpdate(input, id)
  }

  const ref = useOutsideClick(() => {
    setOpenDropdownId(null)
  })

  return (
    <div className="color-picker" ref={ref}>
      {colors.map((color, index) => (
        <button
          key={index}
          style={{
            backgroundColor: color,
            borderRadius: '100%',
            width: '30px',
            height: '30px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            handlerColor(color)
          }}
        />
      ))}
    </div>
  )
}
