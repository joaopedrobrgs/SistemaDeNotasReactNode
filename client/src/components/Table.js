import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import io from 'socket.io-client';

const socket = io();

export default function Table() {

    const [students, setStudents] = useState([]);
    useEffect(() => {
        fetch('/all')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setStudents(data);
            })
    }, []);

    function aprobbation(student) {
        const total = Number(student.testOne) + Number(student.testTwo) + Number(student.works);
        if (total >= 7) {
            return 'Aprovado'
        } else {
            return 'Não aprovado'
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (window.confirm("Tem certeza que quer apagar esse estudante? Clique em OK para confirmar ou CANCEL para cancelar essa ação.") == true) {
            event.target.submit();
        } else {
        }
    }

    
  const [isConnected, setIsConnected] = useState('');
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected');
      socket.on('updateData', (data) => {
        fetch('/all')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setStudents(data);
        })
      })  
      socket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Disconnected');
      });    
    });
  }, [])

    return (
        <div>
            <table className="w-100 bg-translucent rounded">
                <thead className="text-center">
                    <tr>
                        <th>Nome</th>
                        <th>P1</th>
                        <th>P2</th>
                        <th>Seminário</th>
                        <th>Total</th>
                        <th>Aprovação</th>
                        <th className="text-red">Edit/Erase</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {students.map((student) => {
                        return (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.testOne}</td>
                                <td>{student.testTwo}</td>
                                <td>{student.works}</td>
                                <td>{Number(student.testOne) + Number(student.testTwo) + Number(student.works)}</td>
                                <td>{aprobbation(student)}</td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <Link to={`editPage/${student._id}`}><button><i className="bi bi-pencil"></i></button></Link>
                                        <form method='POST' action="/?_method=DELETE" onSubmit={handleSubmit}>
                                            <input name='id' type='text' value={student._id} hidden></input>
                                            <button><i className="bi bi-trash"></i></button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
