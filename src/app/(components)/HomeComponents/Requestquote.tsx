'use client';

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { useState, memo } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@sterivio.com",
  },
  {
    icon: MapPin,
    label: "Regions",
    value: "U.S. & Canada",
  },
  {
    icon: Clock,
    label: "Lead Times",
    value: "Stock 7-10 days · Custom 3-6 weeks",
  },
];

const Requestquote = memo(function Requestquote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error || "Could not send your request. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch {
      setErrorMessage("Could not send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="relative w-full bg-white py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 uppercase tracking-tight">
            Request a Quote
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4" />
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Get in touch with us for custom orders and inquiries
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-cyan-500 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-gray-900 mb-1 uppercase tracking-tight">
                      {info.label}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-900 rounded-lg p-6 border-2 border-gray-900"
            >
              <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight">
                Important Information
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                All products are for professional use. Trademarks and product names are property of their respective owners.
              </p>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-md focus:border-cyan-500 focus:outline-none transition-colors duration-300 text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                {/* Company Field */}
                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-md focus:border-cyan-500 focus:outline-none transition-colors duration-300 text-gray-900"
                    placeholder="Your Company"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-md focus:border-cyan-500 focus:outline-none transition-colors duration-300 text-gray-900"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-md focus:border-cyan-500 focus:outline-none transition-colors duration-300 text-gray-900"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-md focus:border-cyan-500 focus:outline-none transition-colors duration-300 text-gray-900 resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {/* Submit Button */}
                {errorMessage && (
                  <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitted || isSubmitting}
                  className={`w-full px-8 py-4 font-bold text-lg rounded-md shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-3 ${
                    submitted
                      ? 'bg-green-500 text-white' 
                      : isSubmitting
                        ? 'bg-cyan-400 text-white cursor-not-allowed'
                        : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  }`}
                >
                  {submitted ? (
                    <>
                      <span>✓ Request Sent</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Request</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Requestquote;
