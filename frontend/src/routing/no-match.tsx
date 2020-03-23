import React from "react";

/**
 * This component is used as a 404 page when the
 * user navigates to a non-existing route
 */
const NoMatch = () => {
  return (
    <div className="card">
      <div className="card-block p-4">
        <h4 className="card-title">Page Not Found</h4>
        <p className="card-text">Route not found. Please try again...</p>
      </div>
    </div>
  );
};

export default NoMatch;
