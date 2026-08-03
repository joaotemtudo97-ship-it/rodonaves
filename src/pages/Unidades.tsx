import React from 'react';
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Unidades() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-3xl font-black tracking-tighter italic leading-none text-[#004a99]">
              RODONAVES<span className="text-[#ffcc00]">.</span>
            </h1>
          </div>
          <button onClick={() => navigate('/')} className="text-[#004a99] font-bold text-sm flex items-center gap-2 uppercase tracking-wider hover:text-[#003a7a] transition-colors">
            <ArrowLeft className="w-4 h-4"/> Voltar
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#004a99] uppercase tracking-tight mb-6">Nossas Unidades</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Com mais de 300 unidades espalhadas estrategicamente, estamos sempre perto para garantir a excelência no transporte das suas encomendas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ffcc00]"></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-4">Matriz - Ribeirão Preto (SP)</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#004a99] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Rua General Augusto Soares dos Santos, 550<br />
                  Parque Industrial Lagoinha<br />
                  CEP: 14095-240 - Ribeirão Preto, SP
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#004a99] shrink-0" />
                <p className="text-sm font-bold text-slate-700">(16) 2101-9999</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#004a99] shrink-0" />
                <p className="text-sm font-medium text-slate-600">atendimento.matriz@rodonaves.com.br</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#004a99]"></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-4">Filial - São Paulo (SP)</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#004a99] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Rodovia Presidente Dutra, Km 222<br />
                  Parque Novo Mundo<br />
                  CEP: 02181-000 - São Paulo, SP
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#004a99] shrink-0" />
                <p className="text-sm font-bold text-slate-700">(11) 2145-8000</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#004a99] shrink-0" />
                <p className="text-sm font-medium text-slate-600">sp@rodonaves.com.br</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#004a99]"></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-4">Filial - Campinas (SP)</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#004a99] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Rodovia Anhanguera, Km 104<br />
                  Condomínio Techno Park<br />
                  CEP: 13069-310 - Campinas, SP
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#004a99] shrink-0" />
                <p className="text-sm font-bold text-slate-700">(19) 3725-7000</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#004a99]"></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-wide mb-4">Filial - Curitiba (PR)</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#004a99] shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Rua Hasdrubal Bellegard, 1010<br />
                  Cidade Industrial de Curitiba (CIC)<br />
                  CEP: 81460-120 - Curitiba, PR
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#004a99] shrink-0" />
                <p className="text-sm font-bold text-slate-700">(41) 3314-5555</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs font-medium">
          © {new Date().getFullYear()} Rodonaves Transportes e Encomendas Ltda. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
