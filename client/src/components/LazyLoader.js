import {useEffect, useState} from 'react'

export default function LazyLoader({delay, component}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return show ? component : null
}