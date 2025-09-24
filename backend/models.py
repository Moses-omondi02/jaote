from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class NGO(db.Model):
    """Represents an NGO (organization) that can create volunteer tasks."""
    __tablename__ = "ngos"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    tasks = db.relationship(
        "Task",
        backref="ngo",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class User(db.Model):
    """Represents a volunteer user that can sign up for tasks."""
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    signups = db.relationship(
        "Signup",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Task(db.Model):
    """Represents a volunteer task posted by an NGO."""
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey("ngos.id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(80), default="general")
    location = db.Column(db.String(120), nullable=False)
    hours = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default="open")  # open, in_progress, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    signups = db.relationship(
        "Signup",
        backref="task",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "ngo_id": self.ngo_id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "location": self.location,
            "hours": self.hours,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "ngo_name": self.ngo.name if self.ngo else None,
        }


class Signup(db.Model):
    """Represents a volunteer signing up for a specific task."""
    __tablename__ = "signups"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint("task_id", "user_id", name="unique_task_user_signup"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "task_id": self.task_id,
            "user_id": self.user_id,
            "message": self.message,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "user_name": self.user.name if self.user else None,
            "user_email": self.user.email if self.user else None,
            "task_title": self.task.title if self.task else None,
        }
