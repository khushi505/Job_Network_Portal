from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF

app = Flask(__name__)
CORS(app)

KNOWN_SKILLS = {
    "Python", "JavaScript", "Java", "C++", "React", "Node.js",
    "HTML", "CSS", "SQL", "MongoDB", "Express", "Flask", "Django",
    "Tailwind", "TypeScript", "AWS", "Git", "REST", "Docker"
}

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

if __name__ == "__main__":
    app.run(port=5001)
