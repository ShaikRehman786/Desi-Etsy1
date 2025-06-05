



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
//       toast.error(err.response?.data?.message || 'Registration Failed');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-10 p-6 border rounded shadow space-y-4"
//     >
//       <h2 className="text-2xl font-semibold mb-4">Register</h2>

//       <input
//         className="form-control w-full p-2 border rounded"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         required
//       />

//       <input
//         className="form-control w-full p-2 border rounded"
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         required
//       />

//       <input
//         className="form-control w-full p-2 border rounded"
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         required
//       />

//       <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Register
//       </button>
//     </form>
//   );
// }

// export default RegisterPage;


















import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../utils/api';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.post('/auth/register', form);
      toast.success('Registered Successfully');
      navigate('/login');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration Failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md space-y-6 bg-white"
      noValidate
    >
      <h2 className="text-3xl font-semibold text-center">Create an Account</h2>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter a strong password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white font-semibold rounded ${
          isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors`}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default RegisterPage;
