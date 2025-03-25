import React from 'react';
import '../../styles/components/Announcement.scss';

const Announcement = ({ message }) => {
  return (
    <div className="announcement">
      <p>{message}</p>
    </div>
  );
};

export default Announcement;