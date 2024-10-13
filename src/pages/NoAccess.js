import React from 'react';
import FamilyCallToAction from '../components/ui/FamilyCallToAction.js';

const NoAccess = () => {
  return (
    <div>
      <FamilyCallToAction
        mainTitle="No"       // Main title
        highlightedText="Access"                  // Highlighted text (e.g., "made easy")
        description="You are not logged in or don't have the necessary rights to access this page."
        icon={null}                                // Pass the icon you want to display
        buttonText1="Get Started"
        buttonText2="Discover More"
      />
    </div>
  );
};

export default NoAccess;
