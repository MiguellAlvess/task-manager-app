import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        time: newTask.time,
      })
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask
          }
          return task
        })
      })
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask)
    },
  })
}
