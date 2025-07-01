import JobForm from '../components/forms/JobForm';

export default function Apply() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Apply for a Job</h2>
      <JobForm isApplication={true} />
    </div>
  );
}