import React from 'react';

// Props (text, onClick, className) ka matlab hai hum is button ko alag alag kaam aur style de sakte hain
const CustomButton = ({ text, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`custom-btn ${className}`} // custom-btn humari base class hai, className wo hai jo hum bahir se pass karenge
    >
      {text}
    </button>
  );
};

export default CustomButton;