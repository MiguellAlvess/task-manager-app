import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData('tasks', (currentTasks) => {
        return currentTasks.filter((oldTask) => oldTask.id !== deletedTask.id)
      })
    },
  })
}
