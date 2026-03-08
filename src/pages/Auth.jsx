import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient'; 
import Swal from 'sweetalert2'; // SweetAlert import kiya
import './Auth.css';

import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
     // === LOGIN LOGIC ===
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        // LOGIN HONE KE BAAD: Supabase ki 'users' table se is user ka balance aur naam mangwao
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', authData.user.id)
          .single(); // Single ka matlab sirf 1 user ka data do

        if (profileError) throw profileError;

        // REDUX MAGIC: Asli data Redux ke Store Room mein bhej do (Dispatch)
        dispatch(setUserData({
          fullName: profileData.full_name,
          email: profileData.email,
          balance: profileData.balance || 0,
          accountNumber: '8821', // Isey abhi dummy chhor dein
        }));

        // User ki transactions bhi fetch karo
const { data: userTransactions, error: trxError } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', authData.user.id)
  .order('created_at', { ascending: false }); // Sab se nayi upar

// Phir Redux ko bhejo (dispatch karo)
dispatch(setUserData({
  fullName: profileData.full_name,
  email: profileData.email,
  balance: profileData.balance || 0,
  transactions: userTransactions || [] // DB wali history Redux mein daal di
}));
        
        // Login Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: `Welcome ${profileData.full_name}!`, // Asli naam alert mein bhi aayega
          confirmButtonColor: '#00B4D8',
          background: '#FAFCFF',
          color: '#0F172A'
        }).then(() => {
          navigate('/dashboard'); 
        });

      } else {
        // === SIGN UP LOGIC ===
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match!");
        }

        // 1. Supabase Auth mein user create karo
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.fullName }
          }
        });

        if (authError) throw authError;

        // 2. Custom 'users' table mein data save karo
        if (authData.user) {
          const { error: dbError } = await supabase
            .from('users')
            .insert([
              {
                user_id: authData.user.id, // Auth wali ID yahan link ki
                full_name: formData.fullName,
                email: formData.email,
                // balance column default 0 utha lega
              }
            ]);

          if (dbError) throw dbError;
        }
        
        // Sign Up Success Alert
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'Registration successful! Ab aap sign in kar sakte hain.',
          confirmButtonColor: '#00B4D8',
          background: '#FAFCFF',
          color: '#0F172A'
        });
        
        setIsLogin(true); // Form ko wapas login par le jao
        
        // Fields clear kar do
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      // Dono (Login/Signup) ke errors yahan aayenge
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
        confirmButtonColor: '#0F172A', // Dark color for error button
        background: '#FAFCFF',
        color: '#0F172A'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="auth-card slide-up">
          
          <div className="auth-logo">NB</div>

          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to your account' : 'Start your banking journey'}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Alex Johnson" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between">
                <label>Password</label>
                {isLogin && <a href="#" className="forgot-link">Forgot Password?</a>}
              </div>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
            </button>
          </form>

          <div className="auth-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); // Form switch hone par clear karna zaroori ha
            }}>
              {isLogin ? 'Create Account' : 'Sign In'}
            </span>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Auth;