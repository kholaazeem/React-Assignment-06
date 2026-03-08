import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: 'Loading...', 
  email: '',
  balance: 0,
  accountNumber: '8821',
  expiryDate: '12/28',
  // Naya: History save karne ke liye khali array
  transactions: [] 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 1. Initial data set karna (Jo humne pehle banaya tha)
    setUserData: (state, action) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions || [];
    },
    
    // 2. DEPOSIT LOGIC
    depositAmount: (state, action) => {
      const amount = Number(action.payload);
      state.balance += amount; // Balance mein amount Plus kardi
      
      // History mein naya record sab se upar (unshift) add kar diya
      state.transactions.unshift({
        id: Date.now(),
        title: 'Money Deposit',
        date: new Date().toLocaleString(),
        amount: `+$${amount.toLocaleString()}`,
        type: 'credit',
        iconType: 'deposit', // Icon pehchanne ke liye
        colorClass: 'icon-green'
      });
    },

    // 3. WITHDRAW LOGIC
    withdrawAmount: (state, action) => {
      const amount = Number(action.payload);
      if (state.balance >= amount) { // Check kiya ke paise hain bhi ya nahi?
        state.balance -= amount; // Balance se Minus kardiya
        
        state.transactions.unshift({
          id: Date.now(),
          title: 'ATM Withdrawal',
          date: new Date().toLocaleString(),
          amount: `-$${amount.toLocaleString()}`,
          type: 'debit',
          iconType: 'withdraw',
          colorClass: 'icon-red'
        });
      }
    },

    // 4. TRANSFER LOGIC
    transferAmount: (state, action) => {
      const { amount, receiver } = action.payload; // Isme amount aur receiver dono aayenge
      const numAmount = Number(amount);
      if (state.balance >= numAmount) {
        state.balance -= numAmount;
        
        state.transactions.unshift({
          id: Date.now(),
          title: `Transfer to ${receiver}`,
          date: new Date().toLocaleString(),
          amount: `-$${numAmount.toLocaleString()}`,
          type: 'debit',
          iconType: 'transfer',
          colorClass: 'icon-orange'
        });
      }
    }
  }
});

// In sab actions ko export kar diya taake Dashboard inko use kar sake
export const { setUserData, depositAmount, withdrawAmount, transferAmount } = userSlice.actions;
export default userSlice.reducer;