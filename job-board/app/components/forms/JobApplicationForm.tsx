// components/forms/JobApplicationForm.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const jobSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  location: z.string().min(2, 'Location is required'),
  type: z.enum(['remote', 'onsite']),
});

type JobFormData = z.infer<typeof jobSchema>;

const JobApplicationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      await fetch('https://mockapi.io/api/jobs', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      alert('Job application submitted');
    } catch (error) {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('title')} placeholder="Job Title" />
      {errors.title && <p>{errors.title.message}</p>}
      <textarea {...register('description')} placeholder="Description" />
      {errors.description && <p>{errors.description.message}</p>}
      <input {...register('location')} placeholder="Location" />
      {errors.location && <p>{errors.location.message}</p>}
      <select {...register('type')}>
        <option value="remote">Remote</option>
        <option value="onsite">Onsite</option>
      </select>
      <button type="submit">Apply</button>
    </form>
  );
};

export default JobApplicationForm;