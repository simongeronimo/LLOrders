import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Alert } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
const {currentUser, logout} =  useAuth();
const [error, setError] =useState("");
const [saved, setSaved] =useState("Save");
const navigate = useNavigate();
var dictionary = {};
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
async function handleReset(){
  products.forEach(product => {
    product.quantity=0;
    product.quantity_case=0;
  });
  setSaved("Save");
  forceUpdate();
}

async function handleSave(){
  setError('')
    let idString = "";
    let quantityString = "";
    let quantity_caseString = "";
    products.forEach(product => {
      idString=idString+product.id+",";
      quantityString= quantityString+product.quantity+",";
      quantity_caseString= quantity_caseString+product.quantity_case+",";
    });
    idString=idString.slice(0,-1);
    quantityString=quantityString.slice(0,-1); 
    quantity_caseString=quantity_caseString.slice(0,-1); 
  var urlencoded = new URLSearchParams();
  urlencoded.append("ids", idString);
  urlencoded.append("quantities", quantityString);
  urlencoded.append("quantities_case", quantity_caseString);
  
  var requestOptions = {
    method: 'POST',
    body: urlencoded
  };
  
  fetch("https://ll-orders-proxy.herokuapp.com/https://ll-orders-backend.herokuapp.com/v1/saveProducts", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    setSaved("SAVED!")
  
}


async function loadProducts() {
  dictionary["1"]=document.getElementById('kitchenCheckbox').checked;
  dictionary["2"]=document.getElementById('pizzaCheckbox').checked;
  if(dictionary["1"] || dictionary["2"]){

    var locations = "";
    for(var key in dictionary) {
      var value = dictionary[key];
      if(value){
        locations=locations+key+",";
      }
    }
    locations=locations.slice(0,-1);
    console.log("locations"+locations);
    var urlencoded = new URLSearchParams();
    urlencoded.append("locations", locations);
    
    var requestOptions = {
      method: 'POST',
      body: urlencoded
    };
    try {
      fetch("https://ll-orders-proxy.herokuapp.com/https://ll-orders-backend.herokuapp.com/v1/products", requestOptions)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }
  else{
    setProducts([]);
    forceUpdate();
  }
  }
  
async function firstStep() {
  document.getElementById('kitchenCheckbox').checked=true;
  document.getElementById('pizzaCheckbox').checked=true;
  loadProducts();
}

  useEffect(() => {firstStep()}, []);

  function subtractOne(product) {
    setSaved("Save");
    product.quantity=product.quantity-1;
    forceUpdate();
 }; 
  function addOne(product) {
    setSaved("Save");
    product.quantity=product.quantity+1;
    forceUpdate();
 }; 
  function subtractOneCase(product) {
    setSaved("Save");
    product.quantity_case=product.quantity_case-1;
    forceUpdate();
 }; 
  function addOneCase(product) {
    setSaved("Save");
    product.quantity_case=product.quantity_case+1;
    forceUpdate();
 }; 

 function check()
{
  loadProducts();
}

  return <div class="container">
      <div class="checkboxes">
        <div class="form-check form-check-inline">
          <input class="form-check-input" onClick={check} type="checkbox" id="kitchenCheckbox"></input>
          <label class="form-check-label" for="kitchenCheckbox">Kitchen</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" onClick={check} type="checkbox" id="pizzaCheckbox" value="option2"></input>
          <label class="form-check-label" for="pizzaCheckbox">Pizza</label>
        </div>
      </div>
      <div class="container-fluid d-flex flex-row justify-content-evenly ">
        <div class="container-fluid">
          <h5>Name</h5>
        </div>
        <div class="container-fluid d-flex flex-row justify-content-around">
          <h5>Unit</h5>
          <h5>Case</h5>
        </div>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <div class="accordion container-fluid" id="accordionExample">
                        {products.map((product) => {
                              return <div class="container row allign-items-center">
                                        <div class="accordion-item d-flex flex-row justify-content-between">
                                              <div class="flex-fill">
                                              <h2 class="accordion-header" id={`heading${product.id}`}>
                                                  <button dir="ltr" class="mt-4 mb-4 accordion-button collapsed d-flex justify-content-start" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${product.id}`} aria-expanded="false" aria-controls={`collapse${product.id}`}>
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
                                          <div class="d-flex justify-content-between align-self-center">
                                              <button onClick={() => subtractOneCase(product)} style={{backgroundColor: "white", border: "none"}}><i class="bi bi-dash-circle p-1" style={{fontSize: "2rem"}}></i></button>
                                              <div class="container border border-dark border-4 text-wrap d-flex allign-items-center" style={{width: "40px", height: "40px"}}>
                                                  {product.quantity_case}
                                              </div>
                                              <button onClick={() => addOneCase(product)} style={{backgroundColor: "white", border: "none"}}><i class="bi bi-plus-circle p-1" style={{fontSize: "2rem"}}></i></button>
                                          </div>
                                          </div>
                                               <div id={`collapse${product.id}`} class="accordion-collapse collapse" aria-labelledby={`heading${product.id}`}data-bs-parent="#accordionFlushExample">
                                                 <div class="accordion-body">{product.info}</div>
                                                   </div>
                                          </div>
                            })}
              </div>
      <div class="botones">
        <button type="button" class="mt-3 btn btn-success m-2"onClick={handleSave}>{saved}</button>
        <button type="button" class="mt-3 btn btn-danger m-2" onClick={handleLogout}>Log out</button>
        <button type="button" class="mt-3 btn btn-dark m-2" onClick={handleReset}>Reset</button>
      </div>

  </div>;
}
