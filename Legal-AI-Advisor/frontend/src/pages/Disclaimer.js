import React from 'react';
import { AlertTriangle, Scale, Shield, Info } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-legal-dark mb-6 legal-serif">
            Important Disclaimer
          </h1>
          <p className="text-xl text-legal-gray">
            Please read this carefully before using the Legal AI Advisor
          </p>
        </div>

        {/* Main Disclaimer Card */}
        <div className="legal-card p-8 mb-8 border-l-4 border-red-500">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-legal-dark mb-4">
                Not Legal Advice
              </h2>
              <p className="text-lg text-legal-gray leading-relaxed mb-4">
                <strong>This AI is NOT a substitute for a qualified lawyer and is intended for informational purposes only.</strong>
              </p>
              <p className="text-legal-gray leading-relaxed">
                The information provided by this AI system does not constitute legal advice, attorney-client relationship, 
                or any other professional relationship. You should not rely on this information as a substitute for 
                professional legal advice from a qualified attorney.
              </p>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="legal-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="h-6 w-6 text-legal-gold" />
              <h3 className="text-lg font-semibold text-legal-dark">
                No Attorney-Client Relationship
              </h3>
            </div>
            <p className="text-legal-gray leading-relaxed">
              Using this system does not create an attorney-client relationship. 
              Communications with this AI are not confidential or privileged.
            </p>
          </div>

          <div className="legal-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-legal-gold" />
              <h3 className="text-lg font-semibold text-legal-dark">
                Information Limitations
              </h3>
            </div>
            <p className="text-legal-gray leading-relaxed">
              The AI only provides information from uploaded documents. It may not have 
              access to current laws, recent case law, or jurisdiction-specific requirements.
            </p>
          </div>

          <div className="legal-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="h-6 w-6 text-legal-gold" />
              <h3 className="text-lg font-semibold text-legal-dark">
                Verify Information
              </h3>
            </div>
            <p className="text-legal-gray leading-relaxed">
              Always verify legal information with authoritative sources and consult 
              qualified legal professionals for important matters.
            </p>
          </div>

          <div className="legal-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-legal-gold" />
              <h3 className="text-lg font-semibold text-legal-dark">
                No Guarantee of Accuracy
              </h3>
            </div>
            <p className="text-legal-gray leading-relaxed">
              While we strive for accuracy, we cannot guarantee the completeness, 
              accuracy, or timeliness of the information provided.
            </p>
          </div>
        </div>

        {/* When to Consult a Lawyer */}
        <div className="bg-legal-blue text-white rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 legal-serif">
            When to Consult a Qualified Lawyer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-legal-gold">Always consult a lawyer for:</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Criminal charges or investigations</li>
                <li>• Lawsuits or legal disputes</li>
                <li>• Contract drafting or review</li>
                <li>• Property transactions</li>
                <li>• Family law matters</li>
                <li>• Business formation and compliance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-legal-gold">Seek legal advice when:</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Rights or obligations are unclear</li>
                <li>• Significant financial interests are involved</li>
                <li>• Time-sensitive legal deadlines exist</li>
                <li>• Multiple jurisdictions are involved</li>
                <li>• Complex legal issues arise</li>
                <li>• You need confidential legal advice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Situations */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-red-800 mb-3">
            Emergency Situations
          </h3>
          <p className="text-red-700 leading-relaxed">
            If you are facing an emergency situation involving immediate danger, arrest, or 
            urgent legal matters, contact a qualified lawyer immediately or call emergency 
            services. This AI system is not equipped to handle time-sensitive legal emergencies.
          </p>
        </div>

        {/* Limitations of AI */}
        <div className="legal-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-legal-dark mb-6 legal-serif">
            Technical Limitations
          </h2>
          <div className="space-y-4 text-legal-gray">
            <p className="leading-relaxed">
              <strong>Document Dependency:</strong> The AI can only answer questions based on 
              the documents you upload. It cannot access external legal databases or current laws.
            </p>
            <p className="leading-relaxed">
              <strong>Context Understanding:</strong> While advanced, the AI may not fully 
              understand the nuanced context of your specific legal situation.
            </p>
            <p className="leading-relaxed">
              <strong>Jurisdictional Variations:</strong> Indian law varies by state and jurisdiction. 
              The AI may not capture these local variations.
            </p>
            <p className="leading-relaxed">
              <strong>Recent Changes:</strong> Laws and regulations change frequently. 
              Uploaded documents may not reflect the most current legal requirements.
            </p>
          </div>
        </div>

        {/* User Responsibility */}
        <div className="bg-legal-light rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-legal-dark mb-4">
            Your Responsibility
          </h3>
          <ul className="space-y-2 text-legal-gray">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Verify all legal information with authoritative sources</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Consult qualified legal professionals for important matters</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Do not rely solely on AI information for legal decisions</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-legal-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Understand the limitations of AI legal assistance</span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <div className="legal-card p-6">
            <h3 className="text-lg font-semibold text-legal-dark mb-4">
              Need Professional Legal Help?
            </h3>
            <p className="text-legal-gray mb-4">
              For qualified legal advice, consult with a licensed attorney in your jurisdiction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-sm text-legal-gray">
                <strong>Bar Council of India:</strong> Provides lawyer directories
              </div>
              <div className="text-sm text-legal-gray">
                <strong>Legal Aid Services:</strong> Available for those who cannot afford legal representation
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 text-center text-sm text-legal-gray">
          <p>
            By using this Legal AI Advisor, you acknowledge that you have read, understood, 
            and agree to this disclaimer. You agree to use the information provided at your own risk.
          </p>
          <p className="mt-2">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
