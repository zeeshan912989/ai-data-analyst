import pandas as pd
import io
import json
from typing import Dict, List, Any

class DataProcessor:
    @staticmethod
    def load_data(file_content: bytes, filename: str) -> pd.DataFrame:
        """
        Loads CSV or Excel data into a Pandas DataFrame.
        """
        if filename.endswith(".csv"):
            return pd.read_csv(io.BytesIO(file_content))
        elif filename.endswith((".xlsx", ".xls")):
            return pd.read_excel(io.BytesIO(file_content))
        else:
            raise ValueError("Unsupported file format. Please upload CSV or Excel.")

    @staticmethod
    def sanitize_df(df: pd.DataFrame) -> pd.DataFrame:
        """
        Cleans the dataframe: handles NA, renames columns for consistency, etc.
        """
        # Ensure column names are strings and stripped
        df.columns = [str(c).strip() for c in df.columns]
        
        # Limit rows for the AI to analyze (to stay within token limits)
        # AI usually needs a preview/summary, not the whole thing.
        return df

    @staticmethod
    def get_summary(df: pd.DataFrame) -> Dict[str, Any]:
        """
        Generates a summary of the dataframe for the AI.
        """
        summary = {
            "columns": list(df.columns),
            "total_rows": len(df),
            "column_types": df.dtypes.astype(str).to_dict(),
            "sample_data": df.head(10).to_dict(orient="records"),
            "basic_stats": df.describe(include='all').T.to_dict() if not df.empty else {}
        }
        return summary

    @staticmethod
    def detect_numeric_cols(df: pd.DataFrame) -> List[str]:
        """
        Detects which columns are numeric for charting.
        """
        return df.select_dtypes(include=['number']).columns.tolist()

    @staticmethod
    def detect_categorical_cols(df: pd.DataFrame) -> List[str]:
        """
        Detects categorical columns (strings with low unique count).
        """
        cat_cols = []
        for col in df.columns:
            if df[col].dtype == 'object' and df[col].nunique() < 20:
                cat_cols.append(col)
        return cat_cols
