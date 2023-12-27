

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBasket,  decreaseBasketItem, deleteItems, increaseBtn } from '../redux/slices/basketSlice';
import axios from 'axios';

const Card = () => {
  const items = useSelector((state) => state.baskets.items);
  const dispatch = useDispatch();
  let basketTotalPrice = useSelector((state) => state.baskets.basketTotalPrice)


  return (
    <div className='tab' style={{ backgroundColor: 'white', paddingTop: '100px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: 'white' }}>
        <thead style={{ height: '50px' }}>
          <tr>
            <th style={tableHeaderStyle}>Image</th>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Decrease</th>
            <th style={tableHeaderStyle}>Count</th>
            <th style={tableHeaderStyle}>Increase</th>
            <th style={tableHeaderStyle}>Total Price</th>
            <th style={tableHeaderStyle}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td> <img style={{ marginLeft: "0%", height: '100px', width: '130px' }} src={item.product.image} alt="" /> </td>
                <td> <p style={{ marginLeft: '0%' }}> {item.product._id}</p></td>
                <td> <p style={{ marginLeft: '0%' }}> {item.product.title}</p></td>
                <td > <p style={{ marginLeft: '10%' }}>{item.product.price}</p></td>
                <td>
                  <button style={{ color: 'black', marginLeft: '10%', fontSize: '20px' }} onClick={() => {
                    dispatch(decreaseBasketItem(item));
                  }}>-</button>
                </td>
                <td> <p style={{ marginLeft: '15%' }}>{item.count}</p></td>
                <td>
                  <button style={{ color: 'black', marginLeft: '10%', fontSize: '20px' }} onClick={() => {
                    dispatch(increaseBtn(item));
                  }} >+</button>
                </td>
                <td > <p style={{ marginLeft: '10%' }}>{item.totalPrice}</p></td>
                <td >
                  <button style={{ marginLeft: '0%', backgroundColor: 'red', height: '35px', borderRadius: '10px',color:"white" }} onClick={() => {
                    dispatch(deleteItems(item));
                  }} >Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>TotalPrice:{basketTotalPrice} AZN</h2>
      
    </div>
  );
};

const tableHeaderStyle = {
  background: 'white',
  color: 'black'
}

export default Card