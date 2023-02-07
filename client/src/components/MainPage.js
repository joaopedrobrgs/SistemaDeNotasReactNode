import React from 'react'
import Table from './Table';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function MainPage() {
    return (
        <div className="container">
            <Header>Notas da Turma - Matemática</Header>
            <div className='text-center py-10px'>
                <Link to='/addPage'><Button className='w-25' variant='success'>Cadastrar novo aluno</Button></Link>
            </div>
            <Table></Table>
        </div>
    )
}
