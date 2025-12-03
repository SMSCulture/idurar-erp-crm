import React, { useState } from 'react';

const companyTags = [
  "Agency",
  "Art Walk",
  "Artist",
  "Attraction/park",
  "Auctions",
  "Chamber & CVB",
  "Charity Gala / Single Event",
  "Charity / Foundation",
  "Classes",
  "Clean Up",
  "Comedy",
  "Corporate/Private Events",
  "CRA/GOVT",
  "Dance",
  "Database Only",
  "Event Productions",
  "Event Space/Supplies",
  "Farmer's Market",
  "Festival & Fairs",
  "Gallery",
  "Gardens",
  "Film",
  "Hotel",
  "kids",
  "Media",
  "Multi-Disciplinary",
  "Museums",
  "Music",
  "Nightlife",
  "Performing Arts Center",
  "Restaurant",
  "Restaurant Group",
  "Restaurant Chain",
  "Literary",
  "Partnerships",
  "PR",
  "Rental",
  "Retail",
  "Schools",
  "Theater",
  "Tours",
  "Travel",
  "TravelingShow",
  "Visual Arts",
  "Vendor",
  "Display Ad",
  "Wines / Brewery",
];

const initialB2bCompanies = [
  {
    id: 1,
    name: "Sunset Studio Gallery",
    company_tag: "Visual Arts",
    org_type: "Gallery",
    city: "Miami",
    state: "FL",
    website: "https://sunsetstudiogallery.example",
    lifecycleStage: "Lead",
    contacts: [
      {
        id: 1,
        firstName: "Carla",
        lastName: "Ramirez",
        role: "Gallery Director",
        email: "carla@sunsetstudiogallery.example",
        isPrimary: true,
      },
    ],
  },
  {
    id: 2,
    name: "Art Hive Collective",
    company_tag: "Visual Arts",
    org_type: "Studio Collective",
    city: "Fort Lauderdale",
    state: "FL",
    website: "https://arthivecollective.example",
    lifecycleStage: "MQL",
    contacts: [
      {
        id: 2,
        firstName: "Maya",
        lastName: "Alonso",
        role: "Co-Founder",
        email: "maya@arthivecollective.example",
        isPrimary: true,
      },
    ],
  },
  {
    id: 3,
    name: "Oceanfront Art Museum",
    company_tag: "Visual Arts",
    org_type: "Museum",
    city: "Miami Beach",
    state: "FL",
    website: "https://oceanfrontartmuseum.example",
    lifecycleStage: "Customer",
    contacts: [
      {
        id: 3,
        firstName: "Jordan",
        lastName: "Price",
        role: "Marketing Manager",
        email: "jordan@oceanfrontartmuseum.example",
        isPrimary: true,
      },
    ],
  },
];

