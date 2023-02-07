import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

export default function EditPage() {

  const params = useParams();
  let navigate = useNavigate();
  const [student, setStudent] = useState('');
  const [name, setName] = useState('');
  const [testOne, setTestOne] = useState('');
  const [testTwo, setTestTwo] = useState('');
  const [works, setWorks] = useState('');

  useEffect(() => {
    fetch("/edit/" + params.id)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setStudent(data);
      })
  }, [])

  useEffect(() => {
    setName(student.name);
    setTestOne(student.testOne);
    setTestTwo(student.testTwo);
    setWorks(student.works);
  }, [student])

  function handleSubmit(event) {
    event.preventDefault();
    if (window.confirm("Tem certeza que quer editar as informações desse estudante? Clique em OK para confirmar ou CANCEL para cancelar essa ação.") == true) {
      event.target.submit();
      navigate('/', { replace: true });
    } else {
    }
  }

  return (
    <div className='container'>
      <Header>Editar Aluno</Header>
      <form method="POST" action="/?_method=PUT" onSubmit={handleSubmit} className='d-flex flex-column w-50 m-auto'>
        <input name='id' type='text' value={student._id} hidden></input>
        <input name='name' type='text' value={name} onChange={(event) => { setName(event.target.value) }} className='rounded-pill my-1 text-center' placeholder='Nome do aluno' required></input>
        <input name='testOne' type='number' value={testOne} onChange={(event) => { setTestOne(event.target.value) }} className='rounded-pill my-1 text-center w-75 m-auto' placeholder='P1' min={0} max={3} required></input>
        <input name='testTwo' type='number' value={testTwo} onChange={(event) => { setTestTwo(event.target.value) }} className='rounded-pill my-1 text-center w-75 m-auto' placeholder='P2' min={0} max={3} required></input>
        <input name='works' type='number' value={works} onChange={(event) => { setWorks(event.target.value) }} className='rounded-pill my-1 text-center w-75 m-auto' placeholder='Seminário' min={0} max={4} required></input>
        <button type='submit' className='btn btn-success my-1 w-50 m-auto rounded-pill'>Confirmar edição</button>
      </form>
      <div className='text-center my-1'>
        <Link to='/'><button className='btn btn-danger rounded-pill'>Voltar para a página inicial</button></Link>
      </div>
    </div>
  )
}
