import React from 'react';
import { Database, Key, Copy, CheckCircle2 } from 'lucide-react';

export function SetupSupabase() {
  const [copied, setCopied] = React.useState(false);
  const sql = `-- Execute este script no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS public.packages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_code text UNIQUE NOT NULL,
  sender_name text NOT NULL,
  sender_city text NOT NULL,
  sender_cep text NOT NULL,
  recipient_name text NOT NULL,
  recipient_city text NOT NULL,
  recipient_cep text NOT NULL,
  weight numeric NOT NULL,
  posted_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.package_updates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id uuid REFERENCES public.packages(id) ON DELETE CASCADE,
  status text NOT NULL,
  location text NOT NULL,
  scheduled_for timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access to packages" ON public.packages FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access to packages" ON public.packages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous read access to package_updates" ON public.package_updates FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access to package_updates" ON public.package_updates FOR INSERT TO anon WITH CHECK (true);
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-700 text-white flex items-center gap-3">
          <Database className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Configuração do Supabase Necessária</h1>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800 flex items-center gap-2 mb-2">
              <Key className="w-5 h-5" />
              1. Variáveis de Ambiente
            </h2>
            <p className="text-sm text-yellow-700 mb-2">
              Para persistir os dados, você precisa adicionar suas credenciais do Supabase. 
              Vá nas <strong>Configurações do App (Settings)</strong> &gt; <strong>Secrets</strong> e adicione:
            </p>
            <ul className="list-disc pl-5 text-sm text-yellow-700 font-mono">
              <li>VITE_SUPABASE_URL</li>
              <li>VITE_SUPABASE_ANON_KEY</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              2. Tabelas do Banco de Dados
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Acesse o painel do Supabase, vá em <strong>SQL Editor</strong> e execute o script abaixo:
            </p>
            
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{sql}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                title="Copiar SQL"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
