import pandas as pd
import io
import numpy as np
from typing import Dict, List, Any

class DataProcessor:
    @staticmethod
    def load_data(file_content: bytes, filename: str) -> pd.DataFrame:
        """
        Loads CSV or Excel data into a Pandas DataFrame.
        """
        try:
            if filename.endswith(".csv"):
                return pd.read_csv(io.BytesIO(file_content))
            elif filename.endswith((".xlsx", ".xls")):
                return pd.read_excel(io.BytesIO(file_content))
            else:
                raise ValueError("Unsupported file format.")
        except Exception as e:
            raise ValueError(f"Error reading file: {str(e)}")

    @staticmethod
    def sanitize_output(data: Any) -> Any:
        """
        Helper to recursively clean JSON-unfriendly float values.
        """
        if isinstance(data, float):
            if np.isnan(data) or np.isinf(data):
                return None
            return data
        elif isinstance(data, dict):
            return {k: DataProcessor.sanitize_output(v) for k, v in data.items()}
        elif isinstance(data, list):
            return [DataProcessor.sanitize_output(v) for v in data]
        return data

    @staticmethod
    def get_summary(df: pd.DataFrame) -> Dict[str, Any]:
        """
        Generates a summary of the dataframe for the AI.
        """
        # Ensure it's not empty
        if df.empty:
            return {"columns": [], "total_rows": 0, "sample_data": [], "basic_stats": {}}

        # Replace inf with nan first
        df_clean = df.replace([np.inf, -np.inf], np.nan)
        
        # Describe stats
        stats_df = df_clean.describe(include='all').T
        basic_stats = stats_df.where(pd.notnull(stats_df), None).to_dict()

        # Sample data
        sample_df = df_clean.head(10).where(pd.notnull(df_clean.head(10)), None)

        summary = {
            "columns": list(df.columns),
            "total_rows": len(df),
            "column_types": df.dtypes.astype(str).to_dict(),
            "sample_data": sample_df.to_dict(orient="records"),
            "basic_stats": basic_stats
        }
        
        # Final safety cleanup for any hidden nested NaNs/Infs
        return DataProcessor.sanitize_output(summary)

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
