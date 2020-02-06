from flask import request, redirect, url_for, render_template, Blueprint
from itsdangerous import SignatureExpired, BadTimeSignature
from http import HTTPStatus

html_blueprint = Blueprint('html_blueprint', __name__, template_folder='templates')

@html_blueprint.route('/', methods=['GET'])
def index():
    user = {'username': 'Nitheesh'}
    return render_template('home.html', title='Home', user=user)

@html_blueprint.route('/debug-sentry')
def trigger_error():
    division_by_zero = 1 / 0

@html_blueprint.route('/verify/email/<token>')
def confirm_email(token): 
    from app.crypt import get_token_data
    try:
        email = get_token_data(token, salt="user-create", max_age=3600)
    except SignatureExpired:
        return 'Token Expired'
    except BadTimeSignature:
        return 'Invalid Token'
    return f'Tokens Works {email}'

@html_blueprint.route('/verify/team/<token>')
def confirm_team(token): 
    from app.crypt import get_token_data
    try:
        payload = get_token_data(token, salt="team-user", max_age=3600)
        team, user = payload.split(',')
    except SignatureExpired:
        return 'Token Expired'
    except BadTimeSignature:
        return 'Invalid Token'
    return f'Tokens Works for {team} with {user}'