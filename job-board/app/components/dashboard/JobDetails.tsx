
import dynamic from 'next/dynamic';
import { Job } from '../../lib/api/jobs';

const JobDetails = dynamic(() => import('./JobDetailsContent'), {
  loading: () => <p>Loading...</p>,
});

export default JobDetails;


