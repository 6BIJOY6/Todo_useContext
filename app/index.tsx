import React from 'react'
import TodoProvider from '../context/TodoContext'
import Todo from '../Components/Todo'
import { Link } from 'expo-router'

export default function index() {
  return (
    <TodoProvider>
      <Todo/>
    </TodoProvider>
  )
}
