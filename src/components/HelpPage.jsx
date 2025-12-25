import React from 'react';

const HelpPage = () => {
    return (
        <div 
            style={{ 
                /* UPDATED: Increased top padding to 100px to clear the fixed header */
                padding: '100px 20px 50px 20px', 
                textAlign: 'center',
                backgroundColor: 'rgba(225, 247, 213, 1)', 
                minHeight: '100vh', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px' 
            }}
        >
            <h2>🌿 Welcome to the Healing Garden Help Center 🌿</h2>
            <p>We are here to assist you with your virtual herbal garden experience.</p>

            {/* --- Frequently Asked Questions (FAQ) Section --- */}
            <section style={{ maxWidth: '800px', width: '100%', textAlign: 'left', marginTop: '20px' }}>
                <h3>🔍 Common Questions</h3>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>
                        **How do I navigate the Virtual Tour?**
                        <p style={{ margin: '5px 0 15px 0', color: '#555' }}>
                            Click on the **"Virtual Garden Tour"** button. Use your mouse to drag and look around, and click on highlighted plants for information pop-ups.
                        </p>
                    </li>
                    <li>
                        **Where can I find facts about a specific herb?**
                        <p style={{ margin: '5px 0 15px 0', color: '#555' }}>
                            Use the **Search bar** in the header or browse the **"Explore Healing Plants"** section for an alphabetical list.
                        </p>
                    </li>
                    <li>
                        **Why isn't the animated text appearing?**
                        <p style={{ margin: '5px 0 15px 0', color: '#555' }}>
                            The animation is triggered by scrolling. Make sure you are viewing the home page and scroll down slowly until the line appears on the left.
                        </p>
                    </li>
                    <li>
                        **How do I save a plant to my favorites?**
                        <p style={{ margin: '5px 0 15px 0', color: '#555' }}>
                            On any plant's detail page, click the heart icon. View all your saved items on the **"Fav"** page.
                        </p>
                    </li>
                </ul>
            </section>
            
            {/* --- Support and Contact Section --- */}
            <section style={{ maxWidth: '800px', width: '100%', textAlign: 'center', marginTop: '30px', padding: '20px', borderTop: '1px solid #ccc' }}>
                <h3>Need Further Assistance?</h3>
                <p>
                    If your question isn't listed above, try the following options:
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '15px' }}>
                    <a href="mailto:support@herbalgarden.com" style={{ textDecoration: 'none', color: '#3b7608', fontWeight: 'bold' }}>
                        📧 Email Support
                    </a>
                    <a href="/ask" style={{ textDecoration: 'none', color: '#3b7608', fontWeight: 'bold' }}>
                        🤖 Ask the Botanist (AI Chat)
                    </a>
                </div>
            </section>
        </div>
    );
};

export default HelpPage;