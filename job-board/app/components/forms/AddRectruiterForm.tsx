// components/forms/AddRecruiterForm.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const recruiterSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type RecruiterFormData = z.infer<typeof recruiterSchema>;

const AddRecruiterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RecruiterFormData>({
    resolver: zodResolver(recruiterSchema),
  });

  const onSubmit = async (data: RecruiterFormData) => {
    try {
      await fetch('https://mockapi.io/api/recruiters', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      alert('Recruiter added');
    } catch (error) {
      alert('Failed to add recruiter');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}
      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Add Recruiter</button>
    </form>
  );
};