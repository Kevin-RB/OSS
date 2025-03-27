import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosConfig';
import { FieldError } from '../components/field-error';
import { AxiosError } from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        setError(error.response.data?.error);
        return;
      }
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded flex flex-col space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-errormessage='Name error'
            className="w-full p-2 border rounded"
          />
          <FieldError error={error?.["name"]?._errors} />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            aria-errormessage='Email error'
            className="w-full p-2 border rounded"
          />
          <FieldError error={error?.["email"]?._errors} />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            aria-errormessage='Password error'
            className="w-full p-2 border rounded"
          />
          <FieldError error={error?.["password"]?._errors} />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
