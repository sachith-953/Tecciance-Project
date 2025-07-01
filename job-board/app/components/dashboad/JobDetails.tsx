// components/dashboard/JobDetails.tsx
import dynamic from 'next/dynamic';
import { Job } from '../../lib/types';

const JobDetails = dynamic(() => import('./JobDetailsContent'), {
  loading: () => <p>Loading...</p>,
});

export default JobDetails;