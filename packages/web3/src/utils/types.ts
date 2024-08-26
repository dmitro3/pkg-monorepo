export type MutationHook<Req, Res> = <Context>(
  options?: Omit<
    import('@tanstack/react-query').UseMutationOptions<Res, unknown, Req, Context>,
    'mutationFn'
  >
) => import('@tanstack/react-query').UseMutationResult<Res, unknown, Req, Context>;
