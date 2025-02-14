# Meal Shaker

Meal Shakerは、地域または現在地から一定範囲内の飲食店をランダムに表示するウェブアプリケーションです。このプロジェクトはフロントエンドとバックエンドの二つの部分に分かれています。

![Meal Shaker Logo](path/to/logo.png)

## Directory Structure

```markdown
meal-shaker/
├── backend/ # Backend directory
├── docker/ # Docker-related files
├── frontend/ # Frontend directory
├── .env.sample # Sample environment variables file
└──docker-compose.yml # Docker Compose configuration
```
## Technologies Used 

### Frontend

- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: A statically typed superset of JavaScript.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **Bunx**: A fast JavaScript runtime.

### Backend 

- **Python**: A high-level programming language.
- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.6+.

### DevOps & Tools

- **Docker**: A platform to develop, ship, and run applications in containers.
- **Docker Compose**: A tool for defining and running multi-container Docker applications.

## Setup Instructions / セットアップ手順

### Prerequisites / 前提条件

- Node.js and npm (for the frontend)
- Python and Poetry (for the backend)
- Docker and Docker Compose
- Environment variables set in a `.env` file (use `.env.sample` as a template)  
  環境変数を設定した `.env` ファイル（`.env.sample` をテンプレートとして使用）
- リクルートのAPIキーを取得[https://webservice.recruit.co.jp/doc/hotpepper/reference.html](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    bun install
    ```

[//]: # (3. Run the development server:)

[//]: # (    ```sh)

[//]: # (    bun dev)

[//]: # (    ```)

### Backend Setup

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install the dependencies:
    ```sh
    poetry install
    ```
3. Set the `PYTHONPATH` environment variable:

   For Linux/macOS:
    ```sh
    export PYTHONPATH=$(pwd)/src
    ```

   For Windows:
    ```sh
    set PYTHONPATH=%cd%\src
    ```
4. Run the application:
    ```sh
    poetry run uvicorn app.main:app --reload
    ```
5. Access the API documentation:
   - Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### Docker Setup / Dockerのセットアップ

1. Ensure Docker is running on your machine.  
   マシンでDockerが実行されていることを確認します。
2. Navigate to the project root directory.  
   プロジェクトのルートディレクトリに移動します。
3. Build and start the Docker containers:
    ```sh
    docker-compose up -d --build
    ```
4. When using Docker Compose, steps for running the development server and the application manually are not needed.  
   Docker Composeを使用する場合、開発サーバーとアプリケーションを手動で実行する手順は不要です


## Commit Message Guidelines

コミットメッセージにはプレフィックスを使用して、変更の種類を明確に示すことを推奨します。以下は、よく使われるプレフィックスの例です。

- `feat`: 新機能 (A new feature)
- `fix`: バグ修正 (A bug fix)
- `docs`: ドキュメントのみの変更 (Documentation only changes)
- `style`: コードの意味に影響しない変更 (White-space, formatting, missing semi-colons, etc)
- `refactor`: バグ修正や機能追加を含まないコード変更 (A code change that neither fixes a bug nor adds a feature)
- `perf`: パフォーマンス向上のためのコード変更 (A code change that improves performance)
- `test`: テストの追加や修正 (Adding missing or correcting existing tests)
- `chore`: ビルドプロセスや補助ツール、ライブラリの変更 (Changes to the build process or auxiliary tools and libraries such as documentation generation)

### Example Commit Messages / コミットメッセージの例

- `feat: add user authentication module / ユーザー認証モジュールを追加`
- `fix: resolve issue with login form validation / ログインフォームのバリデーションの問題を解決`
- `docs: update README with setup instructions / READMEにセットアップ手順を追加`
- `style: format code with Prettier / Prettierでコードをフォーマット`
- `refactor: restructure project directory / プロジェクトディレクトリを再構築`
- `perf: optimize database queries / データベースクエリを最適化`
- `test: add unit tests for user service / ユーザーサービスのユニットテストを追加`
- `chore: update dependencies / 依存関係を更新`