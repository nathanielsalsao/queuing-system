import React, { useState } from 'react';
import axios from 'axios';

const JoinQueue = () => {
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState('Consultation');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<{ ticketNumber: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/queue/add', {
        customerName,
        serviceType
      });
      setTicket(response.data);
    } catch (error) {
      alert("Make sure your backend is running on port 5000!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] px-4 text-white">
      
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl">
        
        {!ticket ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Join the Queue 🚀
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <div>
                <label className="text-sm text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="text-sm text-slate-300">Select Service</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1e293b] border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing">Billing</option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Get Ticket"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fade-in">
            
            {/* Success Icon */}
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-slate-400">You're in line!</p>
            
            <h1 className="text-6xl font-black text-white my-4 tracking-widest">
              #{ticket.ticketNumber}
            </h1>

            <p className="text-sm text-slate-500">
              Please wait for your number to be called
            </p>

            <button
              onClick={() => {
                setTicket(null);
                setCustomerName('');
              }}
              className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
            >
              Get another ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinQueue;