# ベースイメージとしてPython 3.12のAlpineイメージを使用
FROM python:3.12-alpine

# pycファイル(および__pycache__)の生成を行わないようにする
ENV PYTHONDONTWRITEBYTECODE=1
# 標準出力・標準エラーのストリームのバッファリングを行わない
ENV PYTHONUNBUFFERED=1
# PYTHONPATH環境変数を設定
ENV PYTHONPATH=/app/src

# 作業ディレクトリを作成し設定
WORKDIR /app

# 必要なシステムパッケージをインストール
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    cargo

# Poetryをインストール
RUN pip install poetry

# Poetryの仮想環境を無効化（Dockerコンテナ内で動作させるため）
RUN poetry config virtualenvs.create false

# プロジェクトの依存関係ファイルをコピー
COPY ./backend/pyproject.toml ./backend/poetry.lock ./

# 依存関係をインストール
RUN poetry install --no-dev

# アプリケーションのソースコードをコピー
COPY ./backend/src /app/src

# Entrypointスクリプトをコピー
COPY ./backend/entrypoint.sh /app/

# Entrypointスクリプトに実行権限を付与
RUN chmod +x /app/entrypoint.sh

CMD ["sh", "entrypoint.sh"]

