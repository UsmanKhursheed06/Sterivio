'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock, Send, Building2, User, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@sterivio.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MapPin,
    label: "Regions",
    value: "U.S. & Canada",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    label: "Lead Times",
    value: "Stock 7-10 days · Custom 3-6 weeks",
    color: "from-purple-500 to-pink-500",
  },
];

export default function Requestquote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [lottieError, setLottieError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    
    // Show success dialog
    setShowSuccessDialog(true);
    
    // Reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      message: "",
    });
  };

  const closeDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <section id="quote" className="relative w-full bg-gradient-to-b from-background via-accent/5 to-background py-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.08),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
            Request a Quote
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3 mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for custom orders and inquiries. We&apos;re here to help you find the perfect instruments.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/50 overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}
                    >
                      <info.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {info.label}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Disclaimer Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10" />
              <div className="relative space-y-3 text-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-chart-2 rounded-full" />
                  <h3 className="text-lg font-bold text-white">Important Information</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  All products are for professional use. Trademarks and product names are property of their respective owners.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <User className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === "name" ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div className="relative">
                  <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Building2 className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === "company" ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Mail className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === "email" ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-4 z-10">
                      <MessageSquare className={`w-5 h-5 transition-colors duration-300 ${
                        focusedField === "message" ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(245, 158, 11, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold text-lg rounded-xl shadow-xl overflow-hidden transition-all duration-300"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <span>Send Request</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>
              </form>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-chart-3/20 to-primary/20 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccessDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-card border-2 border-primary/30 rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
              >
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-chart-2/5 to-chart-3/10" />
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeDialog}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 hover:bg-background border border-border rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                {/* Content */}
                <div className="relative text-center">
                  {/* Lottie Animation with error fallback */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-48 h-48 mx-auto mb-4"
                  >
                    {!lottieError ? (
                      <DotLottieReact
                        src="https://lottie.host/c9ef9ed2-025c-4cb7-9b76-bc7811f56fcf/1dryInmAjs.lottie"
                        loop
                        autoplay
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                      Request Sent Successfully!
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3 mx-auto rounded-full" />
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Thank you for reaching out! We&apos;ve received your request and will contact you soon.
                    </p>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px rgba(245, 158, 11, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeDialog}
                    className="group relative mt-6 px-8 py-3 bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-primary-foreground font-bold rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <span className="relative">Got it!</span>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
