import React, { useState } from 'react';
import { ProtestData, ConcernType } from '../types';
import { Loader2, Send, MapPin, User } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: ProtestData) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);

  const handleConcernToggle = (concern: string) => {
    setConcerns(prev => 
      prev.includes(concern) 
        ? prev.filter(c => c !== concern) 
        : [...prev, concern]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !neighborhood || concerns.length === 0) return;
    onSubmit({ name, neighborhood, concerns });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="name"
                required
                className="pl-10 block w-full rounded-lg border-slate-300 border bg-slate-50 py-3 px-4 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="neighborhood" className="block text-sm font-medium text-slate-700">
              Neighborhood / Community
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="neighborhood"
                required
                className="pl-10 block w-full rounded-lg border-slate-300 border bg-slate-50 py-3 px-4 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="e.g. Homestead at Old Settlers Park"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Primary Concerns (Select at least one)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(ConcernType).map((concern) => (
              <label
                key={concern}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  concerns.includes(concern)
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={concerns.includes(concern)}
                  onChange={() => handleConcernToggle(concern)}
                />
                <span className="ml-3 text-sm font-medium text-slate-700">{concern}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !name || !neighborhood || concerns.length === 0}
          className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01]"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Drafting Email...
            </>
          ) : (
            <>
              Generate Protest Email
              <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};