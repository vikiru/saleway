import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from gemini.prompt import prompt

load_dotenv()

MODEL_NAME = 'gemini-3.1-flash-lite'
client = genai.Client(
    api_key=os.environ.get('GEMINI_API_KEY'),
)

generate_content_config = types.GenerateContentConfig(
    thinking_config=types.ThinkingConfig(thinking_budget=0),
    response_mime_type='application/json',
    system_instruction=[
        types.Part.from_text(text=prompt),
    ],
)
