import Logo from '../assets/img/LogoVector.png'
import CloseIcon from '../assets/img/CloseIcon.svg'
import '../styles/components/_dashboard.scss'
import { SearchBar } from '../components/searchBar/SearchBar'
import { TaskImplementCard } from '../components/card/TaskImplementCard'
import { useContext } from 'react'
import { TaskContext } from '../providers/TaskContext/TaskContext'
import { TaskCard } from '../components/card/TaskCard'

export const Dashboard = () => {
  const { favoriteFilterTask, nonFavoriteFilterTask, filterTask } =
    useContext(TaskContext)
  return (
    <>
      <header className="dashboard-header">
        <div className="container">
          <nav>
            <div>
              <img src={Logo} alt="Logo" />
              <SearchBar />
            </div>
            <button>
              <img src={CloseIcon} alt="Close" />
            </button>
          </nav>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="container align-content">
          <TaskImplementCard />
          {filterTask.length > 0 ? (
            <div className="container task-div">
              <div className="align-container-cards">
                <h3 className="title-div">Filtrados</h3>
                <div className="align-card">
                  {filterTask.map((filter, index) => {
                    return (
                      <TaskCard
                        key={index}
                        id={filter.task_id}
                        color={filter.color}
                        content={filter.content}
                        title={filter.title}
                        isFavorite={filter.is_favorite}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              {favoriteFilterTask.length > 0 && (
                <div className="container task-div">
                  <div className="align-container-cards ">
                    <h3 className="title-div">Favoritos</h3>
                    <div className="align-card">
                      {favoriteFilterTask.map((favorite, index) => {
                        return (
                          <TaskCard
                            key={index}
                            id={favorite.task_id}
                            color={favorite.color}
                            content={favorite.content}
                            title={favorite.title}
                            isFavorite={favorite.is_favorite}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {nonFavoriteFilterTask.length > 0 && (
                <div className="container task-div">
                  <div className="align-container-cards ">
                    <h3 className="title-div">Outras</h3>
                    <div className="align-card">
                      {nonFavoriteFilterTask.map((task, index) => {
                        return (
                          <TaskCard
                            key={index}
                            id={task.task_id}
                            color={task.color}
                            content={task.content}
                            title={task.title}
                            isFavorite={task.is_favorite}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
