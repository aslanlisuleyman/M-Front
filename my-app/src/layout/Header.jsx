import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import { useState } from 'react';
import {  addData } from '../redux/slices/dataSlice'


const Header = () => {
  const dispatch = useDispatch()
  const basketItems = useSelector((state) => state.baskets.items)
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSubmit = (values) => {
    
    
    console.log('Form submitted with values:', values);
    
  };
  
  const formik = useFormik({
    initialValues: {
      
      name: '',
      price: '',
      images:''
    },

    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Başlıq əlavə et';
      }
      if (!values.price) {
        errors.price = 'Qiymət əlavə et';
      }
      if (!values.images) {
        errors.images = 'Rəsm əlavə et';
      }
      return errors;
    },
    onSubmit: (values,{ resetForm }) => {
     
      dispatch(
        addData({
        item:values
        })
      );
     
      resetForm();
    },
  });

  const handleAddClick = (item) => {
    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
  
    if (!isFormOpen) {
      formik.setValues({
        name: item.name,
        price: item.price,
        images: item.images,
      });
    } else {
      formik.resetForm();
    }
  };
  

  return (
    <>
     <div className="umumi">
    <div className='bas'>
      <div className='h'><h4>Start Bootstrap</h4></div>
        <div> 
          <ul>
          <li> <Link style={{textDecoration:'none',color:'black'}} to='/'>Home</Link></li>
          <li><Link style={{textDecoration:'none',color:'black'}} to='/Basket'>Basket</Link></li>
          <button onClick={handleAddClick} className='ado' style={{borderRadius:"8px",backgroundColor:"white"}}>Add Product</button>
          </ul>
           </div> 
    </div>
    {isFormOpen && (
        <div>
         
          <form onSubmit={formik.handleSubmit}>

            <div>
              Images: <br />
            <input style={{marginLeft:'0%',width:'300px'}}
                        type='text'
                        name='images'
                        value={formik.values.images}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.images && (
    <div className='error'>{formik.errors.images}</div>
  )}
            </div>
            <div> Name: <br />
            <input style={{width:'300px',marginLeft:'0%'}}
                        type='text'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                       {formik.errors.name && (
    <div className='error'>{formik.errors.name}</div>
  )}
            </div>
            <div> Price: <br />
              <input style={{marginLeft:'0%',width:'300px'}}
                        type='text'
                        name='price'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                       {formik.errors.price && (
    <div className='error'>{formik.errors.price}</div>
  )}
            </div>
            <div>

            </div>
          
            <button style={{marginLeft:'39%',marginTop:"5px",marginBottom:"5px"}} className='sub' type="submit">Submit</button>
            
          </form>
        </div>
      )}

    <div className='but'>
      <button><i class="fa-solid fa-basket-shopping"></i> <p>Cart</p>  <span>{basketItems.length}</span></button>
    </div>
    
   </div>
    
    <div className='reng'>
        <h1>Shop in style</h1>
        <p>With this shop hompeage template</p>
    </div>
    

    
    </>
   
  )
}

export default Header