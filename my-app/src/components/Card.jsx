

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket } from '../redux/slices/basketSlice';
import toast ,{ Toaster } from 'react-hot-toast';
import { deleteData } from '../redux/slices/dataSlice';

const Card = () => {
    
  const dispatch = useDispatch(); 

  const handleDeleteClick = (item) => {
    dispatch(deleteData({ item }));
    toast.success("Datadan silindi");
  };

  const { data } = useSelector((state) => state.api);

  return (
    <div style={{marginBottom:"50px"}} className="App">
      {data.map((item, index) => {
        return (
          <div class="card" style={{ width: '17rem', height: '400px' }}>
            <img style={{ height: '250px' }} src={item.images} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 style={{ marginLeft: '75px' }} class="card-title">
                {item.name}
              </h5>
              <p style={{ marginLeft: '103px' }} class="card-text">
              {item.price}
              </p>
              <a
                class="btn bw btn-primary"
                onClick={() => {
                  dispatch(addBasket(item));
                }}
              >
                Add To Cart
              </a>
              <a onClick={() => handleDeleteClick(item)} class="btn by btn-danger">
                Delete
              </a>
            </div>
          </div>
        );
      })}
      <Toaster />
    </div>
  );
};

export default Card;
