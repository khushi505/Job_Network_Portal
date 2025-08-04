from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
from sentence_transformers import SentenceTransformer
import numpy as np

app = Flask(__name__)
CORS(app)

# ----------- Static Skill Set for Extraction -----------
KNOWN_SKILLS = {
    "Python", "JavaScript", "Java", "C++", "React", "Node.js",
    "HTML", "CSS", "SQL", "MongoDB", "Express", "Flask", "Django",
    "Tailwind", "TypeScript", "AWS", "Git", "REST", "Docker"
}

# ----------- Load Sentence Transformer Model -----------
model = SentenceTransformer('all-MiniLM-L6-v2')


# ----------- Endpoint 1: Resume Skill Extraction -----------
@app.route("/extract_skills", methods=["POST"])
def extract_skills():
    if "resume" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["resume"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        doc = fitz.open(stream=file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()

        found_skills = [skill for skill in KNOWN_SKILLS if skill.lower() in text.lower()]
        return jsonify({"skills": found_skills}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------- Endpoint 2: Smart Job Suggestions -----------
@app.route("/smart_suggestions", methods=["POST"])
def smart_suggestions():
    data = request.get_json()

    print("=== SMART SUGGESTIONS REQUEST ===")
    print("user_profile:", data.get("user_profile"))
    print("job_listings count:", len(data.get("job_listings", [])))

    user_profile = data.get("user_profile")
    job_listings = data.get("job_listings")

    if not user_profile or not job_listings:
        return jsonify({"error": "Missing data"}), 400

    try:
        user_embedding = model.encode(user_profile, normalize_embeddings=True)

        ranked_jobs = []
        for job in job_listings:
            job_text = f"{job.get('title', '')} {job.get('description', '')} {' '.join(job.get('skills', []))}".strip()

            # Skip empty or garbage job descriptions
            if len(job.get("title", "")) < 5 or len(job.get("description", "")) < 5:
                continue

            job_embedding = model.encode(job_text, normalize_embeddings=True)
            score = float(np.dot(user_embedding, job_embedding))

            print(f"Job: {job.get('title')} - Score: {round(score * 100, 2)}%")

            # Filter jobs with reasonable semantic similarity
            if score >= 0.25:
                ranked_jobs.append({
                    **job,
                    "score": round(score * 100, 2)
                })

        ranked_jobs.sort(key=lambda x: x["score"], reverse=True)
        return jsonify(ranked_jobs)

    except Exception as e:
        print("Smart Suggestion Error:", e)
        return jsonify({"error": str(e)}), 500


# ----------- Run the Flask App -----------
if __name__ == "__main__":
    app.run(port=5001)
