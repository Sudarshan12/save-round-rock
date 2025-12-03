import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pb-12 pt-8 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-bold tracking-tight text-white">Protect Round Rock</h1>
            </div>
            <p className="text-slate-300 max-w-xl text-lg">
              Make your voice heard. Generate a personalized email to the City Council opposing the proposed datacenter in our neighborhood.
            </p>
          </div>
          <div className="flex-shrink-0">
             <a 
               href="https://protectroundrock.org/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors border border-slate-600 font-medium text-sm"
             >
               Visit Campaign Site
               <ExternalLink className="w-4 h-4" />
             </a>
          </div>
        </div>
      </div>
    </header>
  );
};