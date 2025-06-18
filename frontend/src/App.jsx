import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/clients')
      .then(res => {
        setClients(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch clients');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clients Table</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">First Visit</th>
            <th className="border px-4 py-2">Next Visit</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{client.name}</td>
              <td className="border px-4 py-2">{new Date(client.firstVisit).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(client.nextVisit).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{client.amount}</td>
              <td className="border px-4 py-2">{client.phone}</td>
              <td className="border px-4 py-2">{client.location}</td>
              <td className="border px-4 py-2">{client.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
