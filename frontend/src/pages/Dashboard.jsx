import { ScissorsLineDashed } from 'lucide-react';
import CreateLinkForm from '../components/CreateLinkForm';
import LinkTable from '../components/LinkTable';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0b1736]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="mb-8">
             <h1 className="text-3xl font-extrabold text-[#ee6123] tracking-tight flex items-center gap-3">
                <span className=" text-[#ee6123]">
                
                    <ScissorsLineDashed size={32} strokeWidth={2.5} /> 
                </span>
                TinyLink
            </h1>
        </div>

      
        <CreateLinkForm />
        <LinkTable />
        
      </div>
    </div>
  );
}