import os
import json
from typing import Dict, List, Any
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class GroqClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable is not set.")
        self.client = Groq(api_key=self.api_key)

    def analyze_data(self, summary: Dict[str, Any]) -> str:
        """
        Generates AI Insights based on table summary.
        """
        prompt = f"""
        Analyze this dataset summary and provide high-level insights.
        Columns: {summary['columns']}
        Types: {summary['column_types']}
        Rows: {summary['total_rows']}
        Sample: {json.dumps(summary['sample_data'][:3], indent=2)}

        Focus on:
        1. Key trends
        2. Anomalies/Outliers
        3. Strategic recommendations

        Output should be structured Markdown. Keep it professional and concise.
        """
        
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a professional Data Analyst AI."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.3,
            max_tokens=2048
        )
        return response.choices[0].message.content

    def ask_data(self, query: str, summary: Dict[str, Any]) -> str:
        """
        Answers natural language question based on dataset.
        """
        prompt = f"""
        Answer this question based ONLY on the following dataset summary.
        Question: {query}

        Dataset Summary:
        Columns: {summary['columns']}
        Rows: {summary['total_rows']}
        Sample Data: {json.dumps(summary['sample_data'], indent=2)}

        If you cannot find the answer, say "I don't have enough data to answer that specific question."
        Be precise and data-driven.
        """
        
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a specialized Data Analyst QA agent."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0,
            max_tokens=1024
        )
        return response.choices[0].message.content
