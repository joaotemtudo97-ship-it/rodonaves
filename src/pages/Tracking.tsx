import React, { useState, useEffect } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle2, Clock, ChevronRight, Phone, Mail, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSearchParams } from 'react-router-dom';

interface PackageData {
  id: string;
  tracking_code: string;
  sender_name: string;
  sender_city: string;
  sender_cep: string;
  recipient_name: string;
  recipient_city: string;
  recipient_cep: string;
  weight: number;
  posted_at: string;
}

interface PackageUpdate {
  id: string;
  status: string;
  location: string;
  scheduled_for: string;
}

export function Tracking() {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [updates, setUpdates] = useState<PackageUpdate[]>([]);

  useEffect(() => {
    if (initialCode) {
      performSearch(initialCode);
    }
  }, [initialCode]);

  const performSearch = async (trackingCode: string) => {
    if (!trackingCode.trim() || !supabase) return;

    setLoading(true);
    setError('');
    setPkg(null);
    setUpdates([]);

    try {
      const { data: pkgData, error: pkgError } = await supabase
        .from('packages')
        .select('*')
        .eq('tracking_code', trackingCode.trim().toUpperCase())
        .single();

      if (pkgError || !pkgData) {
        throw new Error('Encomenda não encontrada. Verifique o código e tente novamente.');
      }

      // Fetch ALL updates for this package, ordered chronologically
      const { data: updatesData, error: updatesError } = await supabase
        .from('package_updates')
        .select('*')
        .eq('package_id', pkgData.id)
        .order('scheduled_for', { ascending: true });

      if (updatesError) throw updatesError;

      setPkg(pkgData);
      setUpdates(updatesData || []);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao buscar a encomenda.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(code);
  };

  const getStatusIcon = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('entregue')) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (s.includes('saiu')) return <Truck className="w-5 h-5 text-[#004a99]" />;
    return <MapPin className="w-5 h-5 text-[#004a99]" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => window.location.href='/'}>
            <h1 className="text-[27px] sm:text-3xl font-black tracking-tighter italic leading-none text-[#004a99]">
              RODONAVES<span className="text-[#ffcc00]">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Logística & Transportes</p>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 font-bold text-[11px] uppercase tracking-[0.13em] text-[#004a99]">
            <a href="/para-voce" className="hover:text-[#ffcc00] transition-colors">Para Você</a>
            <a href="/para-empresa" className="hover:text-[#ffcc00] transition-colors">Para sua Empresa</a>
            <a href="/servicos" className="hover:text-[#ffcc00] transition-colors">Serviços</a>
            <a href="/unidades" className="hover:text-[#ffcc00] transition-colors">Unidades</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#003b7b] via-[#004a99] to-[#075db5] pt-16 sm:pt-20 pb-32 sm:pb-36">
          {/* Elementos gráficos discretos: sem fotografia ou banner na página inicial */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full border border-white/10"></div>
            <div className="absolute -top-20 -right-8 h-56 w-56 rounded-full border border-white/10"></div>
            <div className="absolute -bottom-44 -left-24 h-96 w-96 rounded-full border border-white/10"></div>
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ffcc00]"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.18em] text-blue-50 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#ffcc00]"></span>
              Acompanhamento de encomendas
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-white uppercase tracking-tight leading-[1.08] mb-5">
              Sua carga no <span className="text-[#ffcc00]">caminho certo</span>
            </h2>
            <p className="text-blue-100 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Consulte o andamento da sua encomenda de forma simples, rápida e segura.
            </p>
          </div>
        </section>

        {/* Search & Results Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-20 pb-24">
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_18px_55px_rgba(15,45,85,0.13)] border border-slate-100 p-5 sm:p-8 mb-8">
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Onde está sua encomenda?</h3>
              <p className="text-sm text-slate-500 mt-1">Informe o código de rastreamento para consultar as movimentações.</p>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="DIGITE SEU CÓDIGO EX: RDN..."
                  className="w-full pl-14 pr-4 py-4 md:py-[18px] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#004a99] focus:ring-4 focus:ring-blue-100 transition-all text-base sm:text-lg font-bold text-slate-900 placeholder:text-slate-400 uppercase tracking-wider"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="bg-[#004a99] hover:bg-[#003a7a] disabled:opacity-70 text-white px-8 py-4 md:py-[18px] rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-3 shrink-0 shadow-lg shadow-blue-900/20"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Rastrear
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                {error}
              </div>
            )}
          </div>

        {/* Results Section */}
        {pkg && (
          <div className="mt-12 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Detalhes do Rastreamento</h3>
                  <p className="text-3xl font-black text-slate-900 tracking-tight">{pkg.tracking_code}</p>
                  <p className="text-sm font-bold text-slate-500 mt-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> 
                    Postado em: {format(parseISO(pkg.posted_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {updates.length > 0 && (
                <div className="mb-10">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">
                    <span>Postado</span>
                    <span>Em Rota</span>
                    <span>Entregue</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#004a99] transition-all duration-1000 ease-out relative"
                      style={{ 
                        width: `${Math.max(10, (updates.filter(u => parseISO(u.scheduled_for) <= new Date()).length / updates.length) * 100)}%` 
                      }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-100">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <Package className="w-3.5 h-3.5 text-[#004a99]" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Remetente (Origem)</p>
                  </div>
                  <p className="font-black text-sm text-slate-900 uppercase mb-1">{pkg.sender_name}</p>
                  <p className="text-sm font-medium text-slate-600 uppercase flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400"/> {pkg.sender_city}</p>
                  {pkg.sender_cep && <p className="text-xs font-bold text-slate-400 mt-1 uppercase">CEP: {pkg.sender_cep}</p>}
                </div>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#004a99]" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Destinatário (Destino)</p>
                  </div>
                  <p className="font-black text-sm text-slate-900 uppercase mb-1">{pkg.recipient_name}</p>
                  <p className="text-sm font-medium text-slate-600 uppercase flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400"/> {pkg.recipient_city}</p>
                  {pkg.recipient_cep && <p className="text-xs font-bold text-slate-400 mt-1 uppercase">CEP: {pkg.recipient_cep}</p>}
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mr-3 text-xs">!</span>
                HISTÓRICO DE MOVIMENTAÇÃO
              </h3>
              
              <div className="relative ml-4 md:ml-6 space-y-8 pb-4">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-slate-100"></div>

                {updates.length === 0 ? (
                  <p className="text-slate-500 font-medium ml-12">Nenhuma movimentação registrada.</p>
                ) : (
                  updates.map((update, index) => {
                    const scheduledDate = parseISO(update.scheduled_for);
                    const isPastStep = scheduledDate <= new Date();
                    
                    // Find the index of the latest completed step
                    const latestCompletedIndex = [...updates].reverse().findIndex(u => parseISO(u.scheduled_for) <= new Date());
                    const actualLatestIndex = latestCompletedIndex >= 0 ? updates.length - 1 - latestCompletedIndex : -1;
                    const isLatest = index === actualLatestIndex;
                    
                    const isDelivered = update.status.toLowerCase().includes('entregue') && isPastStep;
                    
                    // If it's a future step, it's grayed out
                    let circleColor = 'bg-slate-200 ring-slate-50';
                    let textColor = 'text-slate-400';
                    let iconColor = 'text-slate-400';
                    
                    if (isPastStep) {
                      circleColor = isDelivered ? 'bg-green-500 ring-green-100' : (isLatest ? 'bg-[#004a99] ring-blue-50' : 'bg-[#004a99] ring-blue-50');
                      textColor = isDelivered ? 'text-green-600' : (isLatest ? 'text-[#004a99]' : 'text-slate-700');
                    }

                    return (
                      <div key={update.id} className={`relative flex items-start space-x-6 ${!isPastStep ? 'opacity-50' : ''}`}>
                        <div className={`w-8 h-8 rounded-full ${circleColor} ring-4 z-10 flex items-center justify-center shrink-0 transition-colors relative`}>
                          {isLatest && !isDelivered && (
                            <div className="absolute inset-0 rounded-full bg-[#004a99] animate-ping opacity-75"></div>
                          )}
                          <div className="w-2 h-2 bg-white rounded-full relative z-10"></div>
                        </div>
                        
                        <div className="pt-1 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h4 className={`text-xs md:text-sm font-black uppercase tracking-wide ${textColor}`}>
                              {update.status}
                              {isLatest && !isDelivered && <span className="ml-2 text-[10px] bg-blue-100 text-[#004a99] px-2 py-0.5 rounded-full font-bold">ATUAL</span>}
                              {!isPastStep && <span className="ml-2 text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-bold">PREVISTO</span>}
                            </h4>
                            <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold ${isPastStep ? 'text-slate-500' : 'text-slate-400'}`}>
                              <Clock className="w-3 h-3" />
                              {format(scheduledDate, "dd MMM, HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                          <p className={`text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5 ${isPastStep ? 'text-slate-600' : 'text-slate-400'}`}>
                            <MapPin className="w-3 h-3" />
                            {update.location}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info / FAQ Section & Services */}
        {!pkg && !loading && (
          <div className="space-y-14 sm:space-y-16 mt-10">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-[#004a99] uppercase tracking-tight mb-4">Por que a Rodonaves?</h2>
              <p className="text-slate-600 font-medium max-w-2xl mx-auto">Com mais de 40 anos de história, somos referência no setor de transportes e logística no Brasil.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <p className="text-3xl font-black text-[#ffcc00] mb-2">+300</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unidades</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <p className="text-3xl font-black text-[#ffcc00] mb-2">+3.5M</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volumes/Mês</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <p className="text-3xl font-black text-[#ffcc00] mb-2">+4.800</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Municípios</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <p className="text-3xl font-black text-[#ffcc00] mb-2">+10.000</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Colaboradores</p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-slate-200">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#004a99] transition-colors">
                  <Truck className="w-6 h-6 text-[#004a99] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-wide mb-2">Carga Fracionada</h3>
                <p className="text-sm text-slate-600 font-medium">Coletas e entregas ágeis para pequenos e médios volumes em todo o território nacional.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#004a99] transition-colors">
                  <Package className="w-6 h-6 text-[#004a99] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-wide mb-2">Carga Lotação</h3>
                <p className="text-sm text-slate-600 font-medium">Veículo exclusivo para o seu transporte, otimizando prazos para grandes remessas.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#004a99] transition-colors">
                  <MapPin className="w-6 h-6 text-[#004a99] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-wide mb-2">Rastreamento 24h</h3>
                <p className="text-sm text-slate-600 font-medium">Sistemas integrados para você acompanhar o passo a passo de onde está sua mercadoria.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-black text-[#004a99] uppercase tracking-tight mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6" />
                  Perguntas Frequentes
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Com que frequência o rastreio é atualizado?</h4>
                    <p className="text-sm text-slate-600 font-medium">Nosso sistema de inteligência logística atualiza o status de cada encomenda a cada leitura nas unidades de transferência, mantendo você informado desde a coleta até a entrega final.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Como sei onde minha carga está?</h4>
                    <p className="text-sm text-slate-600 font-medium">Basta inserir o código de rastreamento no campo acima. Você verá toda a rota e o status atual em tempo real.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#004a99] p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-10">
                  <Truck className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">
                    Central de Atendimento
                  </h3>
                  <p className="text-sm text-blue-100 mb-8 font-medium leading-relaxed max-w-sm">
                    Nossa equipe está pronta para tirar suas dúvidas e auxiliar em qualquer etapa do transporte da sua carga.
                  </p>
                  
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                        <Phone className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">Telefone / WhatsApp</p>
                        <p className="font-black text-lg tracking-wide">0800 134 3333</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                        <Mail className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">E-mail</p>
                        <p className="text-sm font-bold leading-tight">atendimento@rodonaves.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                        <MapPin className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-0.5">Sede Administrativa</p>
                        <p className="text-sm font-bold leading-tight">Rua General Augusto Soares dos Santos, 550<br/>Ribeirão Preto - SP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium">© {new Date().getFullYear()} Rodonaves Transportes e Encomendas Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
             <a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a>
             <a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
