from flask import Flask
from uuid import uuid4
import time
import json

# Generate a new Flask app
app = Flask(__name__)

@app.route('/api/challenges')
def challenges():
    return {
        "challenges": {
            "Web": [
                {
                    "id": uuid4(),
                    "name": "Challenge 1",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 100
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 200
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 200
                }
            ],
            "Cryptography": [
                {
                    "id": uuid4(),
                    "name": "Challenge 1",
                    
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 100
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 200
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 300,
                    "solved": True
                }
            ],
            "Reverse Engineering": [
                {
                    "id": uuid4(),
                    "name": "Challenge 1",
                    
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 100
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 200
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 300
                }
            ],
            "Forensics": [
                {
                    "id": uuid4(),
                    "name": "Challenge 1",
                    
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 100
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 200
                },
                {
                    "id": uuid4(),
                    "name": "Challenge 2",
                    "tags": ["HTML", "CSS", "JavaScript"],
                    "points": 300
                }
            ]
        }
    }

@app.route('/api/challenge/<challenge_id>')
def challenge(challenge_id):
    #time.sleep(5)
    return {
        "challenge": {
            "id": challenge_id,
            "name": "Challenge 1",
            "category": "Web",
            "tags": ["HTML", "CSS", "JavaScript"],
            "points": 100,
            "link": "https://example.com",
            "files": [
                {
                    "name": "file1.txt",
                    "link": "https://example.com"
                },
                {
                    "name": "file2.txt",
                    "link": "https://example.com"
                }
            ],
            "description": "This is a challenge description",
            "solved": False
        }
    }

@app.route('/api/challenge/<challenge_id>/solve', methods=['POST'])
def solve(challenge_id):
    return {
        "solved": True
    }

@app.route('/api/scoreboard')
def scoreboard():
    with open('teams.json', 'r') as f:
        teams = json.load(f)
    return {
        "scoreboard": teams['message']['teams']
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)