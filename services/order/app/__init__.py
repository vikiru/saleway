import os

from flask import Flask, jsonify
from flask_compress import Compress
from flask_cors import CORS

from config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    Compress(app)
    frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
    CORS(app, origins=[frontend_url, "http://localhost"])

    @app.route('/api/v1/health')
    def health_check():
        return jsonify({'message': 'Order service is running.'})

    from orders import orders_bp

    app.register_blueprint(orders_bp)

    return app
