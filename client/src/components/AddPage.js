import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'

export default function AddPage() {

  let navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    event.target.submit();
    navigate('/', { replace: true })
  }

  return (
    <div className='container'>
      <Header>Adicionar Aluno</Header>
      <form method='POST' action='/' onSubmit={handleSubmit} className='d-flex flex-column w-50 m-auto'>
        <input name='name' type='text' className='rounded-pill my-1 text-center' placeholder='Nome do aluno' required></input>
        <input name='testOne' type='number' className='rounded-pill my-1 text-center w-75 m-auto' placeholder='P1' min={0} max={3} required></input>
        <input name='testTwo' type='number' className='rounded-pill my-1 text-center w-75 m-auto' placeholder='P2' min={0} max={3} required></input>
        <input name='works' type='number' className='rounded-pill my-1 text-center w-75 m-auto' placeholder='Seminário' min={0} max={4} required></input>
        <button className='btn btn-success my-1 w-50 m-auto rounded-pill'>Cadastrar novo aluno</button>
      </form>
      <div className='text-center my-1'>
        <Link to='/'><button className='btn btn-danger rounded-pill'>Voltar para a página inicial</button></Link>
      </div>
    </div>
  )
}
