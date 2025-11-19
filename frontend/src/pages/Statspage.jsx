import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLinkStats } from '../helper/api';
import { ArrowLeft, Clock, MousePointer, Link as LinkIcon, ScissorsLineDashed } from 'lucide-react';

export default function StatsPage() {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getLinkStats(code);
        setStats(res.data);
      } catch (err) {
        setError('Link not found');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [code]);

  if (loading) return <div className="text-center p-10">Loading stats...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      
      <Link to="/" className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
        <ArrowLeft size={20} className="mr-2"/> Back to Dashboard
      </Link>

      <div className="bg-[#0b1736] shadow-lg rounded-xl p-8 border border-[#ee6123]">
                     <h1 className="text-3xl font-extrabold text-[#ee6123] tracking-tight flex items-center gap-3">
                <span className=" text-[#ee6123]">
                  
                    <ScissorsLineDashed size={32} strokeWidth={2.5} /> 
                </span>
                TinyLink
            </h1>
        <div className="flex items-center justify-between mb-6">
            
            <h1 className="text-2xl font-bold text-white">Link Statistics</h1>
            <span className="text-3xl font-mono text-indigo-600 tracking-wider">{stats.shortCode}</span>
        </div>
        
        <div className="space-y-6">

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-500 mb-2 text-sm uppercase font-bold tracking-wide">
                <LinkIcon size={16} className="mr-2"/> Target URL
            </div>
            <a href={stats.originalUrl} target="_blank" rel="noreferrer" className="text-blue-600 break-all hover:underline">
                {stats.originalUrl}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg text-center">
                <div className="flex justify-center items-center text-indigo-400 mb-2">
                    <MousePointer size={24} />
                </div>
                <div className="text-3xl font-bold text-indigo-700">{stats.clicks}</div>
                <div className="text-sm text-indigo-500 font-medium">Total Clicks</div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg text-center">
                 <div className="flex justify-center items-center text-orange-400 mb-2">
                    <Clock size={24} />
                </div>
                <div className="text-lg font-bold text-gray-800 mt-1">
                    {stats.lastClickedAt ? new Date(stats.lastClickedAt).toLocaleDateString() : 'Never'}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                    {stats.lastClickedAt ? new Date(stats.lastClickedAt).toLocaleTimeString() : ''}
                </div>
                <div className="text-sm text-orange-500 font-medium mt-1">Last Clicked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}