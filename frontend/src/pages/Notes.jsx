import Logo from "../assets/notenest.png";
import Logout from "../assets/logout.svg";
import { Link } from "react-router-dom";
import '../styles/Notes.css';
import api from "../api";
import { useEffect, useState } from "react";
import {Search, Plus, StickyNote, Pencil, Trash2} from "lucide-react";

export default function Notes() {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/");
    };


    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await api.get("/api/user/");
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const addNote = async () => {
        if (!formData.title || !formData.content) return;

        try {
            await api.post("/notenest/notes/", formData);

            await fetchNotes();

            setFormData({ title: "", content: "" });
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchNotes = async () => {
        try {
            const res = await api.get("/notenest/notes/");
            setNotes(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
        fetchNotes();
    }, []);


    const handleEdit = (note) => {
        setFormData({
            title: note.title,
            content: note.content,
        });

        setEditingId(note.id);
        setShowForm(true);
    };

    const updateNote = async () => {
        if (!formData.title || !formData.content) return;

        try {
            await api.put(`/notenest/notes/update/${editingId}/`, formData);

            await fetchNotes();

            setFormData({ title: "", content: "" });
            setEditingId(null);
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    };


    const deleteNote = async (id) => {
        try {
            await api.delete(`/notenest/notes/delete/${id}/`);

            await fetchNotes();
        } catch (error) {
            console.log(error);
        }
    };


    const filteredNotes = notes.filter(
        (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="container-fluid">
            <div className="container-fluid app-details">
                <div className="container d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={Logo} alt="notenest logo" className="img-fluid app-logo" />
                        <h4 className="app-name mt-3">NoteNest</h4>
                    </div>

                    
                    <div className="right-side d-flex align-items-center">
                        <div className="email mt-3 me-2">
                            {user && (
                                <p>{user.email}</p>
                            )}
                        </div>
                        <div className='login-btn'>
                            <button onClick={handleLogout} className='login rounded-pill pt-2 pb-2 ps-3 pe-3 border border-1'>
                                <img src={Logout} alt="logout icon" className="img-fluid pe-1 logout" />
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 d-flex align-items-center justify-content-between">
                <div className="notes-header">
                    <h2>Your <span className="text-notes">notes</span></h2>
                    <p> {filteredNotes.length} entries</p>
                </div>

                <div className="right-section d-flex align-items-center">
                    <div className="search-bar d-flex align-items-center">
                        <input 
                            type="text" 
                            placeholder="Search notes..." 
                            className="search rounded-pill ps-2 p-1"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <span className="search-icon">
                            <Search size={18} />
                        </span>
                    </div>

                    <button onClick={() => setShowForm(true)} className="ms-4 btn btn-dark rounded-pill d-flex align-items-center">
                        <Plus size={18}  className="pe-1"/> New
                    </button>
                </div>
            </div>

            {filteredNotes.length === 0 ? (
                <div className="container d-flex flex-column align-items-center justify-content-center blank-page mt-5 pt-5 pb-5 rounded">
                    <h2>A blank page awaits</h2>

                    <p>Capture your first thought</p>

                    <button className="btn btn-dark rounded-pill d-flex align-items-center mt-2" onClick={() => setShowForm(true)}>
                        <Plus size={18}  className="pe-1"/> Write a note
                    </button>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        {filteredNotes.map((note) => (
                            <div className="col-12 col-sm-4 col-lg-4 notes-written d-flex justify-content-between mt-4 rounded p-2 me-3">
                                <div className="content-section">
                                    <h2>{note.title}</h2>

                                    <p>
                                        {note.content}
                                    </p>

                                    <small className="note-date">
                                        {note.date}
                                    </small>
                                </div>

                                <div className="features d-flex align-items-start">
                                    <button className="btn btn-light rounded-circle" onClick={() => handleEdit(note)}>
                                        <Pencil size={14} color="blue" />
                                    </button>

                                    <button className="btn btn-light rounded-circle" onClick={() => deleteNote(note.id)}>
                                        <Trash2 size={14} color="red" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) }

            { showForm && (
                <div className="container-fluid note-main d-flex align-items-center justify-content-center">
                    <div className="container p-4 create-note d-flex flex-column rounded">
                        <h3>Create a note</h3>

                        <input
                            className="note-title mb-3 p-1 rounded"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                ...formData,
                                title: e.target.value,
                                })
                            }
                        />

                        <textarea
                            rows="5"
                            className="note-content mb-3 p-1 rounded"
                            placeholder="Write something..."
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({
                                ...formData,
                                content: e.target.value,
                            })
                            }
                        />

                        <div className="d-flex justify-content-end gap-2">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                setShowForm(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-dark rounded-pill"
                                onClick={
                                    editingId
                                        ? updateNote
                                        : addNote
                                }
                            >
                                {editingId ? "Update Note" : "Save Note"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}