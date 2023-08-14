import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  increment,  incrementAsync,  selectCount } from './counterSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="bg-red-300 text-lg text-justify p-2 m-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolorum quod. Vel aspernatur consequuntur nostrum nemo placeat cupiditate perspiciatis excepturi repellat voluptatibus nulla ipsum commodi aut, consectetur eum id? Nam fugit at omnis obcaecati sequi tenetur vel. Vel possimus neque doloremque quidem, asperiores modi eaque.
    </div>
  );
}
