import React from 'react';
import { Link } from 'react-router-dom';
import './ListPageLayout.css'; // We'll create this for styling

function ListPageLayout({ title, add_new_path, children }) {
  return (
    <div className="list-page-container">
      <header className="list-page-header">
        <h1>{title}</h1>
        <Link to={add_new_path} className="add-new-button">
          + Add New {title.slice(0, -1)} 
        </Link>
      </header>
      <main className="list-page-content">
        {children}
      </main>
    </div>
  );
}

export default ListPageLayout;