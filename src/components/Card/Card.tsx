import React, { FC } from 'react';
import { BlogSummary } from '../BlogPage/BlogPage';
import './Card.css';

interface CardProps {
  summary: BlogSummary;
}

const Card: FC<CardProps> = (prop:CardProps) => (
  <div className="Card">
    <h2>{prop.summary.title} </h2>
    <h5>Title Description</h5>
    <p>
      Card Component
    </p>
  </div>
);

export default Card;
