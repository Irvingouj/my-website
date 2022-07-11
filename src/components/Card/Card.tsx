import React, { FC } from 'react';
import './Card.css';

interface CardProps {}

const Card: FC<CardProps> = () => (
  <div className="Card">
    <h2>Title </h2>
    <h5>Title Description</h5>
    <p>
      Card Component
    </p>
  </div>
);

export default Card;
