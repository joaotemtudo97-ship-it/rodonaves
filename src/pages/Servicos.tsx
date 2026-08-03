import React from 'react';
import { ArrowLeft, Truck, Package, Plane, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Servicos() {
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
          <h1 className="text-4xl md:text-5xl font-black text-[#004a99] uppercase tracking-tight mb-6">Nossos Serviços</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Da coleta à entrega final, oferecemos um portfólio completo de soluções logísticas para conectar você aos seus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex gap-6 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-8 h-8 text-[#004a99]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-2">Carga Fracionada</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                A modalidade ideal para envio de pequenos e médios volumes. Sua carga compartilha o espaço do veículo, garantindo custos reduzidos e agilidade através da nossa malha viária otimizada.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex gap-6 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-8 h-8 text-[#004a99]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-2">Carga Lotação</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Veículos exclusivos para grandes remessas. A viagem ocorre direto da origem ao destino, sem paradas em centros de distribuição intermediários, garantindo máxima velocidade.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex gap-6 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Plane className="w-8 h-8 text-[#004a99]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-2">RodoAéreo</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Integração inteligente entre transporte rodoviário e modal aéreo para entregas urgentes ou de longa distância, garantindo o menor tempo de trânsito possível.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex gap-6 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-8 h-8 text-[#004a99]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-2">Logística Reversa</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Processos eficientes e rastreáveis para o retorno de mercadorias, trocas de e-commerce e devoluções, garantindo satisfação para seus clientes.
              </p>
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
