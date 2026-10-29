import React from 'react';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-legal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-legal-gold rounded-lg">
                <Scale className="h-6 w-6 text-legal-dark" />
              </div>
              <div>
                <h3 className="text-lg font-bold legal-serif">
                  Legal AI Advisor
                </h3>
                <p className="text-sm text-gray-300">
                  Indian Legal System
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered legal advisor providing accurate information from uploaded legal documents. 
              Built with advanced RAG technology for reliable legal assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-legal-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/chat" className="text-gray-300 hover:text-legal-gold transition-colors">
                  Ask Legal AI
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-legal-gold transition-colors">
                  About RAG Technology
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-300 hover:text-legal-gold transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Technology Stack</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>• LangChain RAG Pipeline</p>
              <p>• FAISS Vector Database</p>
              <p>• Groq LLM Integration</p>
              <p>• HuggingFace Embeddings</p>
              <p>• React + Flask Architecture</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2024 Legal AI Advisor. Built for educational and research purposes.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">
                Not a substitute for professional legal advice
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