export default function DevPreview() {
  const [view, setView] = useState('B2B');
  const [companies, setCompanies] = useState(initialB2bCompanies);
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('All tags');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company_tag: companyTags[0],
    org_type: '',
    city: '',
    state: '',
    lifecycleStage: 'Lead',
    contactFirstName: '',
    contactEmail: '',
  });

  // Compute filtered companies
  const filteredCompanies = companies.filter((company) => {
    // Filter by tag
    if (selectedTag !== 'All tags' && company.company_tag !== selectedTag) {
      return false;
    }

    // Filter by search text (case-insensitive)
    if (searchText.trim() === '') {
      return true;
    }

    const searchLower = searchText.toLowerCase();
    const primary = company.contacts.find((c) => c.isPrimary) || company.contacts[0] || {};
    const primaryName = primary.firstName
      ? `${primary.firstName} ${primary.lastName}`.toLowerCase()
      : '';

    return (
      company.name.toLowerCase().includes(searchLower) ||
      company.city.toLowerCase().includes(searchLower) ||
      primaryName.includes(searchLower)
    );
  });

  // Add company
  const handleAddCompany = (e) => {
    e.preventDefault();

    const newId = companies.length > 0 ? Math.max(...companies.map((c) => c.id)) + 1 : 1;
    const newCompany = {
      id: newId,
      name: formData.name,
      company_tag: formData.company_tag,
      org_type: formData.org_type,
      city: formData.city,
      state: formData.state,
      website: '',
      lifecycleStage: formData.lifecycleStage,
      contacts: [
        {
          id: newId,
          firstName: formData.contactFirstName,
          lastName: '',
          role: '',
          email: formData.contactEmail,
          isPrimary: true,
        },
      ],
    };

    setCompanies([...companies, newCompany]);
    setFormData({
      name: '',
      company_tag: companyTags[0],
      org_type: '',
      city: '',
      state: '',
      lifecycleStage: 'Lead',
      contactFirstName: '',
      contactEmail: '',
    });
  };

  // Delete company
  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>CultureOwl CRM — Dev Preview</h1>

      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setView('B2B')}
          style={{
            marginRight: 8,
            padding: '8px 12px',
            backgroundColor: view === 'B2B' ? '#1976d2' : '#eee',
            color: view === 'B2B' ? '#fff' : '#000',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Show B2B
        </button>

        <button
          onClick={() => setView('B2C')}
          style={{
            padding: '8px 12px',
            backgroundColor: view === 'B2C' ? '#1976d2' : '#eee',
            color: view === 'B2C' ? '#fff' : '#000',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Show B2C
        </button>
      </div>

      {view === 'B2B' ? (
        <div>
          <h2 style={{ marginTop: 0 }}>B2B Companies</h2>

          {/* Filters */}
          <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search companies…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                padding: '6px 8px',
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: 14,
              }}
            />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{
                padding: '6px 8px',
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: 14,
              }}
            >
              <option>All tags</option>
              {companyTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Add Company Form */}
          <div style={{ marginBottom: 20, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 4 }}>
            <h3 style={{ marginTop: 0 }}>Add Company</h3>
            <form onSubmit={handleAddCompany}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <select
                  name="company_tag"
                  value={formData.company_tag}
                  onChange={handleFormChange}
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                >
                  {companyTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Org Type"
                  name="org_type"
                  value={formData.org_type}
                  onChange={handleFormChange}
                  required
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  required
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  required
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <select
                  name="lifecycleStage"
                  value={formData.lifecycleStage}
                  onChange={handleFormChange}
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                >
                  <option>Lead</option>
                  <option>MQL</option>
                  <option>Customer</option>
                </select>
                <input
                  type="text"
                  placeholder="Primary Contact First Name"
                  name="contactFirstName"
                  value={formData.contactFirstName}
                  onChange={handleFormChange}
                  required
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <input
                  type="email"
                  placeholder="Primary Contact Email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleFormChange}
                  required
                  style={{ padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  marginTop: 10,
                  padding: '8px 12px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Add Company
              </button>
            </form>
          </div>

          {/* Companies Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Company Name</th>
                  <th style={thStyle}>Company Tag</th>
                  <th style={thStyle}>Org Type</th>
                  <th style={thStyle}>City</th>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Lifecycle Stage</th>
                  <th style={thStyle}>Primary Contact</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((c) => {
                  const primary = c.contacts.find((p) => p.isPrimary) || c.contacts[0] || {};
                  const primaryText = primary.firstName
                    ? `${primary.firstName} ${primary.lastName} – ${primary.email}`
                    : '';

                  return (
                    <tr key={c.id}>
                      <td style={tdStyle}>{c.name}</td>
                      <td style={tdStyle}>{c.company_tag}</td>
                      <td style={tdStyle}>{c.org_type}</td>
                      <td style={tdStyle}>{c.city}</td>
                      <td style={tdStyle}>{c.state}</td>
                      <td style={tdStyle}>{c.lifecycleStage}</td>
                      <td style={tdStyle}>{primaryText}</td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleDeleteCompany(c.id)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 3,
                            cursor: 'pointer',
                            fontSize: 12,
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredCompanies.length === 0 && (
              <p style={{ textAlign: 'center', color: '#999', marginTop: 12 }}>
                No companies found.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>B2C</h2>
          <p>B2C view coming soon — this will show individual consumers, not companies.</p>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '8px 6px',
  borderBottom: '2px solid #ddd',
  backgroundColor: '#f5f5f5',
  fontWeight: 'bold',
};
const tdStyle = {
  padding: '8px 6px',
  borderBottom: '1px solid #f0f0f0',
};

