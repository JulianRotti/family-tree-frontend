import React from 'react';
import FamilyCallToAction from '../components/ui/FamilyCallToAction.js';
import { FaTree } from 'react-icons/fa';  // Use any icon you want

const HomePage = () => {
  return (
    <div>
      <FamilyCallToAction
        mainTitle="Explore"       // Main title
        highlightedText="your family"                  // Highlighted text (e.g., "made easy")
        description="Add family members and relationships, visualize your family tree."
        icon={FaTree}                                // Pass the icon you want to display
        buttonText1="Get Started"
        buttonText2="Discover More"
      />
    </div>
  );
};

export default HomePage;
