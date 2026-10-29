import React, { useState, useEffect, useRef } from 'react';
import { Send, Upload, X, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onDrop = async (acceptedFiles) => {
    const files = acceptedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      return validTypes.includes(file.type) || file.name.toLowerCase().endsWith('.txt');
    });

    if (files.length !== acceptedFiles.length) {
      toast.error('Some files were rejected. Only PDF, DOCX, and TXT files are supported.');
    }

    for (const file of files) {
      await uploadFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const uploadFile = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUploadedFiles(prev => [...prev, {
          name: file.name,
          size: file.size,
          uploadTime: new Date().toLocaleTimeString()
        }]);
        toast.success(`Successfully uploaded: ${file.name}`);
      } else {
        toast.error(response.data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.error || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/ask', {
        question: input.trim()
      });

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.data.data.answer,
        sources: response.data.data.sources || [],
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (response.data.data.error) {
        toast.error('AI encountered an error processing your question');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your question. Please try again.',
        error: true,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.success('Chat cleared');
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-legal-dark mb-4 legal-serif">
            Ask Legal AI
          </h1>
          <p className="text-lg text-legal-gray">
            Upload legal documents and ask questions about Indian law
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="legal-card">
              <h3 className="font-semibold text-legal-dark mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Documents
              </h3>
              
              <div
                {...getRootProps()}
                className={`upload-area cursor-pointer ${isDragActive ? 'dragover' : ''}`}
              >
                <input {...getInputProps()} />
                <Upload className="h-8 w-8 text-legal-gray mx-auto mb-2" />
                <p className="text-sm text-legal-gray">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className="text-xs text-legal-gray mt-1">
                  PDF, DOCX, TXT (Max 50MB)
                </p>
              </div>

              {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-legal-blue" />
                  <span className="ml-2 text-sm text-legal-gray">Uploading...</span>
                </div>
              )}
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="legal-card">
                <h3 className="font-semibold text-legal-dark mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Uploaded Files
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-start justify-between p-2 bg-legal-light rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-legal-dark truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-legal-gray">
                          {formatFileSize(file.size)} • {file.uploadTime}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-2 p-1 text-legal-gray hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={clearChat}
                className="w-full legal-button-secondary text-sm"
                disabled={messages.length === 0}
              >
                Clear Chat
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="chat-container h-[600px]">
              {/* Messages */}
              <div className="chat-messages">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-legal-light rounded-full mb-4">
                      <FileText className="h-8 w-8 text-legal-gray" />
                    </div>
                    <h3 className="text-lg font-medium text-legal-dark mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-legal-gray">
                      Upload legal documents and ask questions about Indian law
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.type}`}
                    >
                      <div className={`chat-bubble ${message.type} ${message.error ? 'border-red-500 bg-red-50' : ''}`}>
                        {message.error && (
                          <div className="flex items-center text-red-600 mb-2">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span className="text-xs font-medium">Error</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs mt-2 opacity-70">
                          {message.timestamp}
                        </div>
                        
                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium opacity-80">Sources:</p>
                            {message.sources.map((source, index) => (
                              <div key={index} className="source-citation">
                                <div className="source-citation-title">
                                  Source {index + 1}
                                </div>
                                <div className="source-citation-content">
                                  {source.content}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="chat-message assistant">
                    <div className="chat-bubble assistant">
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t border-legal-border p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Indian law..."
                    className="flex-1 legal-input"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="legal-button-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
