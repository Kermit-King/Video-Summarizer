import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Play, Sparkles, Loader2 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!url) return;
    setLoading(true);
    try {
      // Point this to your FastAPI endpoint (usually port 8000)
      const response = await axios.post('http://localhost:8000/summarize', { url });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to get summary. Check if the video has captions!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Video Summarizer
          </h1>
          <p className="text-zinc-400 text-lg">AI-powered insights for your favorite content.</p>
        </header>

        {/* Input Section */}
        <div className="flex gap-2 p-2 bg-zinc-900 rounded-2xl border border-zinc-800 focus-within:border-blue-500 transition-all">
          <div className="flex items-center pl-3 text-zinc-500">
            <Play size={18} />
            {/* <img src='https://static.vecteezy.com/system/resources/thumbnails/018/930/572/small_2x/youtube-logo-youtube-icon-transparent-free-png.png' height="42"/> */}
          </div>
          <input 
            type="text" 
            placeholder="Paste YouTube URL here..." 
            className="flex-1 bg-transparent border-none outline-none p-3 text-zinc-100"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={handleSummarize}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loading ? "Thinking..." : "Summarize"}
          </button>
        </div>

        {/* Result Section */}
        {summary && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-semibold mb-4 border-b border-zinc-800 pb-2 text-blue-400">Key Takeaways</h2>
            <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-li:my-2">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;