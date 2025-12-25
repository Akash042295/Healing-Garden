import React, { useState } from 'react';

const FactsPage = () => {
  // State to track which card is clicked for the center view
  const [selectedPlant, setSelectedPlant] = useState(null);

  const herbalPlants = [
    { id: 1, name: "Tulsi", sciName: "Ocimum tenuiflorum", image: "assets/tulsi.png", uses: "Immunity booster", details: "Known as the 'Queen of Herbs', it helps the body adapt to stress and promotes mental clarity and long life." },
    { id: 2, name: "Aloe Vera", sciName: "Aloe barbadensis", image: "assets/lavender.png", uses: "Skin healing", details: "Contains 75 active constituents. It is highly effective for healing burns, moisturizing skin, and supporting digestion." },
    { id: 3, name: "Ashwagandha", sciName: "Withania somnifera", image: "assets/dandelion.png", uses: "Energy & Brain function", details: "A powerful ancient medicinal herb that reduces cortisol levels, helps manage anxiety, and increases physical strength." },
    { id: 4, name: "Peppermint", sciName: "Mentha piperita", image: "assets/leaf1.png", uses: "Digestive aid", details: "Relaxes the muscles of your digestive system. It is also used to provide relief from tension headaches and focus the mind." },
    { id: 5, name: "Turmeric", sciName: "Curcuma longa", image: "assets/leaf2.png", uses: "Anti-inflammatory", details: "Contains Curcumin, which has powerful anti-inflammatory effects and is a very strong antioxidant for heart and joint health." }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Herbal Battle Cards</h1>
      
      {/* 1. The Main Grid of Cards */}
      <div style={styles.cardGrid}>
        {herbalPlants.map((plant) => (
          <div key={plant.id} style={styles.battleCard} onClick={() => setSelectedPlant(plant)}>
            <div style={styles.cardHeader}>{plant.name}</div>
            <div style={styles.imageBox}>
                <img src={plant.image} alt={plant.name} style={styles.img} />
            </div>
            <div style={styles.stats}>
              <p><strong>[Scientific Name]</strong></p>
              <p style={styles.sciText}>{plant.sciName}</p>
              <p style={{ marginTop: '10px' }}><strong>[Primary Uses]</strong></p>
              <p>{plant.uses}</p>
            </div>
            <div style={styles.clickHint}>Click to Expand</div>
          </div>
        ))}
      </div>

      {/* 2. The Center Modal (Shows only when a plant is selected) */}
      {selectedPlant && (
        <div style={styles.overlay} onClick={() => setSelectedPlant(null)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setSelectedPlant(null)}>X</button>
            
            <div style={styles.modalHeader}>{selectedPlant.name}</div>
            
            <div style={styles.modalImageBox}>
              <img src={selectedPlant.image} alt={selectedPlant.name} style={styles.modalImg} />
            </div>

            <div style={styles.modalContent}>
              <p><strong>Scientific Name:</strong> <i>{selectedPlant.sciName}</i></p>
              <p style={{ marginTop: '10px' }}><strong>Healing Powers:</strong> {selectedPlant.uses}</p>
              <hr style={styles.divider} />
              <p><strong>Full Description:</strong></p>
              <p style={styles.detailsText}>{selectedPlant.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles object defined outside the component
const styles = {
  container: { padding: '120px 20px 60px', backgroundColor: '#1b3306', minHeight: '100vh', textAlign: 'center' },
  title: { color: 'white', marginBottom: '40px', fontSize: '2.8rem' },
  cardGrid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' },
  battleCard: { width: '240px', backgroundColor: '#e3d5b8', border: '6px solid #8b5a2b', borderRadius: '10px', cursor: 'pointer', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' },
  cardHeader: { backgroundColor: '#3b7608', color: 'white', padding: '8px', fontWeight: 'bold' },
  imageBox: { margin: '10px', backgroundColor: 'white', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  img: { width: '70%', height: 'auto' },
  stats: { padding: '10px', textAlign: 'left', fontSize: '0.85rem', color: '#333' },
  sciText: { fontStyle: 'italic', color: '#555' },
  clickHint: { fontSize: '0.7rem', fontWeight: 'bold', color: '#8b5a2b', paddingBottom: '10px' },

  overlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000 
  },
  modalCard: { 
    width: '90%', 
    maxWidth: '450px', 
    backgroundColor: '#e3d5b8', 
    border: '12px solid #8b5a2b', 
    borderRadius: '15px', 
    position: 'relative' 
  },
  closeBtn: { 
    position: 'absolute', 
    top: '-20px', 
    right: '-20px', 
    backgroundColor: '#8b5a2b', 
    color: 'white', 
    border: '3px solid white', 
    borderRadius: '50%', 
    width: '40px', 
    height: '40px', 
    cursor: 'pointer', 
    fontWeight: 'bold' 
  },
  modalHeader: { 
    backgroundColor: '#3b7608', 
    color: 'white', 
    padding: '15px', 
    fontSize: '1.8rem', 
    fontWeight: 'bold', 
    borderBottom: '5px solid #8b5a2b' 
  },
  modalImageBox: { 
    margin: '20px', 
    backgroundColor: 'white', 
    border: '4px solid #8b5a2b', 
    height: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  modalImg: { height: '90%', width: 'auto' },
  modalContent: { padding: '0 25px 25px', textAlign: 'left', color: '#333' },
  divider: { margin: '15px 0', border: '1px dashed #8b5a2b' },
  detailsText: { lineHeight: '1.5', fontStyle: 'italic' }
};

export default FactsPage;