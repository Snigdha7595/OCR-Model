ALLOWED_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".pdf",
    ".docx"
]

def allowed_file(filename):

    filename = filename.lower()

    return any(
        filename.endswith(ext)
        for ext in ALLOWED_EXTENSIONS
    )