
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createLink } from '../helper/api';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateLinkForm() { 
  const [formData, setFormData] = useState({ url: '' });
  const [error, setError] = useState('');
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
     
      setFormData({ url: ''});
      toast.success('Link created successfully!');
      setError('');
      
      queryClient.invalidateQueries(['links']);
    },
    onError: (err) => {
      const msg = err.response?.data?.error || 'Failed to create link';
      setError(msg);
      toast.error(msg);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Create New Link</h2>
        <p className="text-gray-500 text-sm mt-1">Paste your long URL to create a short, shareable link.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="grow">
          <label className="block text-s font-medium text-gray-700 mb-1 ml-1">DESTINATION URL</label>
          <input
            type="url"
            placeholder="https://very-long-url.com/..."
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
          />
        </div>
      
        <div className="flex items-end">
            <button 
                disabled={mutation.isPending}
                className="h-[50px] w-full md:w-auto bg-[#ee6123] text-white px-8 py-3 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Creating...</span>
                  </>
                ) : (
                  'Shorten URL'
                )}
            </button>
        </div>
      </form>
    </div>
  );
}