"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, RefreshCw, Sparkles, CornerDownLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

const SUGGESTIONS = [
  "What grooming instruments do you offer?",
  "Tell me about veterinary dental tools.",
  "Do you have hemostatic forceps?",
  "What is in the Grooming Catalog?",
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your Sterivio Catalog Assistant. Ask me anything about our precision surgical, veterinary, or grooming instruments!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    // Add an empty assistant message that we will stream into
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, role: "assistant", content: "" },
    ]);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          streamText += chunk;

          // Update the specific streaming message
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId ? { ...m, content: streamText } : m
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
              ...m,
              content:
                "I apologize, but I encountered an error connecting to the service. Please try again in a moment.",
            }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I am your Sterivio Catalog Assistant. Ask me anything about our precision surgical, veterinary, or grooming instruments!",
      },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] h-[580px] max-h-[calc(100vh-120px)] bg-slate-900/95 border border-slate-800 text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide">Sterivio Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[10px] text-slate-400 font-medium">Catalog Expert</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4 cool-scrollbar"
            >
              {messages.map((message) => {
                const isBot = message.role === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${isBot
                          ? "bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-tl-none"
                          : "bg-blue-600 text-white rounded-tr-none shadow-md"
                        }`}
                    >
                      {/* Render text with basic markdown/bullet lines */}
                      <div className="whitespace-pre-wrap font-sans">
                        {message.content ? (
                          message.content.split("\n").map((line, i) => {
                            // Render simple bullets
                            if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                              return (
                                <li key={i} className="ml-4 list-disc my-1">
                                  {line.replace(/^[\*\-\s]+/, "")}
                                </li>
                              );
                            }
                            // Bold mapping
                            const parts = line.split(/(\*\*.*?\*\*)/g);
                            return (
                              <p key={i} className={line === "" ? "h-2" : "my-0.5"}>
                                {parts.map((part, pi) => {
                                  if (part.startsWith("**") && part.endsWith("**")) {
                                    return <strong key={pi} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
                                  }
                                  return part;
                                })}
                              </p>
                            );
                          })
                        ) : (
                          // Streaming/loading placeholder
                          <div className="flex items-center gap-1 py-1">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions (only shown when chat is fresh or bot is idle) */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" /> Suggested Queries
                </span>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(suggestion)}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-left transition-all duration-150"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800/80">
              <div className="relative flex items-end bg-slate-900 border border-slate-800 rounded-xl focus-within:border-blue-500/80 transition-all">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about our instruments..."
                  className="flex-1 py-3 pl-3 pr-12 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none resize-none max-h-24 min-h-[44px]"
                  style={{ height: "auto" }}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
                  {input.trim() && (
                    <span className="hidden sm:flex items-center gap-0.5 text-[10px] text-slate-500 mr-1 font-mono">
                      <span>Enter</span>
                      <CornerDownLeft className="w-2.5 h-2.5" />
                    </span>
                  )}
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || isLoading}
                    className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${input.trim() && !isLoading
                        ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-1.5 text-center">
                <span className="text-[9px] text-slate-500">
                  Your personal assistant
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-blue-400/20 relative"
      >
        {/* Eye-catching pulsing sonar ring effect when closed */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-blue-500/50 animate-ping" style={{ animationDuration: '2.5s' }}></span>
            <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-pulse"></span>
          </>
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Pulse notification badge */}
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-500 border-2 border-blue-600 rounded-full"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
