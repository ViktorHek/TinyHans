import { useEffect } from 'react'

export default function useKeys(event: any) {
  useEffect(() => {
    window.addEventListener("keydown", event)
    return () => window.removeEventListener("keydown", event)
  }, [event])
}