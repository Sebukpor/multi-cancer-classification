// Initialize variables
let model;
let currentStep = 1;
let analysisResults = [];
const { jsPDF } = window.jspdf;

// Set default examination date to today
document.getElementById('examination-date').valueAsDate = new Date();

const classNames = [
    'Acute Lymphoblastic Leukemia Benign', 'Acute Lymphoblastic Leukemia Early', 
    'Acute Lymphoblastic Leukemia Pre', 'Acute Lymphoblastic Leukemia Pro', 
    'Brain Glioma', 'Brain Meningioma', 'Brain Tumor', 
    'Breast Benign', 'Breast Malignant', 
    'Cervix Dyskeratotic', 'Cervix Koilocytotic', 'Cervix Metaplastic', 
    'Cervix Parabasal', 'Cervix Superficial Intermediate', 
    'Colon Adenocarcinoma', 'Colon Benign Tissue', 
    'Kidney Normal', 'Kidney Tumor', 
    'Lung Adenocarcinoma', 'Lung Benign Tissue', 'Lung Squamous Cell Carcinoma', 
    'Chronic Lymphocytic Leukemia', 'Follicular Lymphoma', 'Mantle Cell Lymphoma', 
    'Oral Normal', 'Oral Squamous Cell Carcinoma'
];

// Backend configuration
if (tf.backend().name === 'webgl') {
    console.log('Using WebGL backend');
    loadModel();
} else {
    tf.setBackend('cpu').then(() => {
        console.log('Using CPU backend');
        loadModel();
    });
}

async function loadModel() {
    try {
        model = await tf.loadGraphModel('model/model.json');
        console.log('Model loaded successfully');
        document.getElementById('loading-message').style.display = 'none';
        document.getElementById('image-upload').disabled = false;
    } catch (error) {
        console.error('Error loading model:', error);
        const errorColor = getComputedStyle(document.documentElement).getPropertyValue('--error');
        document.getElementById('loading-message').innerHTML = `
            <div style="color: ${errorColor}">
                <p>Error loading model. Please refresh the page or contact support.</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">Refresh Page</button>
            </div>
        `;
    }
}

// DOM elements
const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const imageContainer = document.getElementById('image-container');
const nextToStep2Button = document.getElementById('next-to-step2');
const predictionsContainer = document.getElementById('predictions-container'); // Add this line

// Navigation handlers
nextToStep2Button.addEventListener('click', () => {
    goToStep(2);
    performAnalysis();
});

document.getElementById('download-quick-report').addEventListener('click', () => {
    generateQuickPDF();
});

document.getElementById('next-to-step3').addEventListener('click', () => {
    goToStep(3);
});

document.getElementById('back-to-step2').addEventListener('click', () => {
    goToStep(2);
});

document.getElementById('next-to-step4').addEventListener('click', () => {
    goToStep(4);
    prepareReport();
});

document.getElementById('back-to-step3').addEventListener('click', () => {
    goToStep(3);
});

document.getElementById('start-new').addEventListener('click', () => {
    resetForm();
    goToStep(1);
});

document.getElementById('download-full-report').addEventListener('click', () => {
    generateFullPDF();
});

// Image upload handler
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage.src = e.target.result;
        imageContainer.style.display = 'block';
        nextToStep2Button.disabled = false;
    };
    reader.readAsDataURL(file);
});

function goToStep(step) {
    // Hide all step contents
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show current step content
    document.getElementById(`step${step}-content`).classList.add('active');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((el, index) => {
        if (index + 1 < step) {
            el.classList.add('completed');
            el.classList.remove('active');
        } else if (index + 1 === step) {
            el.classList.add('active');
            el.classList.remove('completed');
        } else {
            el.classList.remove('active', 'completed');
        }
    });
    
    currentStep = step;
}

