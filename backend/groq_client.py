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
        Generates AI Insights based on table summary using a Senior Analyst persona.
        """
        # Prepare the dataset context for the prompt
        dataset_context = f"""
        Columns: {summary['columns']}
        Column Types: {summary['column_types']}
        Total Rows: {summary['total_rows']}
        Basic Stats Summary: {json.dumps(summary.get('basic_stats', {}), indent=2)}
        Sample Data Preview: {json.dumps(summary['sample_data'][:5], indent=2)}
        """

        prompt = f"""
You are a senior business data analyst and reporting expert.
Analyze the provided dataset and generate a complete professional report suitable for dashboards, trends visualization, and PDF export.

🎯 OBJECTIVE:
Turn raw data into:
* Trends
* Insights
* Structured report
* Export-ready content

📊 ANALYSIS REQUIREMENTS:
1. 📈 Trends & Patterns
* Identify growth or decline over time
* Highlight seasonal patterns (if any)
* Detect sudden spikes or drops

2. 🏆 Top Performers
* Best performing product/category
* Highest sales or profit contributors
* Explain WHY they performed well

3. ⚠️ Underperformers
* Lowest performing items
* Possible reasons (low demand, pricing, etc.)

4. 📊 Key Metrics
* Total Sales/Volume
* Average Sales/Values
* Growth percentage (if applicable)

5. 🔍 Anomalies Detection
* Any unusual values or outliers
* Sudden increase/decrease

💡 BUSINESS INSIGHTS:
* Provide clear, actionable insights
* Use simple business language
* Focus on improving revenue and decision-making

📄 REPORT FORMAT (IMPORTANT):
Return response in structured format:
### 📊 Summary
### 📈 Trends
### 🏆 Top Performers
### ⚠️ Underperformers
### 📊 Key Metrics
* Total:
* Average:
* Growth: (if applicable)
### 💡 Recommendations

📤 EXPORT REQUIREMENTS:
* Format output cleanly for PDF export
* Use headings and bullet points
* Avoid long paragraphs
* Keep it readable and professional

⚠️ RULES:
* Do NOT guess missing data
* Only use provided dataset
* Keep response concise but insightful
* Avoid technical jargon

DATASET SUMMARY:
{dataset_context}
        """
        
        response = self.client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a senior business data analyst and reporting expert. Only return the report content."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.4,
            max_tokens=3072
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
