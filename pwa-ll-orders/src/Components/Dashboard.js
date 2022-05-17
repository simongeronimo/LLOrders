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
const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);

async function handleLogout(){
    setError('')

    try {
        await logout()
        navigate('/login')
        
    } catch {
        setError('Failed to log out')
    }
}
async function handleSave(){
  setError('')
    let idString = "";
    let quantityString = "";
    products.forEach(product => {
      idString=idString+product.id+",";
      quantityString= quantityString+product.quantity+",";
    });
    idString=idString.slice(0,-1);
    quantityString=quantityString.slice(0,-1);
    const params = {
      ids: idString,
      quantities: quantityString 
    };
  var urlencoded = new URLSearchParams();
  urlencoded.append("ids", idString);
  urlencoded.append("quantities", quantityString);
  
  var requestOptions = {
    method: 'POST',
    body: urlencoded
  };
  
  fetch("https://ll-orders-proxy.herokuapp.com/https://ll-orders-backend.herokuapp.com/v1/saveProducts", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

async function Products() {
  async function loadProducts() {
    try {
      fetch("https://ll-orders-proxy.herokuapp.com/https://ll-orders-backend.herokuapp.com/v1/products", {"method": "GET"})
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }
  loadProducts();
  console.log('test')
}

  useEffect(() => {Products()}, []);

  function subtractOne(product) {
    product.quantity=product.quantity-1;
    forceUpdate();
 }; 
  function addOne(product) {
    product.quantity=product.quantity+1;
    forceUpdate();
 }; 

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
                                              <button onClick={() => subtractOne(product)} style={{backgroundColor: "white", border: "none"}}><i class="bi bi-dash-circle p-1" style={{fontSize: "2rem"}}></i></button>
                                              <div class="container border border-dark border-4 text-wrap d-flex allign-items-center" style={{width: "40px", height: "40px"}}>
                                                  {product.quantity}
                                              </div>
                                              <button onClick={() => addOne(product)} style={{backgroundColor: "white", border: "none"}}><i class="bi bi-plus-circle p-1" style={{fontSize: "2rem"}}></i></button>
                                          </div>
                                          </div>
                                               <div id={`collapse${product.id}`} class="accordion-collapse collapse" aria-labelledby={`heading${product.id}`}data-bs-parent="#accordionFlushExample">
                                                 <div class="accordion-body">{product.info}</div>
                                                   </div>
                                          </div>
                            })}
              </div>
      <button type="button" class="mt-3 btn btn-success" onClick={handleSave}>Save</button>
      <button type="button" class="mt-3 btn btn-danger" onClick={handleLogout}>Log out</button>

  </div>;
}
