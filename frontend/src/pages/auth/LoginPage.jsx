
import { useState } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      await login(user, token);

      toast.success('Login Successful');

      if (user.role === 'artisan') {
        navigate('/artisan/dashboard');
      } else {
        navigate('/'); // Redirect customer or other roles to home
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      toast.error('Login Failed');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <input
        className="form-control w-full p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="form-control w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}

export default LoginPage;
