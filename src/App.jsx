// src/App.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { StudentsSection } from "../src/components/Student/StudentsSection";
import { Modal } from "./components/Modal";
import { StudentForm } from "../src/components/Student/StudentForm";
import { AlumniForm } from "../src/components/Alumni/AlumniForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Header } from "./components/Header";
import { AlumniSection } from "../src/components/Alumni/AlumniSection";
import { CampSection } from "../src/components/Camp/CampSection";
import { CampForm } from "../src/components/Camp/CampForm"; // default import — change if CampForm uses named export

function App() {
  const [state, setState] = useLocalStorage("studentManagementSystem", {
    students: [],
    alumni: [],
    camps: [],
    filter: "all",
    searchTerm: "",
  });

  // navigation state
  const [activeSection, setActiveSection] = useState("dashboard");

  // modals and edit states
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState(false);
  const [isCampModalOpen, setIsCampModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);

  const [editingPerson, setEditingPerson] = useState(null);

  // sidebar open for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // sample data on first mount
  useEffect(() => {
    if (
      (!state?.students || state.students.length === 0) &&
      (!state?.alumni || state.alumni.length === 0)
    ) {
      const sampleStudents = [
        {
          id: "1",
          name: "Emma Johnson",
          age: 16,
          class: "11th Grade",
          type: "school",
          contact: "+1 (555) 123-4567",
          status: "current",
          enrollmentDate: "2023-08-15",
        },
        {
          id: "2",
          name: "Michael Chen",
          age: 20,
          class: "BSc Computer Science - Year 2",
          type: "college",
          contact: "+1 (555) 987-6543",
          status: "current",
          enrollmentDate: "2023-09-01",
        },
      ];

      const sampleAlumni = [
        {
          id: "3",
          name: "Sarah Williams",
          passedYear: 2022,
          degree: "High School Diploma",
          occupation: "Software Developer",
          type: "school",
          contact: "+1 (555) 456-7890",
          status: "alumni",
        },
        {
          id: "4",
          name: "David Rodriguez",
          passedYear: 2021,
          degree: "MBA in Marketing",
          occupation: "Marketing Manager",
          type: "college",
          contact: "+1 (555) 321-9876",
          status: "alumni",
        },
      ];

      setState((prev) => ({
        ...prev,
        students: sampleStudents,
        alumni: sampleAlumni,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const students = state?.students || [];
    const alumni = state?.alumni || [];

    const schoolStudents = students.filter((s) => s.type === "school").length;
    const collegeStudents = students.filter((s) => s.type === "college").length;

    return {
      all: students.length + alumni.length,
      school: schoolStudents,
      college: collegeStudents,
      alumni: alumni.length,
    };
  }, [state]);

  // Students / Alumni handlers
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: Date.now().toString(),
      status: "current",
    };
    setState((prev) => ({
      ...prev,
      students: [...(prev.students || []), newStudent],
    }));
    setIsStudentModalOpen(false);
  };

  const addAlumni = (alumniData) => {
    const newAlumni = {
      ...alumniData,
      id: Date.now().toString(),
      status: "alumni",
    };
    setState((prev) => ({
      ...prev,
      alumni: [...(prev.alumni || []), newAlumni],
    }));
    setIsAlumniModalOpen(false);
  };

  const updatePerson = (personData) => {
    if (!editingPerson) return;

    if (editingPerson.status === "current") {
      const updatedStudent = {
        ...personData,
        id: editingPerson.id,
        status: "current",
      };
      setState((prev) => ({
        ...prev,
        students: prev.students.map((s) =>
          s.id === editingPerson.id ? updatedStudent : s
        ),
      }));
    } else {
      const updatedAlumni = {
        ...personData,
        id: editingPerson.id,
        status: "alumni",
      };
      setState((prev) => ({
        ...prev,
        alumni: prev.alumni.map((a) =>
          a.id === editingPerson.id ? updatedAlumni : a
        ),
      }));
    }

    setEditingPerson(null);
    setIsStudentModalOpen(false);
    setIsAlumniModalOpen(false);
  };

  const deletePerson = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;
    setState((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
      alumni: prev.alumni.filter((a) => a.id !== id),
    }));
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    if (person.status === "current") setIsStudentModalOpen(true);
    else setIsAlumniModalOpen(true);
  };

  const closeModals = () => {
    setIsStudentModalOpen(false);
    setIsAlumniModalOpen(false);
    setIsCampModalOpen(false);
    setEditingPerson(null);
    setEditingCamp(null);
  };

  // Camp handlers (persist in state.camps)
  const addCamp = (campData) => {
    const newCamp = { ...campData, id: Date.now().toString() };
    setState((prev) => ({ ...prev, camps: [...(prev.camps || []), newCamp] }));
  };

  const updateCamp = (campId, campData) => {
    setState((prev) => ({
      ...prev,
      camps: prev.camps.map((c) =>
        c.id === campId ? { ...c, ...campData } : c
      ),
    }));
  };

  const handleEditCamp = (camp) => {
    setEditingCamp(camp);
    setIsCampModalOpen(true);
  };

  const renderContent = () => {
    const section = String(activeSection || "").toLowerCase();

    switch (section) {
      case "dashboard":
        return (
          <Dashboard
            totalStudents={state?.students?.length || 0}
            totalAlumni={state?.alumni?.length || 0}
            students={state?.students || []}
            alumni={state?.alumni || []}
          />
        );
      case "students":
        return (
          <StudentsSection
            students={state?.students || []}
            alumni={state?.alumni || []}
            searchTerm={state?.searchTerm || ""}
            onSearchChange={(searchTerm) => setState({ ...state, searchTerm })}
            filter={state?.filter || "all"}
            onFilterChange={(filter) => setState({ ...state, filter })}
            onAddStudent={() => setIsStudentModalOpen(true)}
            onAddAlumni={() => setIsAlumniModalOpen(true)}
            onEdit={handleEdit}
            onDelete={deletePerson}
            counts={counts}
          />
        );
      case "alumni":
        return (
          <AlumniSection
            alumni={state?.alumni || []}
            searchTerm={state?.searchTerm || ""}
            onSearchChange={(searchTerm) => setState({ ...state, searchTerm })}
            onAddAlumni={() => setIsAlumniModalOpen(true)}
            onView={handleEdit}
            onDelete={deletePerson}
          />
        );
      case "camp":
      case "camps":
        return (
          <CampSection
            camps={state?.camps || []}
            onAddCamp={() => setIsCampModalOpen(true)}
            onEditCamp={handleEditCamp}
          />
        );
      case "reports":
        return <div />;
      case "settings":
        return (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">
              System configuration options coming soon...
            </p>
          </div>
        );
      default:
        return (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600">
              This section is under development...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar for large screens */}
      <div className="hidden lg:block w-64 fixed inset-y-0 left-0 bg-white border-r z-40">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={true}
          onClose={() => {}}
        />
      </div>

      {/* Mobile sidebar (overlay) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white h-full z-50">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={(s) => {
                setActiveSection(s);
                setSidebarOpen(false);
              }}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main area (right of sidebar) */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        {/* Header - sticky */}
        <div className="sticky top-0 z-30 bg-white border-b">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Header content component */}
            <Header
              totalStudents={state?.students?.length || 0}
              totalAlumni={state?.alumni?.length || 0}
            />

            {/* spacer for alignment */}
            <div className="w-10" />
          </div>
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-auto p-6">{renderContent()}</div>
      </div>

      {/* Modals (overlay, outside scrollable container) */}

      {/* Student Modal */}
      <Modal
        isOpen={isStudentModalOpen}
        onClose={closeModals}
        title={editingPerson ? "Edit Student" : "Add New Student"}
      >
        <StudentForm
          student={
            editingPerson?.status === "current" ? editingPerson : undefined
          }
          onSubmit={editingPerson ? updatePerson : addStudent}
          onCancel={closeModals}
        />
      </Modal>

      {/* Alumni Modal */}
      <Modal
        isOpen={isAlumniModalOpen}
        onClose={closeModals}
        title={editingPerson ? "Edit Alumni" : "Add New Alumni"}
      >
        <AlumniForm
          alumni={
            editingPerson?.status === "alumni" ? editingPerson : undefined
          }
          onSubmit={editingPerson ? updatePerson : addAlumni}
          onCancel={closeModals}
        />
      </Modal>

      {/* Camp Modal */}
      <Modal
        isOpen={isCampModalOpen}
        onClose={closeModals}
        title={editingCamp ? "Edit Camp" : "Add New Camp"}
      >
        <CampForm
          camp={editingCamp ? editingCamp : undefined}
          onAdd={(campData) => {
            if (editingCamp) {
              updateCamp(editingCamp.id, campData);
            } else {
              addCamp(campData);
            }
            closeModals();
          }}
          onCancel={closeModals}
        />
      </Modal>
    </div>
  );
}

export default App;
