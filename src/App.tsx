import { useContext } from 'react'
import { RouteDashboard } from './routes/RouteDashboard'
import { TaskContext } from './providers/TaskContext/TaskContext'
import './styles/components/_spinner.scss'

export const App = () => {
  const { globalLoading } = useContext(TaskContext)
  return (
    <>
      {globalLoading ? (
        <div className="loading-container">
          <div className="spinner">
            <p className="">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <RouteDashboard />
        </>
      )}
    </>
  )
}
