# RobJob aka Rob: *Rob*ot *Job* Assistant
Meet **RobJob** aka Rob, your *Rob*ot *Job* search and professional development assistant.

## Problem
UWaterloo students looking for co-op, internship, and new grad roles often find positions with odd. 

Powered by Gemini, Rob takes your resume and information from an open job posting to determine your suitability for a position. If you're not suitable in any way, Rob can suggest resources to improve your technical skills and chances of obtaining the job.

### How to Run
1. Clone the repository:
   `git clone https://github.com/Teatot/EngHack_2026`
2. Retrieve a Gemini API key from [Google AI Studio](https://aistudio.google.com/api-keys). Note that you will need a Google account to create your key.
3. In the Backend folder, copy `.env.example` to `.env` and replace ```{YOUR GOOGLE_API_KEY}``` with your Gemini API key from Google AI Studio.
4. In the root folder, run ```StartApp.ps1```. 

### Environment Variables
- Store secrets in `.env` for local development.
- Never commit `.env` or API keys.
- Use deployment secret storage (GitHub Secrets / Key Vault / Secrets Manager).

### Credits