import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Heart, 
  Users, 
  Target, 
  Star, 
  Github, 
  Coffee, 
  Zap, 
  Globe, 
  Award,
  TrendingUp,
  MessageCircle,
  Rocket,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, value: "10K+", label: "Desenvolvedores Ativos" },
    { icon: Star, value: "2.5K", label: "Stars no GitHub" },
    { icon: Globe, value: "50+", label: "Países Alcançados" },
    { icon: Rocket, value: "100+", label: "Projetos Criados" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Performance Otimizada",
      description: "Ferramentas construídas para máxima eficiência e velocidade de desenvolvimento."
    },
    {
      icon: Heart,
      title: "Comunidade Ativa",
      description: "Uma comunidade vibrante sempre pronta para ajudar e colaborar."
    },
    {
      icon: Code,
      title: "Open Source",
      description: "Código aberto, transparente e desenvolvido colaborativamente."
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Padrões rigorosos de qualidade em cada linha de código."
    }
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0F101A' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <section className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Sobre o NoxSub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Junte-se a Nós na Construção de um Futuro Melhor!
          </h1>
          
          <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            O NoxSub é mais do que apenas uma ferramenta - é um movimento para capacitar desenvolvedores e comunidades em todo o mundo. Ao contribuir com este projeto, você está ajudando a criar oportunidades, promover aprendizagem e democratizar o acesso à tecnologia.
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-800/60 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Mission Section */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 text-yellow-400 mr-3">🌟</div>
              <h2 className="text-xl font-bold text-white">Nossa Missão</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              Acreditamos que a tecnologia deve ser acessível a todos, independentemente de sua origem ou situação financeira. Nosso objetivo é desenvolver ferramentas poderosas e fáceis de usar que ajudem desenvolvedores a criarem projetos incríveis e impactantes.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Sua contribuição nos ajuda a manter esse projeto gratuito e em constante evolução, beneficiando assim toda a comunidade de desenvolvedores.
            </p>
          </div>

          {/* Objectives Section */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 text-pink-400 mr-3">🚀</div>
              <h2 className="text-xl font-bold text-white">Nossos Objetivos</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-white">Desenvolvimento Contínuo:</span>
                  <span className="text-slate-300"> Manter e aprimorar o NoxSub com novas funcionalidades e melhorias constantes.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-white">Suporte à Comunidade:</span>
                  <span className="text-slate-300"> Oferecer suporte ativo e recursos educacionais para ajudar os usuários a aproveitarem ao máximo o NoxSub.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-white">Expansão do Acesso:</span>
                  <span className="text-slate-300"> Aumentar o alcance do NoxSub para desenvolvedores em todo o mundo, especialmente em regiões sub-representadas.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How You Can Help Section */}
        <section className="mb-20">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 text-red-400 mr-3">🎯</div>
              <h2 className="text-xl font-bold text-white">Como Você Pode Ajudar</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Você pode contribuir de várias formas: doando, divulgando o projeto, enviando feedbacks ou colaborando com código e documentação no GitHub. Toda ajuda é bem-vinda!
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Por Que Escolher o NoxSub?</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Descubra os diferenciais que fazem do NoxSub a escolha ideal para desenvolvedores
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/60 transition-all duration-300 hover:border-purple-500/30"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Roadmap 2025-2026</h2>
            <p className="text-slate-300 text-lg">
              Acompanhe nossos próximos marcos e desenvolvimentos
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 border-2 border-green-500 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">Interface Redesenhada</h4>
                      <p className="text-slate-400">Q3 2025</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full text-sm font-medium">
                      Concluído
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 border-2 border-yellow-500 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">API REST Completa</h4>
                      <p className="text-slate-400">Q4 2025</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-sm font-medium">
                      Em Progresso
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 border-2 border-blue-500 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">Mobile App</h4>
                      <p className="text-slate-400">Q1 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium">
                      Planejado
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 border-2 border-purple-500 rounded-full">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">Marketplace de Plugins</h4>
                      <p className="text-slate-400">Q2 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-sm font-medium">
                      Futuro
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto para Fazer a Diferença?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Sua contribuição pode impactar milhares de desenvolvedores ao redor do mundo. 
              Junte-se à nossa missão de democratizar a tecnologia!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                <Coffee className="w-5 h-5" />
                <span>Apoiar com Doação</span>
              </button>
              
              <button className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg border border-slate-600 transition-colors duration-200">
                <Github className="w-5 h-5" />
                <span>Contribuir no GitHub</span>
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Suporte 24/7</span>
              </div>
              <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span>Feito com amor</span>
              </div>
              <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Comunidade global</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
