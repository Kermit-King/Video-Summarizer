from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils import get_video_id, get_transcript, summarize_text

app = FastAPI(title="YT Summarizer API")

class VideoRequest(BaseModel):
    url: str

@app.post("/summarize")
async def summarize_video(request: VideoRequest):
    video_id = get_video_id(request.url)
    
    transcript = get_transcript(video_id)
    if not transcript:
        raise HTTPException(status_code=404, detail="Transcript not found for this video.")

    summary = summarize_text(transcript)
    
    return {
        "video_id": video_id,
        "summary": summary
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)