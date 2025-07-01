
import { Job } from '../dashboad/JobCard';
import Link from 'next/link';

const JobCard = ({ job }: { job: Job }) => (
  <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold">{job.title}</h3>
    <p className="text-sm text-gray-600">{job.description}</p>
    <p className="text-sm">{job.location} - {job.type}</p>
    <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
      View Details
    </Link>
  </div>
);

export default JobCard;