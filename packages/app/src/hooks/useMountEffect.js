import { useEffect } from 'react'
export const useMountEffect = fun => useEffect(() => fun, [])
