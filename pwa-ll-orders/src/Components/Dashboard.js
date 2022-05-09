import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Alert } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
const {currentUser, logout} =  useAuth()
const [error, setError] =useState("")
const navigate = useNavigate()
const [products, setProducts] = React.useState([]);

async function handleLogout(){
    setError('')

    try {
        await logout()
        navigate('/login')
        
    } catch {
        setError('Failed to log out')
    }
}

function Products() {
  function loadProducts() {
    fetch("ll-orders-backend.herokuapp.com/v1/products", {"method": "GET"})
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
  }

  loadProducts();
  console.log(products)
}

  useEffect(() => {Products()});


  return <div class="container">
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="accordion" id="accordionExample">
                        {products.map((product) => {
                              return <div class="container row allign-items-center">
                                        <div class="accordion-item d-flex flex-row justify-content-between">
                                              <div class="flex-fill">
                                              <h2 class="accordion-header" id={`heading${product.id}`}>
                                                  <button dir="ltr" class="accordion-button collapsed d-flex justify-content-start" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${product.id}`} aria-expanded="false" aria-controls={`collapse${product.id}`}>
                                                        <img style={{width: "90px", height: "90px", objectFit: "contain"}} alt='Loading...' src={process.env.PUBLIC_URL + '/logo.png'} />
                                                    {product.name}
                                                 </button>
                                              </h2>
                                              </div>
                                          <div class="d-flex justify-content-between align-self-center">
                                              <button style={{backgroundColor: "white", border: "none"}}><i class="bi bi-dash-circle p-1" style={{fontSize: "2rem"}}></i></button>
                                              <div class="container border border-dark border-4 text-wrap d-flex allign-items-center" style={{width: "40px", height: "40px"}}>
                                                  {product.quantity}
                                              </div>
                                              <button style={{backgroundColor: "white", border: "none"}}><i class="bi bi-plus-circle p-1" style={{fontSize: "2rem"}}></i></button>
                                          </div>
                                          </div>
                                               <div id={`collapse${product.id}`} class="accordion-collapse collapse" aria-labelledby={`heading${product.id}`}data-bs-parent="#accordionFlushExample">
                                                 <div class="accordion-body">{product.info}</div>
                                                   </div>
                                          </div>
                            })}
              </div>
      <button type="button" class="mt-3 btn btn-danger" onClick={handleLogout}>Log out</button>

  </div>;
}