async function performAnalysis() {
try {
    // Show loading state
    predictionsContainer.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Analyzing medical image...</p>
        </div>
    `;

    // Process image with TensorFlow.js
    const tensorImg = tf.browser.fromPixels(uploadedImage)
        .resizeBilinear([224, 224])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

    const logits = await model.predict(tensorImg);
    const predictions = await logits.arraySync()[0];
    
    // Sort predictions by confidence
    const sortedIndices = predictions.map((p, i) => i)
        .sort((a, b) => predictions[b] - predictions[a]);

    // Display top 5 predictions
    analysisResults = sortedIndices.slice(0, 5).map(index => ({
        label: classNames[index],
        confidence: predictions[index]
    }));

    // Update timestamp
    const now = new Date();
    document.getElementById('analysis-timestamp').innerText = `Analysis time: ${now.toLocaleString()}`;

    // Display results
    predictionsContainer.innerHTML = analysisResults.map((result, i) => `
        <div class="prediction-item">
            <div class="prediction-label">${i + 1}. ${result.label}</div>
            <div class="confidence-container">
                <div class="confidence-bar-bg">
                    <div class="confidence-bar" style="width: ${result.confidence * 100}%"></div>
                </div>
                <div class="confidence-text">${(result.confidence * 100).toFixed(1)}%</div>
            </div>
        </div>
    `).join('');

} catch (error) {
    console.error('Analysis error:', error);
    predictionsContainer.innerHTML = `
        <div style="color: var(--error); text-align: center; padding: 1rem;">
            <p>Error processing image analysis. Please try again.</p>
            <button onclick="performAnalysis()" class="btn btn-primary" style="margin-top: 1rem;">Retry Analysis</button>
        </div>
    `;
}
}
function prepareReport() {
    // Gather patient information
    const patientId = document.getElementById('patient-id').value || 'Not provided';
    const patientName = document.getElementById('patient-name').value || 'Not provided';
    const patientDob = document.getElementById('patient-dob').value || 'Not provided';
    const patientGender = document.getElementById('patient-gender').value || 'Not provided';
    const physician = document.getElementById('referring-physician').value || 'Not provided';
    const examDate = document.getElementById('examination-date').value || 'Not provided';
    
    // Format patient information for report
    document.getElementById('report-patient-info').innerHTML = `
        <p><strong>Patient ID:</strong> ${patientId}</p>
        <p><strong>Name:</strong> ${patientName}</p>
        <p><strong>DOB:</strong> ${patientDob ? new Date(patientDob).toLocaleDateString() : 'Not provided'}</p>
        <p><strong>Gender:</strong> ${patientGender}</p>
        <p><strong>Referring Physician:</strong> ${physician}</p>
        <p><strong>Examination Date:</strong> ${examDate ? new Date(examDate).toLocaleDateString() : 'Not provided'}</p>
    `;
    
    // Format analysis results for report
    document.getElementById('report-analysis-results').innerHTML = `
        <p><strong>Primary finding:</strong> ${analysisResults[0]?.label || 'No results'} (${(analysisResults[0]?.confidence * 100).toFixed(1)}% confidence)</p>
        <p><strong>Differential diagnoses:</strong></p>
        <ul style="margin-left: 20px;">
            ${analysisResults.slice(1).map(result => 
                `<li>${result.label} (${(result.confidence * 100).toFixed(1)}%)</li>`
            ).join('')}
        </ul>
    `;
}

function generateQuickPDF() {
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;
    
            // Add title
            doc.setFontSize(18);
    doc.text("Quick Analysis Report", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Add timestamp
    doc.setFontSize(12);
    doc.text(`Report generated on: ${new Date().toLocaleString()}`, 10, yPos);
    yPos += 10;

    // Add analysis results
    doc.setFontSize(14);
    doc.text("Analysis Results:", 10, yPos);
    yPos += 10;

    doc.setFontSize(12);
    analysisResults.forEach((result, index) => {
        doc.text(`${index + 1}. ${result.label} (${(result.confidence * 100).toFixed(1)}%)`, 15, yPos);
        yPos += 10;
    });

    // Save the PDF
    doc.save('quick_analysis_report.pdf');
}

function generateFullPDF() {
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Add title
    doc.setFontSize(18);
    doc.text("Comprehensive Diagnosis Report", pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // Add timestamp
    doc.setFontSize(12);
    doc.text(`Report generated on: ${new Date().toLocaleString()}`, 10, yPos);
    yPos += 10;

    // Add patient information
    doc.setFontSize(14);
    doc.text("Patient Information:", 10, yPos);
    yPos += 10;

    doc.setFontSize(12);
    const patientId = document.getElementById('patient-id').value || 'Not provided';
    const patientName = document.getElementById('patient-name').value || 'Not provided';
    const patientDob = document.getElementById('patient-dob').value || 'Not provided';
    const patientGender = document.getElementById('patient-gender').value || 'Not provided';
    const physician = document.getElementById('referring-physician').value || 'Not provided';
    const examDate = document.getElementById('examination-date').value || 'Not provided';

    doc.text(`Patient ID: ${patientId}`, 15, yPos);
    yPos += 10;
    doc.text(`Name: ${patientName}`, 15, yPos);
    yPos += 10;
    doc.text(`DOB: ${patientDob ? new Date(patientDob).toLocaleDateString() : 'Not provided'}`, 15, yPos);
    yPos += 10;
    doc.text(`Gender: ${patientGender}`, 15, yPos);
    yPos += 10;
    doc.text(`Referring Physician: ${physician}`, 15, yPos);
    yPos += 10;
    doc.text(`Examination Date: ${examDate ? new Date(examDate).toLocaleDateString() : 'Not provided'}`, 15, yPos);
    yPos += 15;

    // Add analysis results
    doc.setFontSize(14);
    doc.text("Analysis Results:", 10, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.text(`Primary finding: ${analysisResults[0]?.label || 'No results'} (${(analysisResults[0]?.confidence * 100).toFixed(1)}%)`, 15, yPos);
    yPos += 10;
    doc.text("Differential diagnoses:", 15, yPos);
    yPos += 10;

    analysisResults.slice(1).forEach(result => {
        doc.text(`- ${result.label} (${(result.confidence * 100).toFixed(1)}%)`, 20, yPos);
        yPos += 10;
    });

    // Add radiologist notes
    const notes = document.getElementById('report-notes').value;
    if (notes) {
        yPos += 10;
        doc.setFontSize(14);
        doc.text("Radiologist Notes:", 10, yPos);
        yPos += 10;
        doc.setFontSize(12);
        doc.text(notes, 15, yPos, { maxWidth: pageWidth - 30 });
    }

    // Save the PDF
    doc.save('full_diagnosis_report.pdf');
}

function resetForm() {
    // Reset form fields
    document.getElementById('image-upload').value = '';
    document.getElementById('uploaded-image').src = '#';
    document.getElementById('image-container').style.display = 'none';
    document.getElementById('next-to-step2').disabled = true;
    document.getElementById('patient-id').value = '';
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-dob').value = '';
    document.getElementById('patient-gender').value = '';
    document.getElementById('referring-physician').value = '';
    document.getElementById('examination-date').valueAsDate = new Date();
    document.getElementById('clinical-history').value = '';
    document.getElementById('report-notes').value = '';
    document.getElementById('report-patient-info').innerHTML = '';
    document.getElementById('report-analysis-results').innerHTML = '';
    document.getElementById('predictions-container').innerHTML = '';
    analysisResults = [];
}
