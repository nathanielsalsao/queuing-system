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
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl transition-all duration-500">
      {!ticket ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Name</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">Service</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-5 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="Consultation">Consultation</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Billing">Billing</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transform active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Join Queue'}
          </button>
        </form>
      ) : (
        <div className="text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium">Your Spot is Secured</p>
          <h1 className="text-7xl font-black text-white my-4">#{ticket.ticketNumber}</h1>
          <button 
            onClick={() => { setTicket(null); setCustomerName(''); }}
            className="mt-4 text-sm text-slate-500 hover:text-white underline transition-colors"
          >
            Get another ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinQueue;