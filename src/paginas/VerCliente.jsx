import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Spinner } from "../components/Spinner";

export const VerCliente = () => {

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

    cargando ? <Spinner /> :
      !cliente.id ? <p>No hay resultados</p> : (
        <div>
          <>
            <h1 className="font-black text-4xl text-blue-900">Ver cliente</h1>
            <p className="mt-3">Datos del cliente</p>
            <p className='text-2xl text-gray-700 mt-10'>
              <span className="uppercase text-gray-800 font-bold">CLIENTE:</span>
              {cliente.nombre}
            </p>
            <p className='text-2xl text-gray-700'>
              <span className="uppercase text-gray-800 font-bold">Email:</span>
              {cliente.email}
            </p>
            <p className='text-2xl text-gray-700'>
              <span className="uppercase text-gray-800 font-bold">empresa:</span>
              {cliente.empresa}
            </p>
            <p className='text-2xl text-gray-700'>
              <span className="uppercase text-gray-800 font-bold">telefono:</span>
              {cliente.telefono}
            </p>
            {
              cliente.notas && (
                <p className='text-2xl text-gray-700'>
                  <span className="uppercase text-gray-800 font-bold">notas:</span>
                  {cliente.notas}
                </p>
              )
            }
          </>
        </div>

      )
  )
}