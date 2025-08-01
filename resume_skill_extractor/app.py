from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

# Define a simple keyword list for skills (customize as needed)
SKILL_KEYWORDS = [
    "React", "Node", "Express", "MongoDB", "PostgreSQL", "Docker", "AWS",
    "JavaScript", "Python", "Java", "TypeScript", "HTML", "CSS", "C++", "Git"
]

@app.route("/extract-skills", methods=["POST"])
def extract_skills():
    data = request.get_json()
    text = data.get("text", "")

    doc = nlp(text)
    found_skills = []

    for token in doc:
        for skill in SKILL_KEYWORDS:
            if skill.lower() in token.text.lower() and skill not in found_skills:
                found_skills.append(skill)

    return jsonify({"skills": found_skills})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
