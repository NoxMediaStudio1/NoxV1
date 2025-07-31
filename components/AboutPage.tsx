import React, { useState, useReducer, useMemo, useRef, useEffect } from 'react';
import { Star, Download, Users, Check, AlertCircle, Heart, Zap, Shield, Gift, Target, Code, Globe, Sparkles, TrendingUp, Coffee, Award } from 'lucide-react';

// Dados estáticos expandidos
const DONATION_OPTIONS = [
    {
        value: 5,
        label: 'Café do Dev',
        desc: 'Um cafézinho para manter a energia',
        icon: Coffee,
        popular: false
    },
    {
        value: 15,
        label: 'Apoio Regular',
        desc: 'Garante atualizações frequentes',
        icon: Heart,
        popular: true
    },
    {
        value: 30,
        label: 'Apoio Premium',
        desc: 'Acelera novas funcionalidades',
        icon: Zap,
        popular: false
    },
    {
        value: 50,
        label: 'Apoio Corporativo',
        desc: 'Contribuição empresarial',
        icon: Award,
        popular: false
    },
] as const;

const IMPACT_STATS = [
    { icon: Star, label: 'GitHub Stars', value: '2.1k', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    { icon: Download, label: 'Downloads', value: '28k+', color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { icon: Users, label: 'Usuários Ativos', value: '1.5k+', color: 'text-green-400', bg: 'bg-green-500/20' },
    { icon: TrendingUp, label: 'Crescimento Mensal', value: '+15%', color: 'text-purple-400', bg: 'bg-purple-500/20' },
];

const BENEFITS = [
    { icon: Heart, text: 'Mantém o projeto gratuito para toda comunidade' },
    { icon: Zap, text: 'Acelera o desenvolvimento de novas funcionalidades' },
    { icon: Shield, text: 'Garante manutenção e suporte contínuo' },
    { icon: Globe, text: 'Expande o alcance global da ferramenta' },
];

// Types
interface DonationState {
    selectedAmount: number;
    customAmount: string;
    donorName: string;
    donorEmail: string;
    message: string;
    isProcessing: boolean;
    showSuccess: boolean;
    error: string | null;
    showThankYou: boolean;
}

type DonationAction =
    | { type: 'SET_SELECTED_AMOUNT'; payload: number }
    | { type: 'SET_CUSTOM_AMOUNT'; payload: string }
    | { type: 'SET_DONOR_NAME'; payload: string }
    | { type: 'SET_DONOR_EMAIL'; payload: string }
    | { type: 'SET_MESSAGE'; payload: string }
    | { type: 'START_PROCESSING' }
    | { type: 'SHOW_SUCCESS' }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'RESET' }
    | { type: 'SHOW_THANK_YOU' };

// Reducer
const donationReducer = (state: DonationState, action: DonationAction): DonationState => {
    switch (action.type) {
        case 'SET_SELECTED_AMOUNT':
            return { ...state, selectedAmount: action.payload, customAmount: '', error: null };
        case 'SET_CUSTOM_AMOUNT':
            return { ...state, customAmount: action.payload, selectedAmount: 0, error: null };
        case 'SET_DONOR_NAME':
            return { ...state, donorName: action.payload };
        case 'SET_DONOR_EMAIL':
            return { ...state, donorEmail: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'START_PROCESSING':
            return { ...state, isProcessing: true, error: null };
        case 'SHOW_SUCCESS':
            return { ...state, isProcessing: false, showSuccess: true };
        case 'SET_ERROR':
            return { ...state, isProcessing: false, error: action.payload };
        case 'RESET':
            return { ...state, showSuccess: false, error: null, showThankYou: false };
        case 'SHOW_THANK_YOU':
            return { ...state, showThankYou: true };
        default:
            return state;
    }
};

// Animated background component
const AnimatedBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/3 rounded-full animate-pulse delay-2000"></div>
    </div>
);

// Progress indicator
const ProgressIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => {
    const percentage = (current / total) * 100;
    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Meta Mensal</h3>
                <span className="text-sm text-slate-400">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 mb-3 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-slate-400">R$ {current.toFixed(0)}</span>
                <span className="text-slate-300">R$ {total.toFixed(0)}</span>
            </div>
        </div>
    );
};

