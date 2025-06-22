import { HomeIcon, TasksIcon } from '../assets/icons'
import SidebarButton from './SidebarButton'

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="mb-4 text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Gerencia suas tarefas da{' '}
          <span className="text-brand-primary">melhor forma</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton color="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton color="selected">
          <TasksIcon /> Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
