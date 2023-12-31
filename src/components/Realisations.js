import React, { useState, useEffect } from 'react';
import '../css-styles/Realisations.scss';
import ScreenImage from '../images/Screen-Pc.png';
import data from '../portfolio.json';
import BarCharge from './BarCharge';
import Modal from './Modal';
import { useColorContext } from '../components/ColorContext';

function Realisations() {
  // Color options
  const { colorOptions, currentColorIndex } = useColorContext();
  const currentColorOption = colorOptions[currentColorIndex];

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isBarChargeVisible, setIsBarChargeVisible] = useState(true);
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectInModal, setProjectInModal] = useState(null);

  const projectTitles = data.map(item => item.title);
  const projectImages = data.map(item => item.imageUrl);
  const projectCoverImages = data.map(item => item.coverImageUrl);

  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);

  useEffect(() => {
    // Simulate a loading delay
    const delay = setTimeout(() => {
      setIsBarChargeVisible(false); // Hide BarCharge when loading is complete
      setIsProjectVisible(true); // Show the real project
      // Select a random project to display by default
      const randomIndex = Math.floor(Math.random() * projectTitles.length);
      setSelectedProjectIndex(randomIndex);
    }, 3000); // You can adjust the delay duration as needed

    return () => clearTimeout(delay);
  }, []);

  const handleProjectClick = index => {
    setSelectedProjectIndex(index);
    setIsBarChargeVisible(false); // Hide BarCharge on click
    setProjectInModal(data[index]); // Set the project to display in the modal
    setIsModalOpen(true); // Open the modal
  };

  const handleProjectMouseEnter = index => {
    setHoveredProjectIndex(index);
  };

  const handleProjectMouseLeave = () => {
    setHoveredProjectIndex(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div id="realisations" className="container-realisation">
      <div>
        <h2 className="title-realisation" style={{ color: currentColorOption.title }}>
          Réalisations
        </h2>
      </div>
      <div className="all-real-container">
        <div className="screen-real-container">
          {isBarChargeVisible && <BarCharge />}
          <img className="screen-pc" src={ScreenImage} alt="Écran PC" />
          {isProjectVisible && selectedProjectIndex !== null && (
            <img
              className="view-real"
              src={`${process.env.PUBLIC_URL}${projectImages[selectedProjectIndex]}`}
              alt={`Projet ${projectTitles[selectedProjectIndex]}`}
              style={{ opacity: 1 }} // Display the real project with opacity 1 (fully visible)
            />
          )}
        </div>
        <div className="project-container">
          {projectTitles.map((title, index) => (
            <div
              key={index}
              className={`project-image-container ${
                hoveredProjectIndex === index ? 'hovered' : ''
              }`}
              onMouseEnter={() => handleProjectMouseEnter(index)}
              onMouseLeave={handleProjectMouseLeave}
              onClick={() => handleProjectClick(index)}
            >
              <div className="project-image-overlay">
                <div className="project-text">
                  <h3>{title}</h3>
                  <button onClick={() => handleProjectClick(index)}>Voir plus</button>
                </div>
              </div>
              <img
                className="project-image"
                src={`${process.env.PUBLIC_URL}${projectCoverImages[index]}`}
                alt={`Projet ${title}`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Display the modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} project={projectInModal} />
    </div>
  );
}

export default Realisations;