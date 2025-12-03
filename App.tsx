import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { EmailPreview } from './components/EmailPreview';
import { ProtestData, GeneratedEmail } from './types';
import { generateProtestEmail } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [emailData, setEmailData] = useState<GeneratedEmail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProtestData) => {
    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateProtestEmail(data);
      setEmailData(generated);
      // Smooth scroll to top of preview (on mobile especially)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmailData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm flex items-start">
             <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
             <div>
               <h3 className="text-sm font-medium text-red-800">Generation Failed</h3>
               <p className="text-sm text-red-700 mt-1">{error}</p>
             </div>
          </div>
        )}

        {!emailData ? (
          <div className="animate-fade-in-up">
            <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    By using this tool, you acknowledge that you will be sending this email from your personal account. 
                    <br className="hidden sm:block"/>
                    We do not store your personal information.
                </p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <EmailPreview emailData={emailData} onReset={handleReset} />
             <div className="mt-8 flex justify-center">
                 <button 
                    onClick={handleReset}
                    className="text-slate-500 hover:text-slate-700 text-sm font-medium underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-all"
                 >
                    Write another email
                 </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;