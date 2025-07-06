from flask import Flask
from config import Config
from extensions import ma, cors


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    ma.init_app(app)
    cors.init_app(app)

    from orders import orders_bp

    app.register_blueprint(orders_bp)

    return app
