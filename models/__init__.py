from app.database import db
from .user_team_mapping import UsersTeamMapping
from .user import User, UserSchema
from .team import Team, TeamSchema
from flask_sqlalchemy import event
    