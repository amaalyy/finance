// Card.jsx
import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2>{title}</h2>
      </div>
      <div style={styles.cardContent}>{children}</div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  cardContent: {
    padding: '16px',
  },
};

export default Card;
