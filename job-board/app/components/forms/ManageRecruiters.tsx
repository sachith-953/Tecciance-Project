"use client"
import { useState, useEffect } from 'react';
import { Recruiter } from '../../lib/types/types';

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
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter) => (
            <tr key={recruiter.id}>
              <td>
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
              <td>{recruiter.name}</td>
              <td>{recruiter.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBulkDelete} disabled={!selected.length}>
        Delete Selected
      </button>
    </div>
  );
};

export default ManageRecruiters;