


import { useState } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify'; // 👈 Import Toastify

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      await login(user, token);

      toast.success('Login Successful'); // ✅ Show toast

      if (user.role === 'artisan') {
        navigate('/artisan/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      toast.error('Login Failed'); // ✅ Show error toast
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

      <select
        className="form-control w-full p-2 border rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        disabled
        title="Role is set by the backend and cannot be changed here"
      >
        <option value="customer">Customer</option>
        <option value="artisan">Artisan</option>
      </select>

      <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}

export default LoginPage;



































// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import API from '../../utils/api';

// function RegisterPage() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/auth/register', form);
//       toast.success('Registered Successfully');
//       navigate('/login');
//     } catch (err) {
//       toast.error('Registration Failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input
//         className="form-control my-2"
//         placeholder="Name"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         required
//       />
//       <input
//         className="form-control my-2"
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         required
//       />
//       <input
//         className="form-control my-2"
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         required
//       />
//       <button className="btn btn-primary">Register</button>
//     </form>
//   );
// }

// export default RegisterPage;
