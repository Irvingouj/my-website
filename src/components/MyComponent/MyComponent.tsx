import React, { FC } from 'react';
import './MyComponent.css';

interface MyComponentProps {}

const MyComponent: FC<MyComponentProps> = () => (
  <div className="MyComponent">
    MyComponent Component
  </div>
);

export default MyComponent;
