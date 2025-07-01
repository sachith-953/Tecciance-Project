
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

const JobForm = ({ isApplication = false }: { isApplication?: boolean }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      await fetch('https://mockapi.io/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      alert(isApplication ? 'Application submitted' : 'Job posted');
    } catch (error) {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Job Title</label>
        <input
          id="title"
          {...register('title')}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Enter job title"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Enter job description"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium">Location</label>
        <input
          id="location"
          {...register('location')}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Enter location"
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium">Type</label>
        <select id="type" {...register('type')} className="mt-1 block w-full p-2 border rounded">
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isApplication ? 'Apply' : 'Post Job'}
      </button>
    </form>
  );
};

export default JobForm;