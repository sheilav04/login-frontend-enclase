import React, { useEffect, useState } from 'react'

export const Profile = () => {
  const [data, setData] = useState([])
  const [load, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3002/users',{
      headers: {"Content-Type": "application/json", "role": "basic"},
    })
    .then(respose => respose.json())
    .then(data => {
      setData(data)
      console.log(data);
    })
    .catch((error) => {
      setError(error)
      console.log(error)})
    .finally(()=>{
      setLoading(true) 
    })  
  }, [])
    

  if(load) <p>Loading...</p>
  if(error) <p>Error..!</p>

  //--------------------------------------------------------------------------------------------------
  //Hace un POST
  //--------------------------------------------------------------------------------------------------
  const [newData, setNewData] = useState([])
  const [newLoad, setNewLoading] = useState(false)
  const [newError, setNewError] = useState(null)  
  
  //const handleCrear = async () => {
    setLoading(true)
    useEffect(() => {
      fetch('http://localhost:3002/users',{ method: "POST",
        headers: {"Content-Type": "application/json", "role": "admin"},
        body: JSON.stringify({"email": "alberto@gmail.com", "password": "123455", "rol": "basic"})
      })
      .then(respose => respose.json())
      .then(dataPost => {
        setNewData(dataPost)
        console.log(dataPost);
      })
      .catch((error) => {
        setNewError(error)
        console.log(error)})
      .finally(()=>{
        setNewLoading(false) 
      })  
    }, [])
    
//}

const handleCrear = () => {
  //do a create/post here?
  (newData) ? 
  <>
    Esta es la data nueva que agregaste:
    <>
    <div>This is the email: {dataPost.email}</div>
    <div>This is the password: {dataPost.email}</div>
    </>
  </> : true

  console.log("you click me create");
}
  
  //--------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------

  function handleEditar(value){
  console.log("you click me edit", value);
  }
  
  const handleEliminar = () => {
    //do a delete here?
    console.log("you click me elimi");
  }

  

  //const dataFetched = ["jorge","borges","cortazar","neruda"] 
  
  return (
    <>
     <div>
      
        <ul>
          Nombre de Usuarios  
         {data.map((value) =>
          <>
          <li>{value.email}</li>
          {/*<button onClick={() => handleEditar(value)}>Editar</button>
          <button onClick={handleEliminar}>Eliminar</button>*/}
          </>
         )}
        </ul>
        {newError && <h2>{newError}</h2>}
        <button onClick={handleCrear}>Crear</button>
        {newLoad && <h2>Loadiing...</h2>}
     </div>
    </>
  )
}
