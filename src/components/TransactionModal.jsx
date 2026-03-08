import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { LuDownload, LuUpload, LuArrowLeftRight } from 'react-icons/lu';
import './TransactionModal.css';

const TransactionModal = ({ show, handleClose, type, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');

  // Quick amount buttons ka data
  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return; // Error toast hum Dashboard mein handle karenge
    
    if (type === 'Transfer') {
      if (!receiver) return;
      onSubmit({ amount, receiver });
    } else {
      onSubmit(amount);
    }
    
    setAmount('');
    setReceiver('');
    handleClose();
  };

  // Top icon set karne ka logic
  const renderIcon = () => {
    if (type === 'Deposit') return <div className="modal-top-icon deposit-icon"><LuDownload /></div>;
    if (type === 'Withdraw') return <div className="modal-top-icon withdraw-icon"><LuUpload /></div>;
    return <div className="modal-top-icon transfer-icon"><LuArrowLeftRight /></div>;
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="cute-modal">
      <Modal.Body className="p-4 text-center">
        
        {/* Top Icon */}
        {renderIcon()}

        <h4 className="modal-title-custom mb-4">{type} Funds</h4>

        <Form onSubmit={handleSubmit} className="text-start">
          
          {type === 'Transfer' && (
            <Form.Group className="mb-4">
              <Form.Label className="cute-label">Receiver's Account / Email</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="john@example.com" 
                value={receiver} 
                onChange={(e) => setReceiver(e.target.value)}
                className="cute-input"
                required 
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="cute-label">Amount ($)</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="cute-input"
              required 
            />
          </Form.Group>

          {/* Quick Amount Buttons (Sirf Deposit/Withdraw ke liye) */}
          {type !== 'Transfer' && (
            <div className="quick-amounts-container mb-4">
              {quickAmounts.map((amt) => (
                <button 
                  key={amt} 
                  type="button" 
                  className="quick-amount-btn"
                  onClick={() => setAmount(amt)}
                >
                  ${amt}
                </button>
              ))}
            </div>
          )}

          <button type="submit" className="cute-submit-btn w-100">
            {type === 'Transfer' ? 'Send Money' : type}
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;