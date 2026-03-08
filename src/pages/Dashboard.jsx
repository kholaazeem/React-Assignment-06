import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient'; // Asli Backend DB Import ki

import { useSelector, useDispatch } from 'react-redux'; 
import { depositAmount, withdrawAmount, transferAmount, setUserData } from '../redux/userSlice'; 
import TransactionModal from '../components/TransactionModal'; 

import toast, { Toaster } from 'react-hot-toast';

import { LuBell, LuSearch, LuPlus, LuDownload, LuUpload, LuRefreshCcw, LuSettings, LuMenu, LuX, LuBriefcase, LuLogOut } from 'react-icons/lu';
import './Dashboard.css';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 

  const [historyFilter, setHistoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // === LOGOUT FUNCTIONALITY ===
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(setUserData({ fullName: '', email: '', balance: 0, transactions: [] }));
      toast.success('Logged out successfully!', { position: 'bottom-right' });
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out!', { position: 'bottom-right' });
    }
  };

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // === ASLI DATABASE TRANSACTION LOGIC ===
  const handleTransactionSubmit = async (data) => {
    try {
      // 1. Current user ki ID get karo
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !authData.user) throw new Error("User not authenticated");
      const userId = authData.user.id;

      let currentBalance = Number(user.balance);

      if (modalType === 'Deposit') {
        const amount = Number(data);
        const newBalance = currentBalance + amount;

        // DB Update: Balance
        const { error: balanceErr } = await supabase.from('users').update({ balance: newBalance }).eq('user_id', userId);
        if (balanceErr) throw balanceErr;

        // DB Update: Transaction History Insert
        const { error: trxErr } = await supabase.from('transactions').insert([{
          user_id: userId,
          title: 'Money Deposit',
          amount: amount,
          type: 'credit'
        }]);
        if (trxErr) throw trxErr;

        // Redux Update (UI foran change hogi)
        dispatch(depositAmount(amount));
        toast.success(`$${amount} deposited successfully!`, { position: 'bottom-right', style: { background: '#333', color: '#fff' } });

      } else if (modalType === 'Withdraw') {
        const amount = Number(data);
        if (amount > currentBalance) return toast.error("Insufficient Balance!", { position: 'bottom-right' });

        const newBalance = currentBalance - amount;

        // DB Update: Balance
        await supabase.from('users').update({ balance: newBalance }).eq('user_id', userId);
        
        // DB Update: Transaction Insert
        await supabase.from('transactions').insert([{
          user_id: userId,
          title: 'ATM Withdrawal',
          amount: amount,
          type: 'debit'
        }]);

        // Redux Update
        dispatch(withdrawAmount(amount));
        toast.success(`$${amount} withdrawn successfully!`, { position: 'bottom-right', style: { background: '#333', color: '#fff' } });

      } else if (modalType === 'Transfer') {
        const amount = Number(data.amount);
        if (amount > currentBalance) return toast.error("Insufficient Balance!", { position: 'bottom-right' });

        const newBalance = currentBalance - amount;

        // DB Update: Balance
        await supabase.from('users').update({ balance: newBalance }).eq('user_id', userId);
        
        // DB Update: Transaction Insert
        await supabase.from('transactions').insert([{
          user_id: userId,
          title: `Transfer to ${data.receiver}`,
          amount: amount,
          type: 'debit'
        }]);

        // Redux Update
        dispatch(transferAmount(data));
        toast.success(`$${amount} sent to ${data.receiver}!`, { position: 'bottom-right', style: { background: '#333', color: '#fff' } });
      }
    } catch (error) {
      toast.error(error.message || "Transaction Failed", { position: 'bottom-right' });
    }
  };

  // Dynamic Formatting for Database data vs Redux dummy data
  const formatAmount = (amount, type) => {
    const num = Number(amount);
    if (isNaN(num)) return amount; // Agar purana string format ho
    return `${type === 'credit' ? '+' : '-'}$${num.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  };

  const getTrxIcon = (title) => {
    const t = title?.toLowerCase() || '';
    if (t.includes('deposit')) return { icon: <LuDownload />, colorClass: 'icon-green' };
    if (t.includes('withdraw')) return { icon: <LuUpload />, colorClass: 'icon-red' };
    if (t.includes('transfer')) return { icon: <LuRefreshCcw />, colorClass: 'icon-orange' };
    return { icon: <LuSearch />, colorClass: 'icon-blue' };
  };

  const filteredTransactions = user.transactions?.filter((trx) => {
    const matchesFilter = historyFilter === 'All' || trx.type.toLowerCase() === historyFilter.toLowerCase();
    const matchesSearch = trx.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  return (
    <div className="dashboard-page">
      <Toaster />

      {/* === TOP NAVBAR === */}
      <nav className="dash-navbar position-relative">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="dash-brand">
            <div className="dash-logo-circle">NB</div>
            <span className="dash-brand-text">NeoBank</span>
          </div>
          <div className="dash-nav-links d-none d-md-flex">
            <span className="active-link">Dashboard</span>
            <span>Analytics</span>
            <span>Transfer</span>
          </div>
          <div className="dash-nav-right">
            <div className="dash-search d-none d-sm-flex">
              <LuSearch className="search-icon" />
              <input type="text" placeholder="Search transactions..." />
            </div>
            <LuBell className="bell-icon" />
            <div className="user-profile">
              <div className="user-info d-none d-sm-block text-end me-2">
                <h6 className="user-name">{user.fullName || 'Loading...'}</h6>
                <p className="user-type">PREMIUM MEMBER</p>
              </div>
              <img src={`https://ui-avatars.com/api/?name=${user.fullName}&background=0F172A&color=fff`} alt="User" className="user-avatar" />
            </div>
            {/* LOGOUT ICON */}
            <div 
              className="logout-icon d-none d-md-flex ms-3 align-items-center justify-content-center" 
              onClick={handleLogout}
              style={{ cursor: 'pointer', background: '#FEE2E2', width: '38px', height: '38px', borderRadius: '50%' }}
              title="Logout"
            >
              <LuLogOut size={18} color="#DC2626" />
            </div>
            {/* Hamburger Icon */}
            <div className="hamburger-icon d-md-none ms-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <LuX size={24} color="#0F172A" /> : <LuMenu size={24} color="#0F172A" />}
            </div>
          </div>
        </Container>
        {isMobileMenuOpen && (
          <div className="mobile-dropdown d-md-none">
            <span className="active-link">Dashboard</span>
            <span>Analytics</span>
            <span>Transfer</span>
            <div className="mobile-search mt-3 mb-2">
              <LuSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <span className="text-danger mt-2 pt-3 border-top d-flex align-items-center" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <LuLogOut className="me-2" size={20} /> Logout
            </span>
          </div>
        )}
      </nav>

      {/* === MAIN CONTENT === */}
      <Container className="mt-4">
        
        {/* HERO BALANCE CARD */}
        <div className="balance-hero-card">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <p className="balance-label">TOTAL AVAILABLE BALANCE <span className="growth-badge">+12.39%</span></p>
              <h1 className="balance-amount">${Number(user.balance).toLocaleString('en-US', {minimumFractionDigits: 2})}</h1>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end hero-bottom-section">
            <div className="d-flex gap-4 account-details-group">
              <div>
                <p className="card-detail-label">ACCOUNT NUMBER</p>
                <p className="card-detail-val">**** **** **** {user.accountNumber || '8821'}</p>
              </div>
              <div>
                <p className="card-detail-label">EXPIRY DATE</p>
                <p className="card-detail-val">{user.expiryDate || '12/28'}</p>
              </div>
            </div>
            <div className="hero-card-buttons">
              <button className="add-funds-btn" onClick={() => handleOpenModal('Deposit')}><LuPlus /> Add Funds</button>
              <button className="details-btn">Details</button>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS & TRANSACTIONS */}
        <Row className="mt-4 g-4">
          <Col lg={4}>
            <h5 className="section-title mb-3">Quick Actions</h5>
            <div className="quick-actions-grid mb-4">
              <div className="action-card" onClick={() => handleOpenModal('Deposit')}><LuDownload className="action-icon" /><span>Deposit</span></div>
              <div className="action-card" onClick={() => handleOpenModal('Withdraw')}><LuUpload className="action-icon" /><span>Withdraw</span></div>
              <div className="action-card" onClick={() => handleOpenModal('Transfer')}><LuRefreshCcw className="action-icon" /><span>Transfer</span></div>
              <div className="action-card"><LuSettings className="action-icon" /><span>Settings</span></div>
            </div>

            <div className="expenses-card mb-4">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div><p className="expenses-label">WEEKLY EXPENSES</p><h3 className="expenses-amount">$1,240.50</h3></div>
                <div className="expenses-limit text-end"><h4>64%</h4><p>OF LIMIT</p></div>
              </div>
              <div className="graph-line"></div>
            </div>

            <div className="d-flex gap-3">
              <div className="goal-card w-100">
                <div className="d-flex justify-content-between mb-2"><div className="goal-icon icon-blue"><LuDownload /></div><div className="goal-plus"><LuPlus /></div></div>
                <p className="goal-label">SAVINGS</p><h5 className="goal-amount">$8,400</h5>
              </div>
              <div className="goal-card w-100">
                <div className="d-flex justify-content-between mb-2"><div className="goal-icon icon-purple"><LuBriefcase /></div><div className="goal-plus"><LuPlus /></div></div>
                <p className="goal-label">TRAVEL GOAL</p><h5 className="goal-amount">$2,150</h5>
              </div>
            </div>
          </Col>

          {/* === TRANSACTIONS HISTORY TABLE === */}
          <Col lg={8}>
            <div className="transactions-panel">
              <h4 className="history-main-title mb-4">Transaction History</h4>
              
              <div className="history-controls mb-4">
                <div className="history-search">
                  <LuSearch className="search-icon" />
                  <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="history-tabs">
                  <button className={historyFilter === 'All' ? 'active' : ''} onClick={() => setHistoryFilter('All')}>All</button>
                  <button className={historyFilter === 'credit' ? 'active' : ''} onClick={() => setHistoryFilter('credit')}>Credit</button>
                  <button className={historyFilter === 'debit' ? 'active' : ''} onClick={() => setHistoryFilter('debit')}>Debit</button>
                </div>
              </div>

              <div className="history-table-header">
                <div className="col-date">Date</div>
                <div className="col-desc">Description</div>
                <div className="col-ref">Reference</div>
                <div className="col-type">Type</div>
                <div className="col-amt text-end">Amount</div>
              </div>

              <div className="history-table-body">
                {filteredTransactions.length === 0 ? (
                  <p className="text-center text-muted py-4">No transactions found.</p>
                ) : (
                  filteredTransactions.map((trx) => {
                    const uiStyle = getTrxIcon(trx.title);
                    return (
                      <div className="history-row" key={trx.id || Math.random()}>
                        <div className="col-date text-muted">
                          {trx.created_at ? new Date(trx.created_at).toLocaleDateString() : (trx.date ? trx.date.split(',')[0] : 'Today')}
                        </div>
                        <div className="col-desc fw-bold d-flex align-items-center gap-2">
                          <span className={`type-badge d-md-none ${uiStyle.colorClass}`} style={{padding: '2px 6px'}}>{uiStyle.icon}</span>
                          {trx.title}
                        </div>
                        <div className="col-ref text-muted">TXN-{(trx.id || '0000').toString().slice(-4)}</div>
                        <div className="col-type">
                          <span className={`type-badge ${trx.type === 'credit' ? 'badge-credit' : 'badge-debit'}`}>
                            {trx.type.charAt(0).toUpperCase() + trx.type.slice(1)}
                          </span>
                        </div>
                        <div className={`col-amt text-end fw-bold ${trx.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                          {formatAmount(trx.amount, trx.type)}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <TransactionModal show={showModal} handleClose={() => setShowModal(false)} type={modalType} onSubmit={handleTransactionSubmit} />
    </div>
  );
};

export default Dashboard;