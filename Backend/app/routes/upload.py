import os
import shutil

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from pydantic import BaseModel

from app.services.ocr_service import (
    extract_text
)

from app.services.ollama_service import (
    analyze_text
)

router = APIRouter()

# ==========================================
# UPLOAD FOLDER
# ==========================================

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

# ==========================================
# FILE UPLOAD API
# ==========================================

@router.post("/upload")

async def upload_file(

    file: UploadFile = File(...)

):

    try:

        # ==========================================
        # SAVE FILE
        # ==========================================

        file_path = os.path.join(

            UPLOAD_DIR,

            file.filename

        )

        with open(

            file_path,

            "wb"

        ) as buffer:

            shutil.copyfileobj(

                file.file,

                buffer

            )

        # ==========================================
        # OCR / TEXT EXTRACTION
        # ==========================================

        extracted_text = extract_text(
            file_path
        )

        print("\nEXTRACTED TEXT:")
        print(extracted_text)

        # ==========================================
        # AI ANALYSIS
        # ==========================================

        ai_response = analyze_text(
            extracted_text
        )

        return {

            "success": True,

            "filename":
                file.filename,

            "extracted_text":
                extracted_text,

            "ai_response":
                ai_response

        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }


# ==========================================
# ANALYZE TEXT API
# ==========================================

class TextInput(BaseModel):
    text: str


@router.post("/analyze-text")

async def analyze_text_route(

    body: TextInput

):

    try:

        # ==========================================
        # AI ANALYSIS
        # ==========================================

        ai_response = analyze_text(
            body.text
        )

        return {

            "success": True,

            "ai_response": ai_response

        }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)

        }