import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Package, Truck, ArrowLeft, Loader2, CheckCircle2, Copy, Link as LinkIcon, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === 'admin' && loginPassword === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas');
    }
  };

  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    if (!supabase) return;
    try {
      setLoadingPackages(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPackages(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar encomendas:', err);
    } finally {
      setLoadingPackages(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta encomenda?')) return;
    if (!supabase) return;
    try {
      const { error } = await supabase.from('packages').delete().eq('id', id);
      if (error) throw error;
      fetchPackages();
    } catch (err: any) {
      console.error('Erro ao excluir:', err);
      alert('Erro ao excluir encomenda.');
    }
  };

  const [formData, setFormData] = useState({
    posted_at: new Date().toISOString().slice(0, 16),
    weight: '',
    sender_name: '',
    sender_city: '',
    sender_cep: '',
    recipient_name: '',
    recipient_city: '',
    recipient_cep: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCode = () => {
    const chars = '0123456789';
    let result = 'RDN';
    for (let i = 0; i < 9; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result + 'BR';
  };

  const randomizeBusinessHours = (baseDate: Date, addDays: number) => {
    const newDate = new Date(baseDate.getTime() + addDays * 24 * 60 * 60 * 1000);
    const randomHour = Math.floor(Math.random() * (18 - 8 + 1)) + 8; // 8 to 18
    const randomMinute = Math.floor(Math.random() * 60);
    newDate.setHours(randomHour, randomMinute, 0, 0);
    
    if (newDate.getDay() === 0) newDate.setDate(newDate.getDate() + 1); // Sunday -> Monday
    if (newDate.getDay() === 6) newDate.setDate(newDate.getDate() + 2); // Saturday -> Monday
    return newDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setLoading(true);
    setError('');
    setSuccessCode('');

    try {
      const code = generateCode();
      const postedDate = new Date(formData.posted_at);
      
      const { data: pkg, error: pkgError } = await supabase
        .from('packages')
        .insert({
          tracking_code: code,
          sender_name: formData.sender_name,
          sender_city: formData.sender_city,
          sender_cep: formData.sender_cep,
          recipient_name: formData.recipient_name,
          recipient_city: formData.recipient_city,
          recipient_cep: formData.recipient_cep,
          weight: parseFloat(formData.weight),
          posted_at: postedDate.toISOString(),
        })
        .select()
        .single();

      if (pkgError) throw pkgError;

      // Create simulated route updates (~10 days) with random business hours
      const updates = [
        {
          package_id: pkg.id,
          status: 'Postado na agência da transportadora',
          location: formData.sender_city,
          scheduled_for: postedDate.toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Em trânsito para o Centro de Distribuição Regional',
          location: formData.sender_city,
          scheduled_for: randomizeBusinessHours(postedDate, 1).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Chegou no Centro de Distribuição Regional',
          location: formData.sender_city,
          scheduled_for: randomizeBusinessHours(postedDate, 2).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Em trânsito para Hub de Transferência (São Paulo Capital)',
          location: 'Rota de Transferência',
          scheduled_for: randomizeBusinessHours(postedDate, 4).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Chegou no Hub de Transferência',
          location: 'São Paulo - SP',
          scheduled_for: randomizeBusinessHours(postedDate, 5).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Em trânsito para a unidade de tratamento logístico',
          location: formData.recipient_city,
          scheduled_for: randomizeBusinessHours(postedDate, 7).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Chegou na unidade de tratamento logístico',
          location: formData.recipient_city,
          scheduled_for: randomizeBusinessHours(postedDate, 8).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Saiu para entrega ao destinatário',
          location: formData.recipient_city,
          scheduled_for: randomizeBusinessHours(postedDate, 9).toISOString()
        },
        {
          package_id: pkg.id,
          status: 'Entregue',
          location: formData.recipient_city,
          scheduled_for: randomizeBusinessHours(postedDate, 10).toISOString()
        }
      ];

      const { error: updatesError } = await supabase
        .from('package_updates')
        .insert(updates);

      if (updatesError) throw updatesError;

      setSuccessCode(code);
      setFormData({
        posted_at: new Date().toISOString().slice(0, 16),
        weight: '',
        sender_name: '',
        sender_city: '',
        sender_cep: '',
        recipient_name: '',
        recipient_city: '',
        recipient_cep: '',
      });

    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar encomenda.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-black tracking-tighter italic leading-none text-[#004a99] mb-1">
              RODONAVES<span className="text-[#ffcc00]">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Acesso Restrito</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Usuário</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#004a99] transition-colors font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Senha</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#004a99] transition-colors font-medium"
                required
              />
            </div>
            
            {loginError && (
              <p className="text-red-600 text-xs font-bold mt-2">{loginError}</p>
            )}
            
            <button
              type="submit"
              className="w-full mt-6 bg-[#004a99] hover:bg-[#003a7a] text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-colors shadow-md"
            >
              Entrar
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-4 text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      <header className="bg-[#004a99] text-white shadow-md">
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter italic leading-none">
              RODONAVES<span className="text-[#ffcc00]">.</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mt-1">Admin Panel</p>
          </div>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white hover:text-[#ffcc00] text-xs font-bold tracking-widest uppercase transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-8 border-b border-slate-100 pb-6">
            <h2 className="text-xl md:text-2xl font-black text-[#004a99] flex items-center mb-2 uppercase tracking-tight">
              <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mr-3 text-xs text-slate-900">01</span>
              Cadastrar Nova Encomenda
            </h2>
            <p className="text-slate-500 text-sm font-medium ml-11">
              O sistema irá gerar automaticamente o código de rastreio e o plano de rota logístico programado até a entrega no destino.
            </p>
          </div>

          {successCode && (
            <div className="mb-8 bg-green-50 border border-green-100 p-6 rounded-xl flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
              <div className="w-full">
                <h3 className="text-green-800 font-black text-sm uppercase tracking-wide mb-1">Encomenda Cadastrada com Sucesso!</h3>
                <p className="text-green-700 text-sm mb-4 font-medium">O código e o link de rastreamento já estão disponíveis para o cliente.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Código de Rastreio</p>
                    <code className="text-2xl font-black text-slate-900 tracking-widest">{successCode}</code>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> Link Direto
                    </p>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        readOnly
                        value={`${window.location.origin}/?code=${successCode}`}
                        className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-600 p-2 rounded focus:outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/?code=${successCode}`);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="bg-[#004a99] text-white p-2 rounded hover:bg-[#003a7a] transition-colors shrink-0 flex items-center gap-2 px-3"
                      >
                        {copied ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Copiado</span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Copy className="w-3 h-3"/> Copiar</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 font-bold text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Data e Hora da Postagem</label>
                <input
                  type="datetime-local"
                  name="posted_at"
                  required
                  value={formData.posted_at}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Peso da Encomenda (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  name="weight"
                  required
                  placeholder="Ex: 12.5"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
              {/* Remetente */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Dados do Remetente</h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Nome Completo</label>
                  <input
                    type="text"
                    name="sender_name"
                    required
                    value={formData.sender_name}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Cidade / UF</label>
                  <input
                    type="text"
                    name="sender_city"
                    required
                    placeholder="Ex: Ribeirão Preto - SP"
                    value={formData.sender_city}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">CEP</label>
                  <input
                    type="text"
                    name="sender_cep"
                    required
                    value={formData.sender_cep}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Destinatário */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Dados do Destinatário</h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Nome Completo</label>
                  <input
                    type="text"
                    name="recipient_name"
                    required
                    value={formData.recipient_name}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Cidade / UF</label>
                  <input
                    type="text"
                    name="recipient_city"
                    required
                    placeholder="Ex: São Paulo - SP"
                    value={formData.recipient_city}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">CEP</label>
                  <input
                    type="text"
                    name="recipient_cep"
                    required
                    value={formData.recipient_cep}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#004a99] transition-all font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#004a99] hover:bg-[#003a7a] disabled:opacity-70 text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 w-full md:w-auto"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Salvar e Calcular Rota'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mt-8 mb-12">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-[#004a99] flex items-center mb-2 uppercase tracking-tight">
              <span className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mr-3 text-xs text-slate-900">02</span>
              Encomendas Cadastradas
            </h2>
          </div>

          {loadingPackages ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 text-[#004a99] animate-spin" />
            </div>
          ) : packages.length === 0 ? (
            <p className="text-slate-500 font-medium text-center p-8 bg-slate-50 rounded-xl border border-slate-100">Nenhuma encomenda cadastrada ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400 font-bold bg-slate-50">
                    <th className="p-4 rounded-tl-lg">Código</th>
                    <th className="p-4">Remetente</th>
                    <th className="p-4">Destinatário</th>
                    <th className="p-4 rounded-tr-lg">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-black text-slate-900 tracking-widest">{pkg.tracking_code}</td>
                      <td className="p-4 text-slate-600 font-medium">
                        {pkg.sender_name}
                        <br />
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{pkg.sender_city}</span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {pkg.recipient_name}
                        <br />
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{pkg.recipient_city}</span>
                      </td>
                      <td className="p-4 flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/?code=${pkg.tracking_code}`);
                            alert('Link copiado!');
                          }}
                          className="p-2 bg-blue-50 text-[#004a99] rounded hover:bg-blue-100 transition-colors"
                          title="Copiar Link"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
