
// 'use client';

// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { setUser } from '../auth/authSlice';
// import { User } from '../../lib/types/types';

// const loginSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// const LoginForm = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       const res = await fetch('https://mockapi.io/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (!res.ok) throw new Error('Login failed');
//       const user: User = await res.json();
//       dispatch(setUser(user));
//       router.push('/dashboard');
//     } catch (error) {
//       alert('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">
//             Email
//           </label>
//           <input
//             id="email"
//             {...register('email')}
//             className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//             placeholder="Enter your email"
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//         </div>
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             {...register('password')}
//             className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
//             placeholder="Enter your password"
//           />
//           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUser } from '../auth/authSlice';
import { User } from '../../lib/types/types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Dummy users for testing
const DUMMY_USERS = [
  {
    id: 1,
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: 2,
    email: 'recruiter@test.com',
    password: 'recruiter123',
    name: 'Recruiter User',
    role: 'recruiter'
  },
  {
    id: 3,
    email: 'candidate@test.com',
    password: 'candidate123',
    name: 'Candidate User',
    role: 'candidate'
  }
];

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const router = useRouter();

  // Mock API call with dummy data
  const mockLogin = async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Use mock login instead of real API
      const user = await mockLogin(data.email, data.password);
      
      dispatch(setUser(user));
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {/* Test Credentials Display */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-semibold mb-2 text-blue-800 dark:text-blue-200">Test Credentials:</h3>
        <div className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
          <div><strong>Admin:</strong> admin@test.com / admin123</div>
          <div><strong>Recruiter:</strong> recruiter@test.com / recruiter123</div>
          <div><strong>Candidate:</strong> candidate@test.com / candidate123</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            {...register('email')}
            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="mt-1 block w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;