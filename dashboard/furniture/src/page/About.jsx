import React from 'react'
import { useSelector } from 'react-redux'

export default function About() {
    let data = useSelector((state) => state.product.test)
    console.log(data)
  return (
    <div>About</div>
  )
}
