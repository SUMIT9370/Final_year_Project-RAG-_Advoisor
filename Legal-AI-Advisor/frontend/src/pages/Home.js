import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, BookOpen, Shield, Zap, Search, FileText } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "RAG Technology",
      description: "Advanced Retrieval-Augmented Generation ensures answers come only from your uploaded documents"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "No Hallucinations",
      description: "Built-in safeguards prevent AI from making up legal information not found in documents"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Multiple Formats",
      description: "Support for PDF, DOCX, and TXT legal documents including acts, judgments, and contracts"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Responses",
      description: "Optimized pipeline delivers quick legal answers with source citations"
    }
  ];

  const legalDocs = [
    "Indian Penal Code",
    "Constitution of India",
    "Court Judgments",
    "Legal Acts",
    "Contracts",
    "Regulations"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <Scale className="h-12 w-12 text-legal-gold" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 legal-serif">
              AI Powered Indian Legal Advisor
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Get accurate legal answers from your uploaded documents. 
              No hallucinations, just reliable information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="legal-button-primary bg-legal-gold text-legal-dark hover:bg-yellow-400 inline-flex items-center justify-center space-x-2"
              >
                <span>Ask Legal AI</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="legal-button-secondary bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 inline-flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Learn About RAG
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-dark mb-4 legal-serif">
              Why Choose Legal AI Advisor?
            </h2>
            <p className="text-lg text-legal-gray max-w-2xl mx-auto">
              Built with cutting-edge RAG technology specifically for Indian legal documents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="legal-card hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center text-legal-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-legal-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-legal-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Documents */}
      <section className="py-20 bg-legal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-legal-dark mb-6 legal-serif">
                Supported Legal Documents
              </h2>
              <p className="text-lg text-legal-gray mb-8">
                Upload any Indian legal document and get instant answers with source citations. 
                Our AI understands legal terminology and context.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {legalDocs.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-legal-gold rounded-full"></div>
                    <span className="text-legal-dark">{doc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link 
                  to="/chat" 
                  className="legal-button-primary inline-flex items-center space-x-2"
                >
                  <span>Upload Documents</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="legal-card p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-legal-gold rounded-lg">
                    <FileText className="h-6 w-6 text-legal-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-legal-dark mb-2">
                      Step 1: Upload Documents
                    </h4>
                    <p className="text-legal-gray text-sm">
                      Drag and drop PDF, DOCX, or TXT files containing legal information
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-legal-gold rounded-lg">
                    <Search className="h-6 w-6 text-legal-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-legal-dark mb-2">
                      Step 2: Ask Questions
                    </h4>
                    <p className="text-legal-gray text-sm">
                      Type your legal queries in natural language
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-legal-gold rounded-lg">
                    <Shield className="h-6 w-6 text-legal-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-legal-dark mb-2">
                      Step 3: Get Reliable Answers
                    </h4>
                    <p className="text-legal-gray text-sm">
                      Receive accurate responses with source citations from your documents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-legal-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 legal-serif">
            Ready to Experience Legal AI?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Upload your legal documents and start getting accurate answers now.
          </p>
          <Link 
            to="/chat" 
            className="legal-button-primary bg-legal-gold text-legal-dark hover:bg-yellow-400 inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Get Started</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
          
          <div className="mt-8 text-sm text-blue-100">
            <p>Remember: This AI is for informational purposes only and not a substitute for professional legal advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
