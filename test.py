from sklearn.neighbors import KNeighborsClassifier
import cv2
import pickle
import numpy as np
import os
import csv
import time
from datetime import datetime

from win32com.client import Dispatch

def speak(str1):
    speak = Dispatch(("SAPI.SpVoice"))
    speak.Speak(str1)

video = cv2.VideoCapture(0)
facedetect = cv2.CascadeClassifier('data/haarcascade_frontalface_default.xml')

with open('data/names.pkl', 'rb') as w:
    LABELS = pickle.load(w)
with open('data/faces_data.pkl', 'rb') as f:
    FACES = pickle.load(f)
with open('data/ages.pkl', 'rb') as ages_file:
    AGES = pickle.load(ages_file)
with open('data/jobs.pkl', 'rb') as jobs_file:
    JOBS = pickle.load(jobs_file)

print('Shape of Faces matrix --> ', FACES.shape)

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(FACES, LABELS)

imgBackground = cv2.imread("background.png")

COL_NAMES = ['NAME', 'AGE', 'JOB', 'TIME']
run = True
while run:
    ret, frame = video.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = facedetect.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        crop_img = frame[y:y + h, x:x + w, :]
        resized_img = cv2.resize(crop_img, (50, 50)).flatten().reshape(1, -1)
        output = knn.predict(resized_img)
        ts = time.time()
        date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
        timestamp = datetime.fromtimestamp(ts).strftime("%H:%M-%S")
        exist = os.path.isfile("Attendance/Attendance_" + date + ".csv")
        
        # Getting index of recognized label
        recognized_label_index = np.where(LABELS == output)[0][0]
        
        # Getting age and job corresponding to the recognized label
        age = AGES[recognized_label_index]
        job = JOBS[recognized_label_index]
        
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 1)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (50, 50, 255), 2)
        cv2.rectangle(frame, (x, y - 40), (x + w, y), (50, 50, 255), -1)
        cv2.putText(frame, f'{LABELS[recognized_label_index]} | {job}', (x, y - 15), cv2.FONT_HERSHEY_COMPLEX, 0.6, (255, 255, 255), 1)
        
        cv2.imshow("Frame", frame)
        k = cv2.waitKey(1)
        if k == ord('o'):
            speak("Attendance Taken..")
            time.sleep(5)
            attendance = [LABELS[recognized_label_index], str(age), job, str(timestamp)]
            if exist:
                with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
                    writer = csv.writer(csvfile)
                    writer.writerow(attendance)
                csvfile.close()
            else:
                with open("Attendance/Attendance_" + date + ".csv", "+a") as csvfile:
                    writer = csv.writer(csvfile)
                    writer.writerow(COL_NAMES)
                    writer.writerow(attendance)
                csvfile.close()    
        if k == ord('q'):
            speak("Closing Software..")
            run = False
            break
video.release()
cv2.destroyAllWindows()
