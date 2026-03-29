import JoinQueue from './components/JoinQueue';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden font-sans">
      {/* Decorative Background Orbs (Pure CSS) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]" />

      <div className="relative z-10 w-full px-6">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            SmartQueue
          </h1>
          <p className="mt-3 text-slate-400 font-medium">
       
          </p>
        </header>

        <main>
          <JoinQueue />
        </main>
      </div>
    </div>
  );
}

export default App;