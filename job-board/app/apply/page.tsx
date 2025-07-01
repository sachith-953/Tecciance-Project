
'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import JobForm from '../components/forms/JobForm';
import { RootState } from '../store';

export default function Apply() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'candidate') {
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'candidate') return null;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Apply for a Job</h2>
      <JobForm isApplication={true} />
    </div>
  );
}