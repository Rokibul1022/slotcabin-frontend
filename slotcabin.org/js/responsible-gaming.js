// Responsible Gaming functionality

function showSupportInfo(org) {
    const modal = document.getElementById('supportModal');
    const content = document.getElementById('supportContent');
    
    let info = '';
    
    if (org === 'gamcare') {
        info = `
            <h2>GamCare Support</h2>
            <p><strong>About GamCare:</strong> GamCare is the leading provider of information, advice, support and free counselling for the prevention and treatment of problem gambling.</p>
            
            <h3>Services Available:</h3>
            <ul>
                <li>Free confidential helpline</li>
                <li>Online chat support</li>
                <li>Face-to-face counselling</li>
                <li>Support groups</li>
                <li>Information and advice</li>
            </ul>
            
            <h3>Contact Information:</h3>
            <p><strong>Helpline:</strong> 0808 8020 133 (freephone)</p>
            <p><strong>Hours:</strong> Available 24/7</p>
            <p><strong>Website:</strong> www.gamcare.org.uk</p>
            <p><strong>Live Chat:</strong> Available on their website</p>
            
            <p><em>Note: This information is provided for educational purposes. SlotCabin.org does not provide direct links to external gambling support sites as we are an entertainment-only platform using virtual coins.</em></p>
        `;
    } else if (org === 'gambleaware') {
        info = `
            <h2>GambleAware Support</h2>
            <p><strong>About GambleAware:</strong> GambleAware is an independent charity that champions a public health approach to preventing gambling harms.</p>
            
            <h3>Services Available:</h3>
            <ul>
                <li>Educational resources</li>
                <li>Research and evidence</li>
                <li>Treatment and support funding</li>
                <li>Prevention programs</li>
                <li>Awareness campaigns</li>
            </ul>
            
            <h3>Key Resources:</h3>
            <p><strong>Website:</strong> www.begambleaware.org</p>
            <p><strong>Focus:</strong> Prevention, education, and treatment</p>
            <p><strong>Approach:</strong> Evidence-based public health strategies</p>
            
            <h3>Getting Help:</h3>
            <p>GambleAware funds the National Gambling Helpline and provides resources for those seeking help with gambling-related issues.</p>
            
            <p><em>Note: This information is provided for educational purposes. SlotCabin.org does not provide direct links to external gambling support sites as we are an entertainment-only platform using virtual coins.</em></p>
        `;
    }
    
    content.innerHTML = info;
    modal.style.display = 'block';
}