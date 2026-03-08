# RobJob aka Rob: *Rob*ot *Job* Assistant
Meet **RobJob** aka Rob, your *Rob*ot *Job* search and professional development assistant built into your browser.

## Problem
UWaterloo students looking for co-op, internship, and new grad roles often find positions with skills that seem beyond their capabilities. Worse, some students (especially 1A and 1B) frequently wonder and Google how to get these skills, only to be overwhelemed by the sheer number of resources online!

RobJob (though we prefer Rob) is a Chrome extension that solves this problem. Not only does it gauge your suitability for a job, but it also suggests where to start. Powered by Gemini, Rob takes your resume and information from an open job posting to determine your suitability for a position. If you're not suitable in any way, Rob provides links to improve your technical skills and chances of obtaining the job.

## Key Features
* Upload multiple resumes into the extension.
  * Multiple resumes can be stored at a time.
  * Select your resume of choice for evaluation by Rob.
* Receive a score from 0 to 100 based on how well you suit the job posting on the current tab.
* Receive a list of areas/skills for improvement and another list of strengths.
  * Immediately receive access to links for getting started/improving technical skills relevant to the job posting.

## Tech Stack
### Core Technologies
* HTML/CSS
* TypeScript/JavaScript
* React
* PowerShell and Bash (just a tiny bit...)
* Node.js
### External Packages
* Google Gemini / AI Studio
* React Libraries
  * Mozilla Readability
  * Mutler

## How to Run
### Prerequisites
We assume you are using Windows and have Google Chrome and Node.js installed. If not, please ensure you have a compatible computer with the appropriate software.

Note that Chromium-based browsers may work, but we cannot guarantee support.

### Steps
1. Clone the repository:
   `git clone https://github.com/Teatot/EngHack_2026`
2. Retrieve a Gemini API key from [Google AI Studio](https://aistudio.google.com/api-keys). Note that you will need a Google account to create your key.
3. In the Backend folder, copy `.env.example` to `.env` and replace `{YOUR GOOGLE_API_KEY}` with your Gemini API key from Google AI Studio.
4. In the root folder, run `StartApp.ps1`.
5. In Chrome/a Chromium-based browser, go to `chrome://extensions` and enable "Developer Mode". Click "Load unpacked" and open `/Frontend/dist`.

### Credits
* Perplexity for troubleshooting code snippets during frontend and backend development.
* GitHub Copilot by Microsoft, ChatGPT by OpenAI, and Gemini by Google for additional troubleshooting.
* Designing Hub on Vecteezy.com for the application icon.
* StackOverflow for relevant code snippets and solutions.