import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Alerta } from "./Alerta";
import { Spinner } from "./Spinner";

export const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto.')
      .max(20, 'El nombre es muy largo.')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
      .required('El nombre de la empresa es obligatorio.'),
    email: Yup.string()
      .email('Email no válido.')
      .required('El email es obligatorio.'),
    telefono: Yup.number().integer('Numro no valido.').positive('Numero no válido.').typeError('El numero no es válido.')
  })
  const handleSubmit = async (valores) => {
    try {
      let resp;
      if(cliente.id){
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        resp = await fetch(url, { 
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }else{
        const url = 'http://localhost:4000/clientes';
        resp = await fetch(url, { 
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      const body = await resp.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    cargando ? <Spinner /> :
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente.id ? 'Editar' : 'Agregar'} cliente</h1>

      <Formik
        initialValues={{
          nombre: cliente.nombre || '',
          empresa: cliente.empresa || '',
          email: cliente.email || '',
          telefono: cliente.telefono || '',
          notas: cliente.notas || ''
        }}
        enableReinitialize={true}
        onSubmit={async (values, {resetForm}) => {
          await handleSubmit(values);
          resetForm();
          navigate('/clientes');
        }}
        validationSchema={nuevoClienteSchema}
      >
          {({errors, touched}) => {
            return (
            <Form
              className="mt-10"
            >

              <div
                className="mb-4"
              >
                <label
                  className="text-gray-800"
                  htmlFor="nombre"
                >Nombre:</label>
                <Field
                  id='nombre'
                  name='nombre'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Nombre del cliente'
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : ''}
              </div>
              <div
                className="mb-4"
              >
                <label
                  className="text-gray-800"
                  htmlFor="empresa"
                >Empresa:</label>
                <Field
                  id='empresa'
                  name='empresa'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Empresa del cliente'
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : ''}
              </div>
              <div
                className="mb-4"
              >
                <label
                  className="text-gray-800"
                  htmlFor="email"
                >Email:</label>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Email del cliente'
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : ''}
              </div>
              <div
                className="mb-4"
              >
                <label
                  className="text-gray-800"
                  htmlFor="telefono"
                >Teléfono:</label>
                <Field
                  id='telefono'
                  name='telefono'
                  type='tel'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Teléfono del cliente'
                />
              </div>
              <div
                className="mb-4"
              >
                <label
                  className="text-gray-800"
                  htmlFor="notas"
                >Notas:</label>
                <Field
                  as='textarea'
                  id='notas'
                  name='notas'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Notas del cliente'
                />
              </div>

              <input 
                value={`${cliente.id ? 'Editar cliente' : 'Añadir cliente'}`}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                type="submit" 
              />
            </Form>
          )}}
      </Formik>
    </div>
  )
}

Formulario.defaultProps = {
  cliente: {}
}