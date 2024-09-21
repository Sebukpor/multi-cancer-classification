# Multi-Cancer Classification Tool

## Overview
The **Multi-Cancer Classification Tool** is a machine learning-powered web application developed by **DAS medhub** in collaboration with **Team Pinnacle Pioneers**. This tool helps classify different types of cancers based on medical images, providing accurate and quick results that aid medical specialists in diagnosis.

The application uses a TensorFlow.js model hosted on GitHub and can be accessed via a simple web interface. Users can upload medical images, and the model will predict the cancer type based on its training.

### Developed By:
- **DAS** (Diagnostic Assistance System) - Medhub
- **Team Pinnacle Pioneers**

## Features
- **Multi-Cancer Classification:** Supports classification for several cancer types such as:
  - Brain Glioma
  - Breast Malignant
  - Cervix Koc
  - Lung SCC
  - Oral SCC
  - And many more...
  
- **Web-based Inference:** No need for specialized hardware—simply upload an image to the web app, and the prediction is made directly in the browser using TensorFlow.js.
  
- **Fast and Efficient:** The model processes medical images quickly, providing predictions within seconds.

## Model Architecture
The model is based on a convolutional neural network (CNN) architecture, specifically fine-tuned using the **Xception** model. This model has been trained on a dataset of multi-cancer images to detect different types of cancers with high accuracy.

Key Components:
- **Convolutional Layers:** Extracts features from input images.
- **Batch Normalization:** Stabilizes learning by normalizing layer inputs.
- **Dropout:** Reduces overfitting by randomly ignoring some neurons during training.
- **Dense Layers:** Provides classification decisions.

## Installation & Setup

### Requirements
- **TensorFlow.js** (for client-side inference)
- A browser (Chrome, Firefox, etc.)
- Internet connection (for loading the model from GitHub)

### Running Locally

1. Clone this repository:
    ```bash
    git clone https://github.com/your-github-username/repository-name.git
    cd repository-name
    ```

2. Open `index.html` in your preferred browser:
    ```bash
    open index.html
    ```

3. Upload an image and press **Predict**. The model will classify the image and display the predicted cancer type.

### Hosting on GitHub Pages
To host the tool on GitHub Pages:
1. Push the repository to your GitHub account.
2. Go to the repository settings and enable GitHub Pages in the "Pages" section.
3. The tool will be hosted at: `https://your-github-username.github.io/repository-name`.

## Usage Instructions
1. Open the tool in a browser (hosted online or locally).
2. Click the **Upload Image** button to upload a medical image.
3. After uploading, click **Predict**.
4. The result will be displayed on the screen, indicating the predicted cancer type.

## Model Details

- **Input Size:** The model expects images of size **224x224** pixels.
- **Number of Classes:** The model classifies images into the following 26 cancer types:
  - `All Benign`
  - `All Early`
  - `Brain Glioma`
  - `Breast Malignant`
  - `Lung SCC`
  - ... (list all cancer types)
  
- **Model Format:** The model is in TensorFlow.js format (`model.json` and corresponding weight files).

## Data Preprocessing
The images are preprocessed using the following techniques:
- **Resizing:** All images are resized to 224x224 pixels.
- **Normalization:** Pixel values are scaled to the range [0, 1].

## Dataset
The model has been trained on a custom dataset that includes labeled images for multiple cancer types. The dataset includes images of:
- **Brain Cancer**
- **Breast Cancer**
- **Lung Cancer**
- **Oral Cancer**
- And more...

### Data Augmentation
To improve model robustness, the following augmentations were applied:
- **Rotation**
- **Zooming**
- **Horizontal Flipping**

## Model Training
- **Architecture:** Xception-based CNN.
- **Optimizer:** Adam optimizer with a learning rate of `1e-4`.
- **Loss Function:** Categorical Cross-Entropy.
- **Batch Size:** 32
- **Training Time:** 5 epochs (you can adjust based on your needs).

## Performance Metrics
- **Accuracy:** X%
- **Precision:** X%
- **Recall:** X%
- **F1-Score:** X%

## Contributing
We welcome contributions! If you'd like to improve the model or the web interface:
1. Fork the repository.
2. Create a new branch (`feature/my-feature`).
3. Commit your changes.
4. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For more information, reach out to us at:
- **Email:** [dasmedhub@outlook.com](mailto:dasmedhub@outlook.com)

### Credits
Developed by **DAS medhub** and **Team Pinnacle Pioneers**.


#Classes of Cancer
Acute Lymphoblastic Leukemia
↪ 🔗 Ref.
1. all_benign  Benign
2. all_early   Early
3. all_pre  Pre
4. all_pro    Pro
Brain Cancer
↪ 🔗 Ref.
1. brain_glioma  Glioma
2. brain_menin Meningioma
3. brain_tumor Pituitary Tumor
Breast Cancer
↪ 🔗 Ref.
1. breast_benign Benign
2. breast_malignant  Malignant
Cervical Cancer
↪ 🔗 Ref.
1. cervix_dyk Dyskeratotic
2. cervix_koc Koilocytotic
3. cervix_mep    Metaplastic
4. cervix_pab Parabasal
5. cervix_sfi    Superficial-Intermediate
Kidney Cancer
↪ 🔗 Ref.
1. kidney_normal   Normal
2. kidney_tumor Tumor
Lung and Colon Cancer
↪ 🔗 Ref.
1. colon_aca    Colon Adenocarcinoma
2. colon_bnt  Colon Benign Tissue
3. lung_aca   Lung Adenocarcinoma
4. lung_bnt   Lung Benign Tissue
5. lung_scc  Lung Squamous Cell Carcinoma
Lymphoma
↪ 🔗 Ref.
1. lymph_cll    Chronic Lymphocytic Leukemia
2. lymph_fl    Follicular Lymphoma
3. lymph_mcl Mantle Cell Lymphoma
Oral Cancer
↪ 🔗 Ref.
1. oral_normal Normal
2. oral_scc    Oral Squamous Cell Carcinom
