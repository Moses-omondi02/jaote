from app import create_app
from models import db, NGO, Task, User, Signup

def seed_database():
    app = create_app()
    
    with app.app_context():
        print("🌱 Seeding database with sample data...")
        
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        # Create NGOs
        ngo1 = NGO(
            name="Green Earth Foundation",
            email="contact@greenearth.org",
            description="Environmental conservation and community cleanups"
        )
        
        ngo2 = NGO(
            name="Hope for Children",
            email="info@hopeforchildren.org", 
            description="Supporting underprivileged children in the community"
        )
        
        ngo3 = NGO(
            name="Animal Rescue Kenya",
            email="rescue@animalkenya.org",
            description="Animal welfare and rescue organization"
        )
        
        db.session.add_all([ngo1, ngo2, ngo3])
        db.session.commit()
        print("✅ Created 3 NGOs")
        
        # Create Tasks
        tasks = [
            Task(
                ngo_id=ngo1.id,
                title="Community Park Cleanup",
                description="Help clean up Central Park and plant new trees. Bring gloves and water.",
                category="environment",
                location="Nairobi Central Park",
                hours=4,
                status="open"
            ),
            Task(
                ngo_id=ngo1.id,
                title="Beach Plastic Collection",
                description="Collect plastic waste from Jomo Kenyatta Beach",
                category="environment", 
                location="Mombasa Beach",
                hours=3,
                status="open"
            ),
            Task(
                ngo_id=ngo2.id,
                title="Children's Reading Program",
                description="Volunteer to read with children at the community library",
                category="education",
                location="Community Library",
                hours=2,
                status="open"
            ),
            Task(
                ngo_id=ngo2.id,
                title="School Supplies Drive",
                description="Help distribute school supplies to underprivileged schools",
                category="education",
                location="Various Schools",
                hours=5,
                status="in_progress"
            ),
            Task(
                ngo_id=ngo3.id,
                title="Animal Shelter Cleaning",
                description="Help clean and maintain the animal shelter facilities",
                category="animals",
                location="Nairobi Animal Shelter",
                hours=3,
                status="open"
            ),
            Task(
                ngo_id=ngo3.id,
                title="Pet Adoption Event",
                description="Assist with our monthly pet adoption event",
                category="animals",
                location="City Mall",
                hours=6,
                status="completed"
            )
        ]
        
        db.session.add_all(tasks)
        db.session.commit()
        print("✅ Created 6 tasks")
        
        # Create Users
        users = [
            User(name="John Mwangi", email="john.mwangi@email.com"),
            User(name="Sarah Akinyi", email="sarah.akinyi@email.com"),
            User(name="David Kimani", email="david.kimani@email.com"),
            User(name="Grace Wambui", email="grace.wambui@email.com")
        ]
        
        db.session.add_all(users)
        db.session.commit()
        print("✅ Created 4 users")
        
        # Create Signups
        signups = [
            Signup(task_id=1, user_id=1, message="I love gardening and would be happy to help!"),
            Signup(task_id=1, user_id=2, message="Available all weekend for this cause"),
            Signup(task_id=3, user_id=3, message="I'm a teacher and would love to read with children"),
            Signup(task_id=5, user_id=4, message="I have experience with animal care"),
            Signup(task_id=2, user_id=1, message="Passionate about keeping our beaches clean"),
            Signup(task_id=4, user_id=2, message="Can help with distribution on Saturday")
        ]
        
        db.session.add_all(signups)
        db.session.commit()
        print("✅ Created 6 signups")
        
        print("\n🎉 Database seeded successfully!")
        print("\n📊 Sample Data Summary:")
        print(f"   NGOs: 3 organizations")
        print(f"   Tasks: 6 volunteer opportunities") 
        print(f"   Users: 4 volunteers")
        print(f"   Signups: 6 task registrations")
        print("\n🌐 Test your API endpoints:")
        print("   GET http://127.0.0.1:5000/api/ngos")
        print("   GET http://127.0.0.1:5000/api/tasks")
        print("   GET http://127.0.0.1:5000/api/signups")

if __name__ == '__main__':
    seed_database()