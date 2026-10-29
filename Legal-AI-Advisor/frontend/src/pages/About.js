import React from 'react';
import { Brain, Database, Search, Shield, Zap, BookOpen } from 'lucide-react';

const About = () => {
  const ragSteps = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "Document Ingestion",
      description: "Legal documents are processed and split into intelligent chunks while preserving context and metadata."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Embedding Generation",
      description: "Each chunk is converted into numerical vectors using advanced language models that understand legal terminology."
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Similarity Search",
      description: "When you ask a question, the system finds the most relevant document chunks using vector similarity."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Grounded Response",
      description: "The LLM generates answers based only on retrieved documents, preventing hallucinations and ensuring accuracy."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "No Hallucinations",
      description: "Unlike general AI models, our system only provides information from your uploaded documents."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast & Accurate",
      description: "Optimized vector database enables quick retrieval of relevant legal information."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Source Citations",
      description: "Every answer includes source references for verification and further reading."
    }
  ];

  const techStack = [
    { name: "LangChain", description: "RAG framework" },
    { name: "FAISS", description: "Vector database" },
    { name: "Groq", description: "LLM inference" },
    { name: "HuggingFace", description: "Embeddings" },
    { name: "React", description: "Frontend framework" },
    { name: "Flask", description: "Backend API" }
  ];

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-legal-dark mb-6 legal-serif">
            About Legal AI Advisor
          </h1>
          <p className="text-xl text-legal-gray max-w-3xl mx-auto">
            Learn how our advanced RAG technology provides accurate legal information 
            while preventing AI hallucinations
          </p>
        </div>

        {/* What is RAG */}
        <section className="mb-20">
          <div className="legal-card p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-legal-gold rounded-full mb-4">
                <Brain className="h-8 w-8 text-legal-dark" />
              </div>
              <h2 className="text-3xl font-bold text-legal-dark mb-4 legal-serif">
                What is RAG Technology?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-legal-gray mb-6 leading-relaxed">
                  <strong>Retrieval-Augmented Generation (RAG)</strong> is an advanced AI architecture 
                  that combines the power of large language models with precise information retrieval. 
                  Unlike traditional AI models that generate responses from training data alone, 
                  RAG systems first retrieve relevant information from a knowledge base, then use 
                  that information to generate accurate, grounded responses.
                </p>
                
                <p className="text-lg text-legal-gray leading-relaxed">
                  For legal applications, this means the AI can only answer questions based on 
                  the actual legal documents you provide, eliminating the risk of fabricated or 
                  incorrect legal information.
                </p>
              </div>
              
              <div className="bg-legal-light p-6 rounded-lg">
                <h3 className="font-semibold text-legal-dark mb-4">Why RAG for Legal AI?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-legal-gray">Prevents legal hallucinations and misinformation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-legal-gray">Provides source citations for verification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-legal-gray">Handles domain-specific legal terminology</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-legal-gray">Maintains context across large legal documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How RAG Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-legal-dark mb-4 legal-serif">
              How Our RAG Pipeline Works
            </h2>
            <p className="text-lg text-legal-gray">
              Four-step process for accurate legal information retrieval
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ragSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-legal-blue text-white rounded-full mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-legal-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-legal-gray text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < ragSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-legal-gold"></div>
                      <div className="w-2 h-2 bg-legal-gold rounded-full -ml-1"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <div className="bg-legal-blue text-white rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 legal-serif">
                Key Benefits for Legal Research
              </h2>
              <p className="text-blue-100">
                Why our RAG approach is superior for legal applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center text-legal-gold mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-legal-dark mb-4 legal-serif">
              Technology Stack
            </h2>
            <p className="text-lg text-legal-gray">
              Built with cutting-edge technologies for optimal performance
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="legal-card text-center p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-legal-dark mb-2">
                  {tech.name}
                </h3>
                <p className="text-sm text-legal-gray">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Legal AI Matters */}
        <section>
          <div className="legal-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-legal-dark mb-4 legal-serif">
                Why Legal AI Matters
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-4">
                  Access to Justice
                </h3>
                <p className="text-legal-gray mb-6 leading-relaxed">
                  Legal AI democratizes access to legal information, allowing individuals, 
                  students, and small businesses to understand their rights and obligations 
                  without expensive legal consultations.
                </p>
                
                <h3 className="text-xl font-semibold text-legal-dark mb-4">
                  Efficiency in Legal Research
                </h3>
                <p className="text-legal-gray leading-relaxed">
                  Lawyers and legal professionals can quickly find relevant information 
                  across thousands of pages of legal documents, significantly reducing 
                  research time and improving accuracy.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-legal-dark mb-4">
                  Educational Value
                </h3>
                <p className="text-legal-gray mb-6 leading-relaxed">
                  Law students and educators can use the system to explore legal concepts, 
                  understand case law, and study the Indian legal system interactively.
                </p>
                
                <h3 className="text-xl font-semibold text-legal-dark mb-4">
                  Consistency and Accuracy
                </h3>
                <p className="text-legal-gray leading-relaxed">
                  RAG technology ensures that legal information is consistently accurate 
                  and sourced from authoritative documents, reducing the risk of 
                  misinterpretation or outdated information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
