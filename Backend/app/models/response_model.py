from pydantic import BaseModel

class SafetyObservationResponse(
    BaseModel
):

    unit_name: str | None = None

    department: str | None = None

    visited_section: str | None = None

    observer_name: str | None = None

    duration: str | None = None

    risk_type: str | None = None

    safety_observation: str | None = None

    recommendation: str | None = None