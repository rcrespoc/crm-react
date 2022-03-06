import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formulario } from '../components/Formulario';

export const EditarCliente = () => {
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const resp = await fetch(`http://localhost:4000/clientes/${id}`);
        const body = await resp.json();
        setCliente(body);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    }
    obtenerClienteAPI();
  }, [])
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <p className="mt-3">Actualiza los datos de un cliente</p>
      {cliente.nombre ? (
        <Formulario
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p>No existe ese cliente.</p>}
    </>
  )
}