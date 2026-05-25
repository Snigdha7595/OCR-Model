import requests
import json

# ==========================================
# OLLAMA URL
# ==========================================

OLLAMA_URL = "http://localhost:11434/api/generate"

# ==========================================
# PROMPT
# ==========================================

PROMPT = """
You are an AI Safety Form Extraction Assistant.

Extract structured form fields from the given text.

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- If value missing return empty string ""

Extract these fields:

1. unit_name
2. department
3. visited_section
4. observer_name
5. duration
6. risk_type

Allowed unit_name values:
- Angul
- Raigarh

Allowed department values:
- Coke Oven
- Blast Furnace

Allowed visited_section values:
- Mechanical
- Electrical
- Production

Example Output:

{
  "unit_name": "Angul",
  "department": "Coke Oven",
  "visited_section": "Mechanical",
  "observer_name": "Ritik Sharma",
  "duration": "45 Minutes",
  "risk_type": "Oil Leakage"
}

Now analyze this text carefully:

"""

# ==========================================
# ANALYZE TEXT
# ==========================================

def analyze_text(text):

    payload = {

        "model": "gemma:2b",

        "prompt": PROMPT + "\n" + text,

        "stream": False,

        "options": {

            "temperature": 0.1,

            "num_predict": 200

        }

    }

    try:

        # ==========================================
        # SEND REQUEST
        # ==========================================

        response = requests.post(

            OLLAMA_URL,

            json=payload,

            timeout=120

        )

        # ==========================================
        # CONVERT TO JSON
        # ==========================================

        result = response.json()

        print("\n========================")
        print("OLLAMA RESPONSE")
        print("========================")
        print(result)

        # ==========================================
        # HANDLE MODEL ERROR
        # ==========================================

        if "error" in result:

            return {

                "success": False,

                "error": result["error"]

            }

        # ==========================================
        # GET RAW RESPONSE
        # ==========================================

        raw_response = result.get(
            "response",
            ""
        )

        # ==========================================
        # EMPTY RESPONSE
        # ==========================================

        if not raw_response:

            return {

                "success": False,

                "error": "Empty response from AI"

            }

        # ==========================================
        # CLEAN RESPONSE
        # ==========================================

        raw_response = raw_response.strip()

        raw_response = raw_response.replace(
            "```json",
            ""
        )

        raw_response = raw_response.replace(
            "```",
            ""
        )

        print("\n========================")
        print("RAW RESPONSE")
        print("========================")
        print(raw_response)

        # ==========================================
        # FIND JSON
        # ==========================================

        start = raw_response.find("{")

        end = raw_response.rfind("}") + 1

        # ==========================================
        # INVALID JSON
        # ==========================================

        if start == -1 or end == 0:

            return {

                "success": False,

                "error": "AI did not return valid JSON",

                "raw_response": raw_response

            }

        # ==========================================
        # EXTRACT JSON
        # ==========================================

        clean_json = raw_response[start:end]

        print("\n========================")
        print("FINAL JSON")
        print("========================")
        print(clean_json)

        # ==========================================
        # PARSE JSON
        # ==========================================

        try:

            parsed_json = json.loads(
                clean_json
            )

        except Exception as json_error:

            return {

                "success": False,

                "error": f"JSON Parse Error: {str(json_error)}",

                "raw_response": raw_response

            }

        # ==========================================
        # RETURN CLEAN DATA
        # ==========================================

        return {

            "success": True,

            "ai_response": {

                "unit_name":
                    parsed_json.get(
                        "unit_name",
                        ""
                    ),

                "department":
                    parsed_json.get(
                        "department",
                        ""
                    ),

                "visited_section":
                    parsed_json.get(
                        "visited_section",
                        ""
                    ),

                "observer_name":
                    parsed_json.get(
                        "observer_name",
                        ""
                    ),

                "duration":
                    parsed_json.get(
                        "duration",
                        ""
                    ),

                "risk_type":
                    parsed_json.get(
                        "risk_type",
                        ""
                    )

            }

        }

    except Exception as e:

        print("\n========================")
        print("ERROR")
        print("========================")
        print(str(e))

        return {

            "success": False,

            "error": str(e)

        }