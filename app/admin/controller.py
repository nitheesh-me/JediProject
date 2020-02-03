from flask import request, redirect, url_for, Blueprint
from flask_login import logout_user, login_user

from app.database import db
from models import User

from .views import AdministratorIndexView, UserView, TeamView, AddTeamView

admin_html_blueprint = Blueprint('admin_html_blueprint', __name__, template_folder='templates')


@admin_html_blueprint.route('/login', methods=['POST'])
def admin_login():
    username = request.form["username"]
    password = request.form["password"]
    user = User.query.filter_by(username=username, type='admin').first()
    
    kwargs = {}
    if user and user.is_correct_password(password):
        login_user(user)
    else:
        kwargs["error"] = "No records found"

    return redirect(url_for('admin.index', **kwargs))


@admin_html_blueprint.route('/logout', methods=['GET'])
def admin_logout():
    logout_user()
    return redirect(url_for('admin.index'))
