import React from 'react';
import FamilyCallToAction from '../components/ui/FamilyCallToAction.js';
import { FaTree } from 'react-icons/fa';  // Use any icon you want

const HomePage = () => {
  return (
    <div>
      <FamilyCallToAction
        mainTitle="Explore your"       // Main title
        highlightedText="family"                  // Highlighted text (e.g., "made easy")
        description="Add family members and relationship, visualize your family tree."
        icon={FaTree}                                // Pass the icon you want to display
        buttonText1="Get Started"
        buttonText2="Discover More"
      />
    </div>
  );
};

export default HomePage;
