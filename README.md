# Face Recognition Project

## Introduction

This project is made with an intent of serving as a replacement for traditional
means of attendance which is quite slow and error-prone.

The new Face Recognition Attendance System is a modern replacement for that and
is both faster and reduces the error factor.

## Packages required

1. Python3
2. SciKit
3. Streamlit
4. OpenCV

## How to run

1. Clone the github repository onto your chosen directory.

   ```bash
   git clone https://github.com/adarshkunwar/attendance-python
   ```

2. Move onto the new repository

   ```bash
   cd attendance-python
   ```

3. Run the run.sh script

   ```bash
   ./run.sh
   ```

## Troubleshooting

depending on the problems that arise, the solution will be different.

1. Streamlit module not found.

   ```bash
   pip3 install streamlit
   pip3 install streamlit_autorefresh
   ```

2. OpenCV module not found

   ```bash
   pip3 install opencv-python
   ```

3. Sclearn module not found

   ```bash
   pip3 install -U scikit-learn
   ```

4. Win32com module not found

   ```bash
   pip3 install pywin32
   ```

5. [x,y] matrix error
   1. throw away the existing data/faces_data.pkl and data/names.pkl file
   2. start the prject and press 1.
