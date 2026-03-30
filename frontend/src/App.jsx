import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Circle, Sparkles, Loader2, Forward } from "lucide-react";

function App() {
    const [url, setUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!url) return;
        setLoading(true);
        setSummary(""); // Clear old summary while loading
        try {
            const response = await axios.post(
                "http://localhost:8000/summarize",
                { url },
            );
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error fetching summary:", error);
            setSummary(
                "### Summary Failed\nLikely causes:\n1. Invalid URL.\n2. Video lacks English captions.",
            );
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen font-sans relative overflow-hidden text-zinc-100 flex flex-col antialiased">
            {/* 1. The Aether Background Gradient (Inspiration: image_1.png) */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-zinc-950">
                {/* Sky/Purple - Make sure these span the full width */}
                <div className="absolute inset-x-0 -top-40 h-[600px] w-full bg-gradient-to-b from-[#B4C6FC]/60 to-[#E4CBF5]/40 blur-[130px]" />

                {/* Peach */}
                <div className="absolute inset-x-0 bottom-0 h-[600px] w-full bg-gradient-to-t from-[#FFD3B6]/80 to-[#E4CBF5]/20 blur-[130px]" />

                {/* Central Core */}
                <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-[#FF7F0F]/50 rounded-full blur-[140px]" />
            </div>

            {/* Main Content Area */}
            <main className="w-full flex-1 flex flex-col items-center pt-24 px-4 pb-16 space-y-12">
                {/* Header - Styled to match the light-gradient look */}
                <header className="text-center space-y-2 relative z-10">
                    <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                        Youtube Video Summarizer
                    </h1>
                    <p className="text-zinc-700 text-xl font-medium">
                        AI-powered insights for your content.
                    </p>
                </header>

                {/* 2. The Input Capsule (Inspiration: image_1.png dark bar) */}
                {/* Add 'group' here so the aura knows when the input is focused */}
                <div className="w-full max-w-2xl relative z-10 group">
                    {/* The Mega Aura */}
                    <div
                        className="absolute inset-0 rounded-full opacity-0 scale-90 group-focus-within:opacity-100 group-focus-within:scale-150 blur-[100px] transition-all duration-1000 pointer-events-none -z-10"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(37,99,235,0.2) 70%, transparent 100%)",
                            animation:
                                "aura-pulse 4s infinite ease-in-out",
                        }}
                    />

                    {/* The Input Bar */}
                    <div
                        className="flex items-center gap-1.5 p-2 pr-4 bg-zinc-950/80 backdrop-blur-2xl rounded-full border border-zinc-800 
    /* The Hover Glow */
    hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] 
    /* The Focus State (already there) */
    group-focus-within:border-blue-500/50 group-focus-within:shadow-[0_0_30px_rgba(59,130,246,0.2)] 
    transition-all duration-300 relative z-10"
                    >
                        {" "}
                        {/* Left Icon */}
                        <div className="flex gap-2 items-center pl-4 text-zinc-600">
                            <Circle size={20} />
                            <span className="w-px h-5 bg-zinc-800 mx-1" />
                        </div>
                        {/* Input Area */}
                        <input
                            type="text"
                            placeholder="Paste YouTube URL here..."
                            className="flex-1 bg-transparent border-none outline-none p-2.5 text-lg text-zinc-100 placeholder:text-zinc-600 font-medium"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {/* Action Button */}
                        <button
                            onClick={handleSummarize}
                            disabled={loading}
                            className="w-10 h-10 bg-zinc-50 hover:bg-zinc-400 disabled:bg-zinc-700 text-zinc-950 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <Forward className="text-zinc-600" size={24} />
                            )}
                        </button>
                    </div>
                </div>

                {/* 3. The Result Section (Inspiration: image_1.png Bento Grid box) */}
                {loading && (
                    <div className="w-full max-w-2xl text-center pt-8 text-zinc-700 text-lg flex flex-col items-center gap-4 animate-pulse">
                        <Loader2
                            className="animate-spin text-blue-500"
                            size={40}
                        />
                        Gemini is processing the transcript...
                    </div>
                )}

                {summary && (
                    <div className="w-full max-w-4xl bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800 rounded-[36px] p-10 md:p-14 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
                        {/* Colored Glow Accent that references the background (Aether style) */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

                        <header className="flex items-center justify_between border-b border-zinc-800 gap-x-1 pb-6 mb-8 relative z-10">
                            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                                <Sparkles
                                    className="text-zinc-400"
                                    size={22}
                                />
                                Key Takeaways
                            </h2>
                            <span className="text-xs font-mono px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500">
                                Gemini 3 Flash
                            </span>
                        </header>

                        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-li:my-2 relative z-10 prose-headings:tracking-tighter prose-headings:font-extrabold prose-strong:text-zinc-100">
                            <ReactMarkdown>{summary}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
