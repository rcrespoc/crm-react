import { useEffect, useState } from "react"
import { Cliente } from "../components/Cliente"

export const Inicio = () => {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = 'http://localhost:4000/clientes';
        const resp = await fetch(url);
        const body = await resp.json();
        setClientes(body);
      } catch (error) {
        console.log(error);
      }
    } 
    obtenerClientesAPI();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Desea eliminar este cliente?');

    if(confirmar){
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const resp = await fetch(url, {method: 'DELETE'});
        await resp.json();
        setClientes(clientes.filter(cliente => cliente.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Listado de clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente 
              key={`id-${cliente.id}`}
              {...cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}