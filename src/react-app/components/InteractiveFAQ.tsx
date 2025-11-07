import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Clock, Shield, DollarSign, Users } from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';

const faqCategories = [
  {
    id: 'sindico',
    name: 'Síndico Profissional',
    icon: Users,
    questions: [
      {
        question: 'Quais são as vantagens de contratar um síndico profissional?',
        answer: 'Um síndico profissional oferece conhecimento técnico especializado, dedicação exclusiva, transparência na gestão, conhecimento da legislação vigente, e capacidade de otimizar custos e processos. Isso resulta em maior valorização do patrimônio e redução de problemas.'
      },
      {
        question: 'Como é feita a transição do síndico atual?',
        answer: 'Realizamos uma transição suave e organizada: análise da situação atual, inventário completo, transferência de documentos, apresentação aos moradores, e implementação gradual dos novos processos. Todo o processo é acompanhado de perto para garantir continuidade.'
      },
      {
        question: 'Qual é a diferença para um síndico morador?',
        answer: 'O síndico profissional tem dedicação exclusiva, conhecimento técnico especializado, imparcialidade nas decisões, acesso a fornecedores qualificados, e responsabilidade civil. Além disso, não há conflitos de interesse e a gestão é baseada em melhores práticas do mercado.'
      }
    ]
  },
  {
    id: 'custos',
    name: 'Custos e Investimento',
    icon: DollarSign,
    questions: [
      {
        question: 'Quanto custa contratar os serviços da RB HUB?',
        answer: 'Os valores variam conforme o tamanho do condomínio e serviços contratados. Oferecemos propostas personalizadas que consideram número de unidades, área comum, complexidade da gestão. Nosso objetivo é otimizar custos e gerar economia real.'
      },
      {
        question: 'A contratação gera economia para o condomínio?',
        answer: 'Sim! Nossa gestão profissional típicamente gera economia de 15-30% nos custos operacionais através de: negociação com fornecedores, otimização de processos, manutenção preventiva, redução de desperdícios, e gestão eficiente de recursos.'
      },
      {
        question: 'Como são cobrados os serviços extras?',
        answer: 'Serviços adicionais são sempre pré-aprovados pelo condomínio. Trabalhamos com orçamentos transparentes, preços competitivos do mercado, e relatórios detalhados. Nunca há surpresas - tudo é comunicado e aprovado antecipadamente.'
      }
    ]
  },
  {
    id: 'processos',
    name: 'Processos e Metodologia',
    icon: Clock,
    questions: [
      {
        question: 'Como funciona a gestão no dia a dia?',
        answer: 'Mantemos presença regular no condomínio, atendimento telefônico 24/7, relatórios mensais detalhados, prestação de contas transparente, e comunicação constante com moradores. Utilizamos tecnologia para otimizar processos e manter tudo organizado.'
      },
      {
        question: 'Qual a frequência dos relatórios?',
        answer: 'Fornecemos relatórios mensais completos incluindo: movimentação financeira, serviços realizados, manutenções executadas, pendências, e próximas ações. Relatórios especiais podem ser solicitados a qualquer momento.'
      },
      {
        question: 'Como é feito o controle de qualidade?',
        answer: 'Implementamos sistema rigoroso de controle: inspeções regulares, checklist de qualidade, feedback dos moradores, auditorias internas, e melhorias contínuas. Todos os fornecedores são avaliados constantemente.'
      }
    ]
  },
  {
    id: 'seguranca',
    name: 'Segurança e Garantias',
    icon: Shield,
    questions: [
      {
        question: 'Quais garantias a RB HUB oferece?',
        answer: 'Oferecemos seguro de responsabilidade civil, garantia de qualidade em todos os serviços, equipe qualificada e treinada, backup completo de documentos, e processos certificados. Sua tranquilidade é nossa prioridade.'
      },
      {
        question: 'Como é garantida a segurança das informações?',
        answer: 'Utilizamos sistemas seguros para armazenamento de dados, backup em nuvem, acesso restrito e controlado, conformidade com LGPD, e protocolos de segurança rigorosos. Todas as informações são tratadas com máxima confidencialidade.'
      },
      {
        question: 'E se não ficarmos satisfeitos com os serviços?',
        answer: 'Temos política de satisfação garantida. Oferecemos período de adaptação, feedback contínuo, ajustes necessários, e em último caso, transição organizada sem ônus. Nossa meta é 100% de satisfação.'
      }
    ]
  }
];

export default function InteractiveFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('sindico');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const { isDark } = useTheme();

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory);
  const filteredQuestions = currentCategory?.questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Perguntas <span className="text-gradient from-cyan-500 to-blue-600">Frequentes</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto font-manrope mb-8 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Tire suas dúvidas sobre nossos serviços e metodologia
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-slate-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-2xl ${isDark ? 'glass-effect' : 'glass-effect-light'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Categorias
              </h3>
              <div className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setOpenQuestion(null);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-left ${
                      activeCategory === category.id
                        ? isDark
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : isDark
                          ? 'hover:bg-white/10 text-slate-300'
                          : 'hover:bg-black/5 text-gray-700'
                    }`}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className={`text-center py-12 ${isDark ? 'glass-effect' : 'glass-effect-light'} rounded-2xl`}>
                  <HelpCircle className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
                  <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    Nenhuma pergunta encontrada para "{searchTerm}"
                  </p>
                </div>
              ) : (
                filteredQuestions.map((faq, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDark ? 'glass-effect' : 'glass-effect-light'
                    }`}
                  >
                    <button
                      onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                      className={`w-full p-6 text-left flex items-center justify-between transition-all ${
                        openQuestion === index
                          ? isDark ? 'bg-white/10' : 'bg-black/5'
                          : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                      }`}
                    >
                      <h3 className={`font-semibold text-lg pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {faq.question}
                      </h3>
                      {openQuestion === index ? (
                        <ChevronUp className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      ) : (
                        <ChevronDown className={`w-6 h-6 flex-shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                      )}
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="p-6 pt-0">
                        <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className={`mt-12 p-8 rounded-3xl text-center ${
          isDark ? 'glass-effect' : 'glass-effect-light'
        }`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Não encontrou sua resposta?
          </h3>
          <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Nossa equipe está pronta para esclarecer todas suas dúvidas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5581993119952"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
            >
              Falar no WhatsApp
            </a>
            <a
              href="tel:+5581993119952"
              className={`px-8 py-3 font-semibold rounded-full transition-all duration-300 ${
                isDark 
                  ? 'border-2 border-white/30 text-white hover:bg-white/10' 
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-black/5'
              }`}
            >
              Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
