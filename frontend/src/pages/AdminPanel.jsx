import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Users,
    Home,
    Calendar,
    Plus,
    Trash2,
    Edit,
    Search,
    UserCircle,
    CheckCircle2,
    XCircle,
    Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [currentUser, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (activeTab === 'users') {
                const res = await axios.get('http://localhost:5000/api/auth/users', config);
                setUsers(res.data.data || []);
            } else if (activeTab === 'rooms') {
                const res = await axios.get('http://localhost:5000/api/rooms', config);
                setRooms(res.data.data || []);
            } else if (activeTab === 'bookings') {
                const res = await axios.get('http://localhost:5000/api/bookings', config);
                setBookings(res.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRoom = async (id) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRooms(rooms.filter(room => room.id !== id));
        } catch (error) {
            alert('Error deleting room');
        }
    };

    const renderUsers = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                    <UserCircle size={18} />
                                </div>
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.is_online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    {user.is_online ? 'Online' : 'Offline'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderRooms = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800">Room Inventory</h3>
                <button className="bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all">
                    <Plus size={18} />
                    <span>Add Room</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map(room => (
                    <div key={room.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="h-40 bg-gray-200 relative">
                            {room.image_url ? (
                                <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Home size={40} />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex space-y-2 flex-col">
                                <button className="p-2 bg-white/90 text-gray-600 rounded-lg hover:text-primary transition-all">
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteRoom(room.id)}
                                    className="p-2 bg-white/90 text-gray-600 rounded-lg hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-gray-800">{room.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{room.type}</span>
                                <span className="text-primary font-bold">${room.price}/hr</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBookings = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Room</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {bookings.map(booking => (
                        <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">{booking.user_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{booking.room_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {new Date(booking.check_in).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {booking.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FCF9F6] pt-10 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-2">Manage users, venues, and monitor system activity.</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <Users size={18} />
                            <span>Users</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('rooms')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all ${activeTab === 'rooms' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <Home size={18} />
                            <span>Rooms</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all ${activeTab === 'bookings' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <Calendar size={18} />
                            <span>Bookings</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin text-primary">
                            <Info size={40} />
                        </div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'users' && renderUsers()}
                        {activeTab === 'rooms' && renderRooms()}
                        {activeTab === 'bookings' && renderBookings()}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
