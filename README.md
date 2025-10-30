# 🧬 Browser-Based Multi-Cancer Classification Framework Using Depthwise Separable Convolutions for Precision Diagnostics

**Authors:** Divine Sebukpor, Ikenna Odezuligbo*, Maimuna Nagey, Michael Chukwuka, Oluwamayowa Akinsuyi (Corresponding Author)
**Preprint DOI:** [https://www.preprints.org/manuscript/202510.1612](https://www.preprints.org/manuscript/202510.1612)
**Live Demo (Hugging Face Space):** [https://huggingface.co/spaces/Sebukpor/multi-cancer-gradcam](https://huggingface.co/spaces/Sebukpor/multi-cancer-gradcam)

---

## Overview

This repository documents our work: **“Browser-Based Multi-Cancer Classification Framework Using Depthwise Separable Convolutions for Precision Diagnostics.”**
We present a unified, browser-accessible AI system capable of detecting multiple cancer types from medical images, offering fast, accurate, and accessible diagnostic assistance via a web interface.

---

## Multi-Cancer Classification Tool

The Multi-Cancer Classification Tool is a machine-learning-powered web application developed by **DAS medhub**.
Users can upload a medical image and receive a predicted cancer type. The inference runs entirely in the browser using TensorFlow.js—no specialised hardware or server-side inference needed.

### Features

* **Multi-Cancer Classification:** Supports classification for 26 different cancer types (see list below).
* **Web-based Inference:** Model runs client-side in the browser.
* **Fast & Efficient:** Designed to provide predictions within seconds.
* **Accessible:** Tailored for health-care professionals and allied staff.

---

## Model Architecture

* **Base architecture:** Xception (pretrained backbone) fine-tuned for our task.
* **Key components:**

  * Convolutional layers for feature extraction
  * Batch Normalization for stabilising training
  * Dropout for regularisation
  * Dense layers for final classification
* **Input size:** 224 × 224 pixels
* **Output:** Softmax over 26 classes.

---

## Data Pre-processing & Training Details

* **Resizing:** All images (regardless of original resolution) are resized to 224 × 224 pixels.
* **Normalization:** Pixel values scaled to [0, 1].
* **Data Augmentation Techniques:**

  * Rotation
  * Zooming
  * Horizontal flipping
* **Training Hyper-parameters:**

  * Optimiser: Adam (learning rate = 1×10⁻⁴)
  * Loss: Categorical Cross-Entropy
  * Batch size: 32
  * Epochs: 21

---

## Performance Metrics

* Test Accuracy (Top-1): **99.73%**
* Test Accuracy (Top-5): **100.00%**
* Precision (macro average): **1.00**
* Recall (macro average): **1.00**
* F1-score (macro average): **1.00**
* Training Accuracy: **99.73%**

---

## Confusion Matrix & Loss Curves

![Confusion Matrix](images/confusion_matrix.png)
![Training & Validation Loss](images/train_and_validation.png)

---

## Classes of Cancer & Imaging Modalities

Below is the full list of supported cancer types **with the imaging modality** used in the underlying dataset (so users can supply the correct type of image).
*(If your own data setup differs from the dataset listed, please adjust accordingly.)*

| #                                                                                                                                                                                                                                   | Cancer Type                                                                 | Imaging Modality |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------- |
| **1. Acute Lymphoblastic Leukemia (ALL)** <br> – all_benign (Benign) <br> – all_early (Early) <br> – all_pre (Pre) <br> – all_pro (Pro)                                                                                             | Microscopy (blood smear / bone-marrow)                                      |                  |
| **2. Brain Cancer** <br> – brain_glioma (Glioma) <br> – brain_menin (Meningioma) <br> – brain_tumor (Pituitary Tumor)                                                                                                               | MRI – T1-weighted contrast-enhanced (CE-MRI) ([Figshare][1])                |                  |
| **3. Breast Cancer** <br> – breast_benign (Benign) <br> – breast_malignant (Malignant)                                                                                                                                              | Histopathology / microscopy (digital pathology – breast)                    |                  |
| **4. Cervical Cancer** <br> – cervix_dyk (Dyskeratotic) <br> – cervix_koc (Koilocytotic) <br> – cervix_mep (Metaplastic) <br> – cervix_pab (Parabasal) <br> – cervix_sfi (Superficial-Intermediate)                                 | Cytology / histopathology (Pap smear / cervical slide)                      |                  |
| **5. Kidney Cancer** <br> – kidney_normal (Normal) <br> – kidney_tumor (Tumor)                                                                                                                                                      | Computed Tomography (CT) scans ([The Cancer Imaging Archive (TCIA)][2])     |                  |
| **6. Lung & Colon Cancer** <br> – colon_aca (Colon Adenocarcinoma) <br> – colon_bnt (Colon Benign Tissue) <br> – lung_aca (Lung Adenocarcinoma) <br> – lung_bnt (Lung Benign Tissue) <br> – lung_scc (Lung Squamous Cell Carcinoma) | Histopathology (microscopy of H&E-stained slides) ([arXiv][3])              |                  |
| **7. Lymphoma** <br> – lymph_cll (Chronic Lymphocytic Leukemia) <br> – lymph_fl (Follicular Lymphoma) <br> – lymph_mcl (Mantle Cell Lymphoma)                                                                                       | Histopathology / microscopy (hematologic tissue slides)                     |                  |
| **8. Oral Cancer** <br> – oral_normal (Normal) <br> – oral_scc (Oral Squamous Cell Carcinoma)                                                                                                                                       | Histopathology (H&E-stained oral cavity tissue slides) ([Mendeley Data][4]) |                  |

> **Important:** Please ensure the image you upload corresponds to the modality listed above for the class you suspect.
> The model was trained on these modalities — using a different modality may degrade performance.

---

## Repository Structure

```
/
├── model/                 # TensorFlow.js model files (model.json + weights)
├── webapp/                # Web UI code (index.html, JS, CSS)
├── images/                # Supporting graphics (confusion matrix, loss curves)
├── README.md              # This file
├── LICENSE                # MIT License
└── docs/                  # Additional documentation (dataset references, etc.)
```

---

## Live Demo

Try the live demo on Hugging Face: [https://huggingface.co/spaces/Sebukpor/multi-cancer-gradcam](https://huggingface.co/spaces/Sebukpor/multi-cancer-gradcam)
*You can upload sample images and observe predictions in real-time.*

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For more information, please reach out:
**Email:** [divinesebukpor@gmail.com](mailto:divinesebukpor@gmail.com)
*(Divine Sebukpor, Founder – DAS medhub)*

---

## Acknowledgements

We thank all dataset providers, research collaborators, and community contributors who helped build the imaging datasets, the web-integration, and the browser-based deployment.

---

### Closing Note

By clearly specifying the imaging modality for each cancer class, users can ensure they provide the correct type of input image — thereby enabling the model to perform optimally and deliver reliable predictions.

---

**References:**
[1]: [https://figshare.com/articles/dataset/brain_tumor_dataset](https://figshare.com/articles/dataset/brain_tumor_dataset)
[2]: [https://www.cancerimagingarchive.net/](https://www.cancerimagingarchive.net/)
[3]: [https://arxiv.org/abs/1912.12142](https://arxiv.org/abs/1912.12142)
[4]: [https://data.mendeley.com/datasets/hb74ynkjcn/1](https://data.mendeley.com/datasets/hb74ynkjcn/1)

---
