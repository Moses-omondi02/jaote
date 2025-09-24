from app import create_app
from models import db, NGO, Task, User, Signup

def seed_database():
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create NGOs
        ngo1 = NGO(
            name="Green Earth Foundation",
            email="info@greenearth.org",
            description="Environmental conservation and community cleanups"
        )
        
        ngo2 = NGO(
            name="Hope for Children",
            email="contact@hopeforchildren.org",
            description="Supporting underprivileged children in the community"
        )
        
        db.session.add(ngo1)
        db.session.add(ngo2)
        db.session.commit()
        
        # Create Tasks
        task1 = Task(
            ngo_id=ngo1.id,
            title="Community Park Cleanup",
            description="Help clean up Central Park and plant new trees",
            category="environment",
            location="Nairobi Central Park",
            hours=4,
            status="open"
        )
        
        task2 = Task(
            ngo_id=ngo2.id,
            title="Children's Reading Program",
            description="Volunteer to read with children at the community library",
            category="education",
            location="Community Library",
            hours=2,
            status="open"
        )
        
        db.session.add(task1)
        db.session.add(task2)
        db.session.commit()
        
        print("✅ Database seeded with sample data!")
        print(f"✅ Created NGO: {ngo1.name} (ID: {ngo1.id})")
        print(f"✅ Created NGO: {ngo2.name} (ID: {ngo2.id})")
        print(f"✅ Created Task: {task1.title}")
        print(f"✅ Created Task: {task2.title}")

if __name__ == '__main__':
    seed_database()