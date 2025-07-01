'use client';

import { useState, useEffect } from 'react';
import { Recruiter } from '../lib/types';

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      const res = await fetch('https://mockapi.io/api/recruiters');
      const data = await res.json();
      setRecruiters(data);
    };
    fetchRecruiters();
  }, []);

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          fetch(`https://mockapi.io/api/recruiters/${id}`, { method: 'DELETE' })
        )
      );
      setRecruiters(recruiters.filter((r) => !selected.includes(r.id)));
      setSelected([]);
    } catch (error) {
      alert('Failed to delete recruiters');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Recruiters</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Select</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter) => (
            <tr key={recruiter.id} className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selected.includes(recruiter.id)}
                  onChange={() =>
                    setSelected(
                      selected.includes(recruiter.id)
                        ? selected.filter((id) => id !== recruiter.id)
                        : [...selected, recruiter.id]
                    )
                  }
                />
              </td>
              <td className="p-2">{recruiter.name}</td>
              <td className="p-2">{recruiter.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleBulkDelete}
        disabled={!selected.length}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
      >
        Delete Selected
      </button>
    </div>
  );
};

export default ManageRecruiters;