import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Lightbulb, Database, Code, BookOpen, Sparkles, FolderOpen, Layers, Wand2, RefreshCw, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from 'react-router-dom';

const AIAppBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    appDescription: '',
    targetUsers: '',
    keyFeatures: '',
    businessModel: '',
    budget: '',
    timeline: '',
    selectedTemplate: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [isFetchingTemplates, setIsFetchingTemplates] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState('');
  
  const [templates, setTemplates] = useState([
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      description: 'Online shop s košaricom, plaćanjem i upravljanjem proizvodima',
      features: 'Product catalog\nShopping cart\nOrder management\nPayment integration\nUser reviews',
      targetUsers: 'B2C kupci, B2B partneri',
      businessModel: 'Prodaja proizvoda uz naknadu',
    },
    {
      id: 'crm',
      name: 'CRM Sustav',
      description: 'Upravljanje klijentima, kontaktima i prodajnim prilikama',
      features: 'Contact management\nLead tracking\nSales pipeline\nTask management\nReporting dashboard',
      targetUsers: 'Prodajni timovi, Marketing, Menadžment',
      businessModel: 'B2B SaaS pretplata po korisniku',
    },
    {
      id: 'booking',
      name: 'Booking System',
      description: 'Sustav rezervacija za usluge ili resurse',
      features: 'Calendar view\nResource scheduling\nBooking management\nNotifications\nPayment processing',
      targetUsers: 'Pružatelji usluga (saloni, klinike), klijenti',
      businessModel: 'Provizija po rezervaciji',
    }
  ]);

  const steps = [
    { id: 1, title: 'Ideja & Koncept', icon: Lightbulb, color: 'text-brand-primary' },
    { id: 2, title: 'Detalji & Korisnici', icon: Layers, color: 'text-emerald-500' },
    { id: 3, title: 'AI Tehnička Preporuka', icon: Code, color: 'text-purple-500' },
    { id: 4, title: 'Slanje Upita', icon: FolderOpen, color: 'text-orange-500' }
  ];

  const applyTemplate = (template: any) => {
    setFormData({
      ...formData,
      projectName: formData.projectName || template.name,
      appDescription: formData.appDescription || template.description || '',
      keyFeatures: formData.keyFeatures || template.features || '',
      targetUsers: formData.targetUsers || template.targetUsers || '',
      businessModel: formData.businessModel || template.businessModel || '',
      selectedTemplate: template.id
    });
  };

  const callAI = async (prompt: string) => {
    try {
      const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      return response.text || '';
    } catch (error) {
      console.error('Gemini error:', error);
      return '';
    }
  };

  const fetchDynamicTemplates = async () => {
    if (!formData.projectName) return;
    setIsFetchingTemplates(true);
    try {
      const prompt = `Kao solution arhitekt, za projekt pod nazivom "${formData.projectName}", predloži top 5 arhitektonskih predložaka i tipova aplikacija koji najbolje odgovaraju tom nazivu.
      
      Formatiraj odgovor ISKLJUČIVO kao validan JSON array, gdje je svaki element objekt sa sljedećim poljima:
      - id (string, jedinstveni kratki identifikator)
      - name (string, naziv aplikacijskog predloška)
      - description (string, tehnički opis aplikacije)
      - targetUsers (string, tko su ciljani korisnici ove aplikacije)
      - features (string, popis ključnih funkcionalnosti u jednom stringu, odvojeno sa '\\n')
      - businessModel (string, preporučena metoda monetizacije ili poslovnog modela)
      
      Vrati samo JSON array, bez ikakvog drugog teksta.`;

      const aiResponse = await callAI(prompt);
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTemplates(parsed);
        }
      }
    } catch (e) {
      console.error('Greška:', e);
    }
    setIsFetchingTemplates(false);
  };

  const generateAIRecommendation = async () => {
    setLoading(true);
    try {
      const prompt = `Kao iskusan Software Architect (Dario), analiziraj upit za novu aplikaciju od potencijalnog klijenta.
          
Naziv: ${formData.projectName}
Opis: ${formData.appDescription}
Korisnici: ${formData.targetUsers}
Funkcionalnosti: ${formData.keyFeatures}
Poslovni model: ${formData.businessModel}
Budžet: ${formData.budget || 'Nije definirano'}

Tvoj zadatak je generirati jednostavnu, jasnu tehničku preporuku (na hrvatskom) prilagođenu klijentu koji nije tehnički previše stručan. Preporuči:
1. Na kojim platformama bi ovo trebalo živjeti (Web, iOS, Android, Cloud?)
2. Koje tehnologije bi koristio (.NET backend, React frontend?)
3. Koje su ključne faze i preporuke za izradu.

Odgovori pitko, u 3-4 manja odlomka u Markdown formatu. NE koristi JSON i NEMOJ koristiti markdown boldavanje (zvijezdice).`;

      const response = await callAI(prompt);
      setAiRecommendation(response);
    } catch (e) {}
    setLoading(false);
  };

  const handleStepComplete = async (step: number) => {
    if (step === 2) {
      await generateAIRecommendation();
    }
    if (step < 4) {
      setCurrentStep(step + 1);
      setExpandedStep(step + 1);
    }
  };

  const generateMarkdownInquiry = () => {
    return `# NOVI PROJEKTNI UPIT: ${formData.projectName || 'N/A'}\n\n## Detalji o Projektu\n- **Opis:** ${formData.appDescription || 'N/A'}\n- **Ciljani Korisnici:** ${formData.targetUsers || 'N/A'}\n- **Budžet:** ${formData.budget || 'N/A'}\n- **Rok/Timeline:** ${formData.timeline || 'N/A'}\n\n## Ključne Funkcionalnosti\n${formData.keyFeatures || 'N/A'}\n\n## Poslovni Model\n${formData.businessModel || 'N/A'}\n\n## AI Tehnička Preporuka (generirano u aplikaciji)\n${aiRecommendation || 'Nema preporuke'}`;
  };

  const renderStepContent = (step: number) => {
    const inputClass = "w-full p-3 bg-slate-900 border border-border-dim rounded-lg text-white placeholder-slate-600 focus:border-brand-primary outline-none transition-all";
    const labelClass = "block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider text-[10px]";
    
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Naziv Aplikacije / Ideja</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="npr. Uber za Čišćenje, Platforma za Edukacije..."
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                />
                <button 
                  onClick={fetchDynamicTemplates}
                  disabled={!formData.projectName || isFetchingTemplates}
                  className="px-6 bg-brand-primary/10 border border-brand-primary text-brand-primary font-bold tracking-widest text-[10px] rounded-lg hover:bg-brand-primary hover:text-[#050810] transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center gap-2 uppercase py-3 sm:py-0"
                >
                  {isFetchingTemplates ? <RefreshCw className="animate-spin" size={16} /> : <Wand2 size={16} />}
                  <span>Pronađi Predloške</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">Savjet: Unesite okvirnu ideju i kliknite gumb za AI predloške.</p>
            </div>

            <div>
              <label className={labelClass}>
                {isFetchingTemplates ? <span className="animate-pulse text-brand-primary">Generiram top 5 predložaka...</span> : 'Odaberite osnovni model'}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {templates.map((template: any) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${formData.selectedTemplate === template.id ? 'border-brand-primary bg-brand-primary/10' : 'border-border-dim bg-slate-900 hover:border-slate-600'}`}
                    onClick={() => applyTemplate(template)}
                  >
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                       {formData.selectedTemplate === template.id && <Sparkles size={14} className="text-brand-primary" />}
                       {template.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleStepComplete(1)}
              disabled={!formData.selectedTemplate}
              className="w-full bg-brand-primary text-[#050810] font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-brand-accent transition-colors disabled:opacity-50"
            >
              Nastavi na Detalje
            </button>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg text-sm text-slate-300 font-light leading-relaxed">
              <strong>Info:</strong> Ova polja su automatski popunjena temeljem vašeg odabranog predloška. Slobodno ih izmijenite kako bi točno odgovarali onome što želite izraditi.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Opis aplikacije / Glavni cilj</label>
                <textarea
                  className={inputClass} rows={3}
                  value={formData.appDescription}
                  onChange={(e) => setFormData({...formData, appDescription: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClass}>Ciljani korisnici</label>
                <textarea
                  className={inputClass} rows={3}
                  value={formData.targetUsers}
                  onChange={(e) => setFormData({...formData, targetUsers: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>Ključne funkcionalnosti (Što aplikacija mora raditi?)</label>
              <textarea
                className={inputClass} rows={4}
                value={formData.keyFeatures}
                onChange={(e) => setFormData({...formData, keyFeatures: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Poslovni model / Monetizacija</label>
                <input
                  type="text" className={inputClass}
                  value={formData.businessModel}
                  onChange={(e) => setFormData({...formData, businessModel: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClass}>Okviran Budžet</label>
                <select 
                  className={inputClass}
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">Odaberite budžet...</option>
                  <option value="Manje od 5,000€">Manje od 5,000€</option>
                  <option value="5,000€ - 15,000€">5,000€ - 15,000€</option>
                  <option value="15,000€ - 30,000€">15,000€ - 30,000€</option>
                  <option value="30,000€+">Više od 30,000€</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Željeni Rok Isporuke</label>
                <select 
                  className={inputClass}
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                >
                  <option value="">Odaberite rok...</option>
                  <option value="Brzo (1-2 mj.)">Brzo (1-2 mj.)</option>
                  <option value="Standardno (3-6 mj.)">Standardno (3-6 mj.)</option>
                  <option value="Nije hitno (6+ mj.)">Nije hitno (6+ mj.)</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {setCurrentStep(1); setExpandedStep(1);}}
                className="w-full sm:w-1/3 border border-border-dim text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:border-slate-500 transition-colors"
              >
                Nazad
              </button>
              <button
                onClick={() => handleStepComplete(2)}
                disabled={loading || !formData.appDescription}
                className="w-full sm:w-2/3 bg-brand-primary text-[#050810] font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-brand-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : null}
                {loading ? 'Analiziram...' : 'Zahtjev za AI Preporukom'}
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            {!aiRecommendation ? (
               <div className="text-center p-10 text-slate-500">
                  <Wand2 className="mx-auto mb-4 opacity-50" size={32} />
                  <p>Preko AI-a generiram tehničku preporuku za vaš projekt...</p>
               </div>
            ) : (
              <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/50">
                    <Wand2 className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-widest text-sm">Dario.AI Tehnička Vizija</h4>
                    <p className="text-[10px] text-purple-400 uppercase tracking-widest font-mono">Generirana preporuka arhitekture klijentu</p>
                  </div>
                </div>
                
                <div className="prose prose-invert prose-p:text-slate-300 prose-p:font-light prose-p:leading-relaxed prose-li:text-slate-300 text-sm max-w-none">
                   <div dangerouslySetInnerHTML={{ __html: aiRecommendation.replace(/\n\n/g, '<br/><br/>') }} />
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {setCurrentStep(2); setExpandedStep(2);}}
                className="w-full sm:w-1/3 border border-border-dim text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:border-slate-500 transition-colors"
               >Nazad</button>
              <button
                onClick={() => handleStepComplete(3)}
                disabled={!aiRecommendation}
                className="w-full sm:w-2/3 bg-brand-primary text-[#050810] font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-brand-accent transition-colors disabled:opacity-50"
              >
                Prihvati i Pripremi Upit
              </button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-4">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-white mb-1">Projektni Upit Konstruiran!</h4>
                <p className="text-sm text-slate-400 font-light leading-relaxed">Vaša vizija i AI arhitektonska preporuka uredno su spakirani u profesionalan strukturirani dokument. Možete ga spremiti za sebe ili direktno poslati na moju e-mail adresu za daljnji razgovor.</p>
              </div>
            </div>
            
            <div className="bg-slate-950 border border-border-dim rounded-lg overflow-hidden">
               <div className="bg-slate-900 px-4 py-2 border-b border-border-dim flex justify-between items-center">
                  <span className="font-mono text-[10px] uppercase text-slate-500 font-bold tracking-widest">generirani_upit.md</span>
               </div>
               <pre className="p-6 font-mono text-[11px] leading-relaxed text-brand-primary whitespace-pre-wrap overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-white/10">
                 {generateMarkdownInquiry()}
               </pre>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border-dim">
              <button
                onClick={() => {
                  const blob = new Blob([generateMarkdownInquiry()], { type: "text/markdown" });
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(blob);
                  link.download = `upit_${(formData.projectName || 'novi_projekt').replace(/\s+/g, '_').toLowerCase()}.md`;
                  link.click();
                }}
                className="flex-1 border border-border-dim text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:border-brand-primary transition-colors flex items-center justify-center gap-2 text-xs"
              >
                Preuzmi kao .MD Datoteku
              </button>
              <button
                onClick={() => {
                  navigate('/#contact', {
                    state: {
                      projectInquiry: generateMarkdownInquiry(),
                      projectName: formData.projectName || "Novi_Projekt"
                    }
                  });
                }}
                className="flex-1 bg-brand-primary text-[#050810] font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 text-xs"
              >
                <MessageSquare size={16} /> <span>Otvori u Get in Touch AI Asistentu</span>
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white uppercase tracking-tight">AI Startup <span className="text-brand-primary">Wizard</span></h2>
        <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
          Pretvorite okvirne ideje u profesionalan tehnički arhitektonski upit pomoću AI inteligencije — olakšavamo Vam proces dogovora.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-flow-col gap-4 mb-10 overflow-x-auto pb-4 snap-x">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all snap-start min-w-[200px] ${isActive ? 'border-brand-primary bg-brand-primary/10 shadow-[0_0_15px_rgba(30,58,138,0.3)]' : isCompleted ? 'border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10' : 'border-border-dim bg-slate-900 hover:border-slate-700'}`}
              onClick={() => {
                if (isCompleted || isActive || step.id === 1) setExpandedStep(step.id);
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={step.color} size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">Faza 0{step.id}</span>
              </div>
              <h3 className="font-bold text-sm text-white">{step.title}</h3>
              {isCompleted && <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-2 flex items-center gap-1"><Sparkles size={10} /> Završeno</span>}
            </div>
          );
        })}
      </div>

      <div className="bg-[#050810]/50 backdrop-blur-3xl border border-border-dim rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-4 md:p-8">
        {steps.map((step) => (
          <div key={step.id} className="mb-4 last:mb-0">
            <div
              className={`flex items-center justify-between p-5 rounded-lg cursor-pointer transition-colors border ${expandedStep === step.id ? 'bg-slate-900 border-brand-primary/50 shadow-inner' : 'bg-slate-900/50 border-border-dim hover:border-slate-700'}`}
              onClick={() => {
                if (currentStep >= step.id) setExpandedStep(expandedStep === step.id ? null : step.id);
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg bg-slate-950 border border-border-dim ${step.color}`}>
                  {React.createElement(step.icon, { size: 20 })}
                </div>
                <span className="font-bold text-white text-lg tracking-tight uppercase font-display">{step.title}</span>
              </div>
              {expandedStep === step.id ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-500" />}
            </div>
            
            {expandedStep === step.id && (
              <div className="mt-4 p-4 sm:p-6 lg:p-8 border-l-2 border-brand-primary bg-slate-900/50 rounded-r-xl">
                {renderStepContent(step.id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIAppBuilder;
