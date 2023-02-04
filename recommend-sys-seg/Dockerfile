FROM python:3.7
RUN pip install matplotlib==3.1.2
RUN pip install missingno==0.4.2
RUN pip install numpy==1.18.1
RUN pip install pandas==1.0.0
RUN pip install tensorflow==1.15
RUN pip install keras==2.3.0
RUN pip install seaborn==0.10.0
RUN pip install flask==2.1.1
RUN pip install flask-Cors==3.0.8
RUN pip install sklearn==0.0
RUN pip install protobuf==3.20.1
RUN pip install 'h5py==2.10.0' --force-reinstall
WORKDIR /app
COPY ./ ./
RUN set FLASK_RUN_PORT=8000
ENV FLASK_APP=server.py
RUN export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
