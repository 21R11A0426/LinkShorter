import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Copy, ExternalLink, BarChart2, Loader2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { getLinks, deleteLink } from '../helper/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function LinkTable() {
  const queryClient = useQueryClient();

 
  const { data: links = [], isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const res = await getLinks();
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      toast.success('Link deleted successfully');
 
      queryClient.invalidateQueries(['links']);
    },
    onError: () => {
      toast.error('Failed to delete link');
    }
  });

  
  const confirmDelete = (code, toastId) => {
    toast.dismiss(toastId);
    deleteMutation.mutate(code); 
  };


  const handleDelete = (code) => {
    toast((t) => (
      <div className="flex flex-col gap-3 items-start ">
        <div className="flex items-center gap-2 text-gray-800 font-medium">
          <AlertTriangle size={18} className="text-red-500" />
          <span>Delete <b>{code}</b>?</span>
        </div>
        <div className="flex gap-2 w-full">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmDelete(code, t.id)}
            className="flex-1 px-3 py-1.5 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
      style: {
        background: '#fff',
        color: '#333',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '16px',
        borderRadius: '12px',
      },
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Your Links</h3>
        <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
            {isLoading ? '...' : links.length} Total
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-5 font-semibold">Short Link</th>
              <th className="p-5 font-semibold">Original URL</th>
              <th className="p-5 font-semibold text-center">Clicks</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
                    <p className="text-sm">Loading your links...</p>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {links.map((link) => (
                  <tr key={link.shortCode} className="hover:bg-indigo-50 transition-colors group">
                    <td className="p-5 font-medium">
                      <div className="flex items-center gap-2">
                        <a 
                            href={`http://localhost:8080/${link.shortCode}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-indigo-600 hover:text-[#0b1736] flex items-center gap-1"
                            
                            onClick={() => setTimeout(() => queryClient.invalidateQueries(['links']), 500)}
                        >
                            {link.shortCode} <ExternalLink size={12} className="opacity-50"/>
                        </a>
                      </div>
                    </td>
                    <td className="p-5">
                        <div className="max-w-sm truncate text-gray-500 text-sm" title={link.originalUrl}>
                            {link.originalUrl}
                        </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {link.clicks}
                      </span>
                    </td>
                    <td className="p-5">
                        <div className="flex justify-end gap-2">
                            <button 
                                onClick={() => copyToClipboard(`http://localhost:8080/${link.shortCode}`)} 
                                className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" 
                                title="Copy"
                            >
                                <Copy size={16} />
                            </button>
                            <Link 
                                to={`/code/${link.shortCode}`} 
                                className="p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" 
                                title="Stats"
                            >
                                <BarChart2 size={16} />
                            </Link>
                            <button 
                                onClick={() => handleDelete(link.shortCode)} 
                                className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}

                {!isLoading && links.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <div className="bg-gray-50 p-4 rounded-full mb-3">
                                <ExternalLink size={24} className="opacity-50"/>
                            </div>
                            <p className="text-gray-500 font-medium">No links created yet</p>
                            <p className="text-sm mt-1">Create your first link above to get started.</p>
                        </div>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}