const AboutPage: React.FC = () => {
    const [state, dispatch] = useReducer(donationReducer, {
        selectedAmount: 15,
        customAmount: '',
        donorName: '',
        donorEmail: '',
        message: '',
        isProcessing: false,
        showSuccess: false,
        error: null,
        showThankYou: false,
    });
    const [currentGoal] = useState({ current: 1247, total: 2000 });
    const [recentDonors] = useState([
        { name: 'João S.', amount: 25, time: '2 min atrás' },
        { name: 'Maria L.', amount: 15, time: '5 min atrás' },
        { name: 'Pedro R.', amount: 50, time: '12 min atrás' },
        { name: 'Ana P.', amount: 10, time: '15 min atrás' },
        { name: 'Carlos M.', amount: 20, time: '20 min atrás' },
        { name: 'Fernanda T.', amount: 30, time: '25 min atrás' },
        { name: 'Lucas D.', amount: 40, time: '30 min atrás' },
        { name: 'Patrícia F.', amount: 12, time: '35 min atrás' },
        { name: 'Rafael G.', amount: 18, time: '40 min atrás' },
        { name: 'Juliana H.', amount: 22, time: '45 min atrás' },
        { name: 'Bruno K.', amount: 27, time: '50 min atrás' },
        { name: 'Sofia L.', amount: 35, time: '55 min atrás' },
    ]);
    
    // Estado para controlar duplicação de itens para scroll infinito
    const duplicatedDonors = useMemo(() => [...recentDonors, ...recentDonors], [recentDonors]);
    
    // Referência e effect removidos pois usaremos CSS animation
    const donorsListRef = useRef<HTMLDivElement>(null);
    const finalAmount = useMemo(() => {
        if (state.customAmount) {
            const custom = parseFloat(state.customAmount);
            return custom > 0 ? custom : 0;
        }
        return state.selectedAmount;
    }, [state.customAmount, state.selectedAmount]);
    const isValidAmount = finalAmount > 0 && finalAmount <= 50000;
    const isValidEmail = state.donorEmail === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.donorEmail);
    const handleDonate = async () => {
        if (!isValidAmount) {
            dispatch({ type: 'SET_ERROR', payload: 'Por favor, insira um valor válido entre R$ 1 e R$ 50.000.' });
            return;
        }
        if (state.donorEmail && !isValidEmail) {
            dispatch({ type: 'SET_ERROR', payload: 'Por favor, insira um email válido.' });
            return;
        }
        dispatch({ type: 'START_PROCESSING' });
        setTimeout(() => {
            dispatch({ type: 'SHOW_SUCCESS' });
        }, 2500);
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative">
            <AnimatedBackground />
            {/* Header */}
            <header className="relative border-b border-slate-800/80 shadow-lg">
                <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center">
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-400 font-medium tracking-wide">Projeto Open Source</span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                        Apoie o <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">NoxSub</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                        Contribua para manter este projeto gratuito, inovador e em constante evolução. Sua doação permite mais tempo dedicado ao desenvolvimento e suporte.
                    </p>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Coluna principal */}
                <section className="lg:col-span-2 flex flex-col gap-10">
                    {/* Card de Doação */}
                    <div className="bg-slate-800/90 rounded-2xl border border-slate-700 shadow-2xl p-10">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Contribua com o Projeto</h2>
                        </div>
                        {/* Opções de Valor */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-slate-300 mb-4">Escolha um valor</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {DONATION_OPTIONS.map(option => {
                                    const IconComponent = option.icon;
                                    const isSelected = finalAmount === option.value && !state.customAmount;
                                    return (
                                        <button
                                            key={option.value}
                                            className={`relative p-6 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 ${isSelected
                                                ? 'border-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg'
                                                : 'border-slate-600 bg-slate-700/50 hover:border-blue-400 hover:bg-slate-700 hover:shadow-lg'
                                            }`}
                                            onClick={() => dispatch({ type: 'SET_SELECTED_AMOUNT', payload: option.value })}
                                            type="button"
                                        >
                                            {option.popular && (
                                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                                    Popular
                                                </div>
                                            )}
                                            <div className="text-center">
                                                <div className="w-8 h-8 mx-auto mb-3 text-blue-400">
                                                    <IconComponent className="w-full h-full" />
                                                </div>
                                                <div className="text-2xl font-bold text-white mb-2">R$ {option.value}</div>
                                                <div className="text-sm font-medium text-blue-400 mb-1">{option.label}</div>
                                                <div className="text-xs text-slate-400">{option.desc}</div>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Valor Personalizado */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-slate-300 mb-3">Ou digite um valor personalizado</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">R$</span>
                                <input
                                    type="number"
                                    min="1"
                                    max="50000"
                                    step="1"
                                    placeholder="Digite um valor..."
                                    className="w-full pl-12 pr-4 py-4 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                                    value={state.customAmount}
                                    onChange={e => dispatch({ type: 'SET_CUSTOM_AMOUNT', payload: e.target.value })}
                                />
                            </div>
                            {state.customAmount && finalAmount > 0 && (
                                <p className="text-green-400 text-sm mt-2 flex items-center">
                                    <Check className="w-4 h-4 mr-1" />
                                    Valor personalizado: R$ {finalAmount.toFixed(2)}
                                </p>
                            )}
                        </div>
                        {/* Informações do Doador */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Nome completo (opcional)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={state.donorName}
                                    onChange={e => dispatch({ type: 'SET_DONOR_NAME', payload: e.target.value })}
                                    placeholder="Seu nome completo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Email (opcional)</label>
                                <input
                                    type="email"
                                    className={`w-full px-4 py-3 bg-slate-700/80 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${!isValidEmail ? 'border-red-500 focus:ring-red-500' : 'border-slate-600'}`}
                                    value={state.donorEmail}
                                    onChange={e => dispatch({ type: 'SET_DONOR_EMAIL', payload: e.target.value })}
                                    placeholder="seu@email.com"
                                />
                                {!isValidEmail && (
                                    <p className="text-red-400 text-sm mt-1 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        Email inválido
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Mensagem */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Mensagem de apoio (opcional)</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                                value={state.message}
                                onChange={e => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })}
                                placeholder="Deixe uma mensagem de apoio para a equipe..."
                            />
                            <p className="text-slate-400 text-xs mt-2">Sua mensagem pode ser exibida publicamente (opcional)</p>
                        </div>
                        {/* Mensagem de Erro */}
                        {state.error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                <div className="flex items-center space-x-2 text-red-400">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">{state.error}</span>
                                </div>
                            </div>
                        )}
                        {/* Botão de Doação */}
                        <div className="border-t border-slate-700 pt-6">
                            <button
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${isValidAmount && isValidEmail && !state.isProcessing
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                }`}
                                onClick={handleDonate}
                                disabled={!isValidAmount || !isValidEmail || state.isProcessing}
                                type="button"
                            >
                                {state.isProcessing ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Processando Doação...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Heart className="w-5 h-5" />
                                        <span>Contribuir com R$ {finalAmount.toFixed(2)}</span>
                                    </div>
                                )}
                            </button>
                            <div className="text-center text-sm text-slate-400 mt-4 space-y-1">
                                <p>🔒 Pagamento seguro via PIX • Recibo enviado por email</p>
                                <p>✨ Processamento instantâneo • Suporte 24/7</p>
                            </div>
                        </div>
                    </div>
                    {/* Impacto do Projeto */}
                    <div className="bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                            <Target className="w-5 h-5 text-purple-400" />
                            <span>Impacto do Projeto</span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {IMPACT_STATS.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={index} className="text-center p-4 bg-slate-700/40 rounded-xl shadow">
                                        <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                                            <IconComponent className={`w-5 h-5 ${stat.color}`} />
                                        </div>
                                        <div className="font-bold text-white text-xl">{stat.value}</div>
                                        <div className="text-xs text-slate-400">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* QR Code PIX */}
                    <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 text-center flex items-center justify-center space-x-2">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <span>Pagamento Instantâneo</span>
                        </h3>
                        <div className="flex justify-center mb-4">
                            <div className="w-40 h-40 bg-gradient-to-br from-white to-gray-100 rounded-xl border-2 border-blue-500 flex items-center justify-center shadow-lg">
                                <div className="text-center text-gray-600">
                                    <div className="text-3xl mb-2 font-bold">QR</div>
                                    <div className="text-xs font-medium">Código PIX</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate-400 mb-2">📱 Escaneie com seu banco</p>
                            <div className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text">R$ {finalAmount.toFixed(2)}</div>
                        </div>
                    </div>
                    {/* Progress */}
                    <ProgressIndicator current={currentGoal.current} total={currentGoal.total} />
                    {/* Doações Recentes com animação de scroll suave via CSS */}
                    <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 h-[500px] flex flex-col shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                            <Users className="w-5 h-5 text-green-400" />
                            <span>Doações Recentes</span>
                        </h3>
                        <div className="relative flex-1 overflow-hidden">
                            <div className="animate-scroll absolute w-full">
                                {duplicatedDonors.map((donor, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 mb-3 bg-slate-700/50 rounded-lg transform transition-transform hover:scale-[1.02] hover:bg-slate-700/70 shadow"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">{donor.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{donor.name}</p>
                                                <p className="text-xs text-slate-400">{donor.time}</p>
                                            </div>
                                        </div>
                                        <span className="text-green-400 font-semibold">R$ {donor.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <style jsx>{`
                            @keyframes scroll {
                                0% { transform: translateY(0); }
                                100% { transform: translateY(-50%); }
                            }
                            .animate-scroll { animation: scroll 30s linear infinite; }
                            .animate-scroll:hover { animation-play-state: paused; }
                        `}</style>
                    </div>
                </aside>
            </main>
            {/* Sobre o Projeto */}
            <section className="mt-20 bg-slate-800/90 rounded-2xl border border-slate-700 p-12 shadow-2xl max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                        <Code className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-400 font-medium">Sobre o NoxSub</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                        Junte-se a Nós na Construção de um Futuro Melhor!
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        O NoxSub é mais do que apenas uma ferramenta - é um movimento para capacitar desenvolvedores e comunidades em todo o mundo. Ao contribuir com este projeto, você está ajudando a criar oportunidades, promover aprendizagem e democratizar o acesso à tecnologia.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">🌟 Nossa Missão</h3>
                        <p className="text-slate-300 mb-4">
                            Acreditamos que a tecnologia deve ser acessível a todos, independentemente de sua origem ou situação financeira. Nosso objetivo é desenvolver ferramentas poderosas e fáceis de usar que ajudem desenvolvedores a criarem projetos incríveis e impactantes.
                        </p>
                        <p className="text-slate-300">
                            Sua contribuição nos ajuda a manter esse projeto gratuito e em constante evolução, beneficiando assim toda a comunidade de desenvolvedores.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">🚀 Nossos Objetivos</h3>
                        <ul className="text-slate-300 space-y-2 list-disc list-inside">
                            <li><span className="font-medium text-white">Desenvolvimento Contínuo:</span> Manter e aprimorar o NoxSub com novas funcionalidades e melhorias constantes.</li>
                            <li><span className="font-medium text-white">Suporte à Comunidade:</span> Oferecer suporte ativo e recursos educacionais para ajudar os usuários a aproveitarem ao máximo o NoxSub.</li>
                            <li><span className="font-medium text-white">Expansão do Acesso:</span> Aumentar o alcance do NoxSub para desenvolvedores em todo o mundo, especialmente em regiões sub-representadas.</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10">
                    <h3 className="text-xl font-bold text-white mb-4">🎯 Como Você Pode Ajudar</h3>
                    <p className="text-slate-300">
                        Você pode contribuir de várias formas: doando, divulgando o projeto, enviando feedbacks ou colaborando com código e documentação no GitHub. Toda ajuda é bem-vinda!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;