import React, { useEffect, useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('')
  //no codificar pass del lado del front
  const [password, setPass] = useState('')
  
  const [data, setData] = useState('')

  const [load, setLoading] = useState(false) //true if not fetch ?
  const [success, setSuccess] = useState('')

  const handleSubmit = () => {
    
    setLoading(true)
    
    useEffect(() => {
      try {
        const fetchData = async () =>{
           const requestOptions = { method: "POST", headers: {"Content-Type": "application/json", "role": "admin"} , body: {email, password}}
           const data = await fetch('http://localhost:3002/login', requestOptions)
    
           const response = await data.json() 
           setData(response)
           
           const token = response.token 
           setSuccess(token)
           navigator('/profile')
        }
        fetchData()
        
      } catch (error) {
        throw new Error('Something went wrong')

      } 
       
    }, [])
  
}  

  return (
    <>
    <h1>Login</h1>
     <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' value={email} required onChange={(event) => {setEmail(event.target.value)}}/>
        <label>Password</label>
        <input type='password' value={password} required onChange={(event) => {setPass(event.target.value)}}/>
        <button type='submit'>
            {load ? <>Loading ...</> : 'Enviar' }
        </button>
     </form>   
    </>
  )
}
