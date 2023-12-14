import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getProjects } from '../apis/projects.ts'

export function useProjects() {
  const query = useQuery({ queryKey: ['projects'], queryFn: getProjects })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useProjectsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  return mutation
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
