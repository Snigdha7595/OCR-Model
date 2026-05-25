VALID_UNITS = [
    "Angul",
    "Raigarh"
]

VALID_SECTIONS = [
    "Mechanical",
    "Electrical",
    "Production"
]

VALID_DEPARTMENTS = [
    "Coke Oven",
    "Blast Furnace"
]

def validate_dropdown(
    value,
    valid_options
):

    if value in valid_options:
        return value

    return None