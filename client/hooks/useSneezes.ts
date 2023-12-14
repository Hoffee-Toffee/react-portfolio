import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getSneezes } from '../apis/sneezes.ts'

export function useSneezes() {
  const query = useQuery({ queryKey: ['sneezes'], queryFn: getSneezes })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useSneezesMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sneezes'] })
    },
  })

  return mutation
}

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
