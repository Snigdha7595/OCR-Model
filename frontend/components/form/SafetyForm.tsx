import EditableField from "./EditableField";

export default function SafetyForm({
  formData,
  setFormData,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Unit And SO Details
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <EditableField
          label="Unit Name"
          value={formData.unit_name}
          onChange={(val: string) =>
            setFormData({
              ...formData,
              unit_name: val,
            })
          }
        />

        <EditableField
          label="Department"
          value={formData.department}
          onChange={(val: string) =>
            setFormData({
              ...formData,
              department: val,
            })
          }
        />

        <EditableField
          label="Visited Section"
          value={formData.visited_section}
          onChange={(val: string) =>
            setFormData({
              ...formData,
              visited_section: val,
            })
          }
        />

        <EditableField
          label="Observer Name"
          value={formData.observer_name}
          onChange={(val: string) =>
            setFormData({
              ...formData,
              observer_name: val,
            })
          }
        />

        <EditableField
          label="Duration"
          value={formData.duration}
          onChange={(val: string) =>
            setFormData({
              ...formData,
              duration: val,
            })
          }
        />

        <EditableField
          label="Risk Type"
          value={formData.risk_type}
          onChange={(val: string) =>
            setFormData({
              ...formData,
              risk_type: val,
            })
          }
        />

      </div>

      <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg">
        Save & Next
      </button>

    </div>
  );
}