# Multi-Cancer Classification Tool

## Overview
The **Multi-Cancer Classification Tool** is a machine learning-powered web application developed by **DAS medhub**. This tool helps classify different types of cancers based on medical images, providing accurate and fast results to aid medical specialists in diagnosis.

The application uses a **TensorFlow.js** model hosted on GitHub and can be accessed via a simple web interface. Users can upload medical images, and the model predicts the cancer type based on its training.

### Developed By:
- **DAS medhub**

## Features
- **Multi-Cancer Classification:** Supports classification for multiple cancer types, such as:
  - Brain Glioma
  - Breast Malignant
  - Cervix Koc
  - Lung SCC
  - Oral SCC
  - And many more...
  
- **Web-based Inference:** No need for specialized hardware—simply upload an image to the web app, and the prediction is made directly in the browser using TensorFlow.js.
  
- **Fast and Efficient:** The model processes medical images quickly, providing predictions within seconds.

## Model Architecture
The model is based on the **Xception** architecture, fine-tuned for multi-cancer classification. This model has been trained on  26 diverse set of cancer images to detect multiple cancer types with high accuracy.

Key Components:
- **Convolutional Layers:** Extract features from input images.
- **Batch Normalization:** Stabilizes learning by normalizing layer inputs.
- **Dropout:** Reduces overfitting by randomly ignoring neurons during training.
- **Dense Layers:** Classifies images into one of 26 cancer types.

## Model Details

- **Input Size:** The model expects images of size **224x224** pixels.
- **Number of Classes:** The model classifies images into the following 26 cancer types:
  - All Benign
  - All Early
  - Brain Glioma
  - Breast Malignant
  - Lung SCC
  - Cervix Koc
  - Oral SCC
  - … (include all 26 cancer types)
  
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
- **Cervical Cancer**
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
- **Training Time:** 7 epochs

## Performance Metrics
- **Test Accuracy (Top-1):** 98.69%
- **Test Accuracy (Top-5):** 100.00%
- **Precision (macro avg):** 0.99
- **Recall (macro avg):** 0.99
- **F1-Score (macro avg):** 0.99
- **Training Accuracy:** 98.23%

## Classes of Cancer
The model classifies the following cancer types:
---

# Classes of Cancer

## 1. Acute Lymphoblastic Leukemia ↪ [Reference](https://www.kaggle.com/datasets/mehradaria/leukemia)
- **all_benign**: Benign
- **all_early**: Early
- **all_pre**: Pre
- **all_pro**: Pro

## 2. Brain Cancer ↪ [Reference](https://figshare.com/articles/dataset/brain_tumor_dataset/1512427)
- **brain_glioma**: Glioma
- **brain_menin**: Meningioma
- **brain_tumor**: Pituitary Tumor

## 3. Breast Cancer ↪ [Reference](https://www.kaggle.com/datasets/anaselmasry/breast-cancer-dataset)
- **breast_benign**: Benign
- **breast_malignant**: Malignant

## 4. Cervical Cancer ↪ [Reference](https://www.kaggle.com/datasets/prahladmehandiratta/cervical-cancer-largest-dataset-sipakmed)
- **cervix_dyk**: Dyskeratotic
- **cervix_koc**: Koilocytotic
- **cervix_mep**: Metaplastic
- **cervix_pab**: Parabasal
- **cervix_sfi**: Superficial-Intermediate

## 5. Kidney Cancer ↪ [Reference](https://www.kaggle.com/datasets/nazmul0087/ct-kidney-dataset-normal-cyst-tumor-and-stone)
- **kidney_normal**: Normal
- **kidney_tumor**: Tumor

## 6. Lung and Colon Cancer ↪ [Reference](https://www.kaggle.com/datasets/biplobdey/lung-and-colon-cancer)
- **colon_aca**: Colon Adenocarcinoma
- **colon_bnt**: Colon Benign Tissue
- **lung_aca**: Lung Adenocarcinoma
- **lung_bnt**: Lung Benign Tissue
- **lung_scc**: Lung Squamous Cell Carcinoma

## 7. Lymphoma ↪ [Reference](https://www.kaggle.com/datasets/andrewmvd/malignant-lymphoma-classification)
- **lymph_cll**: Chronic Lymphocytic Leukemia
- **lymph_fl**: Follicular Lymphoma
- **lymph_mcl**: Mantle Cell Lymphoma

## 8. Oral Cancer ↪ [Reference](https://www.kaggle.com/datasets/ashenafifasilkebede/dataset)
- **oral_normal**: Normal
- **oral_scc**: Oral Squamous Cell Carcinoma



## Demo video ↪ [Link](https://youtu.be/GQ7QS0NIviA?si=IRA5Ncn5bzYd0wdm)

## License
This project content cannot be clonned or downloaded without prior notice - see the [LICENSE](LICENSE) file for details.

## Contact
For more information, reach out at:
- **Email:** [divinesebukpor@gmail.com](mailto:divinesebukpor@gmail)


---

