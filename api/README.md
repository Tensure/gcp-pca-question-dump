# GCP PCA Questions BE

### Run llama3.1 using ollama in your local

Visit https://ollama.com/download and download.

Pull llama3.1

```shell
ollama pull llama3.1
```

### Start the server

Create virtual environment and activate

```shell
python -m venv .venv
source .venv/bin/activate
```

Install the dependencies

```shell
pip install -r requirements.txt
```

Run the app

```shell
python llama3.py
```
