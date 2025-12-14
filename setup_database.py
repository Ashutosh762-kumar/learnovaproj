"""
LearnoVa Database Setup Script
This script creates the complete database with all sample data
Just run: python setup_database.py
"""

import sqlite3
import os

# SQL Schema and Data
SQL_SCRIPT = """
-- LearnoVa Database Schema
-- Drop existing tables if they exist
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS classes;

-- Classes Table
CREATE TABLE classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_number INTEGER NOT NULL UNIQUE,
    description TEXT
);

-- Subjects Table
CREATE TABLE subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    class_id INTEGER NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE(name, class_id)
);

-- Topics Table
CREATE TABLE topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    chapter_number INTEGER,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Items Table (Notes, Questions, Answers)
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL,
    item_type VARCHAR(20) NOT NULL CHECK(item_type IN ('note', 'question', 'answer')),
    title VARCHAR(200),
    content TEXT NOT NULL,
    difficulty_level VARCHAR(20) CHECK(difficulty_level IN ('easy', 'medium', 'hard')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

-- Users Table (Optional - for future expansion)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'student' CHECK(role IN ('student', 'teacher', 'admin')),
    class_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    FOREIGN KEY(class_id) REFERENCES classes(id)
);

-- Insert Classes
INSERT INTO classes (class_number, description) VALUES
(8, 'Class 8 - Foundation Level'),
(9, 'Class 9 - Secondary Level'),
(10, 'Class 10 - Board Examination'),
(11, 'Class 11 - Senior Secondary'),
(12, 'Class 12 - Higher Secondary Board');

-- Insert Subjects for Class 8
INSERT INTO subjects (name, class_id, description) VALUES
('Mathematics', 1, 'Algebra, Geometry, Mensuration'),
('Science', 1, 'Physics, Chemistry, Biology'),
('English', 1, 'Grammar, Literature, Writing'),
('Social Science', 1, 'History, Geography, Civics'),
('Hindi', 1, 'व्याकरण और साहित्य');

-- Insert Subjects for Class 9
INSERT INTO subjects (name, class_id, description) VALUES
('Mathematics', 2, 'Number Systems, Algebra, Geometry'),
('Science', 2, 'Physics, Chemistry, Biology'),
('English', 2, 'Literature and Grammar'),
('Social Science', 2, 'History, Geography, Economics, Political Science'),
('Hindi', 2, 'हिंदी व्याकरण और साहित्य');

-- Insert Subjects for Class 10
INSERT INTO subjects (name, class_id, description) VALUES
('Mathematics', 3, 'Real Numbers, Polynomials, Trigonometry, Statistics'),
('Science', 3, 'Physics, Chemistry, Biology'),
('English', 3, 'Literature, Grammar, Writing Skills'),
('Social Science', 3, 'History, Geography, Economics, Political Science'),
('Hindi', 3, 'हिंदी पाठ्यक्रम');

-- Insert Subjects for Class 11
INSERT INTO subjects (name, class_id, description) VALUES
('Mathematics', 4, 'Sets, Relations, Functions, Trigonometry, Calculus'),
('Physics', 4, 'Mechanics, Thermodynamics, Waves'),
('Chemistry', 4, 'Physical, Organic, Inorganic Chemistry'),
('Biology', 4, 'Botany and Zoology'),
('English', 4, 'Literature and Communication');

-- Insert Subjects for Class 12
INSERT INTO subjects (name, class_id, description) VALUES
('Mathematics', 5, 'Calculus, Vectors, Probability, Linear Programming'),
('Physics', 5, 'Electrostatics, Magnetism, Optics, Modern Physics'),
('Chemistry', 5, 'Solutions, Electrochemistry, Chemical Kinetics'),
('Biology', 5, 'Genetics, Biotechnology, Ecology'),
('English', 5, 'Advanced Literature and Writing');

-- Sample Topics for Class 10 Mathematics
INSERT INTO topics (subject_id, title, chapter_number, description) VALUES
(11, 'Real Numbers', 1, 'Euclid Division Lemma, HCF, LCM, Fundamental Theorem of Arithmetic'),
(11, 'Polynomials', 2, 'Zeros of Polynomial, Relationship between zeros and coefficients'),
(11, 'Linear Equations', 3, 'Pair of Linear Equations in Two Variables'),
(11, 'Quadratic Equations', 4, 'Solutions by factorization, completing square, quadratic formula'),
(11, 'Arithmetic Progressions', 5, 'nth term, Sum of n terms'),
(11, 'Triangles', 6, 'Similarity of Triangles, Pythagoras Theorem'),
(11, 'Coordinate Geometry', 7, 'Distance Formula, Section Formula, Area of Triangle'),
(11, 'Trigonometry', 8, 'Trigonometric Ratios, Identities'),
(11, 'Circles', 10, 'Tangent to a Circle'),
(11, 'Surface Areas and Volumes', 13, 'Cylinder, Cone, Sphere, Hemisphere'),
(11, 'Statistics', 14, 'Mean, Median, Mode of Grouped Data'),
(11, 'Probability', 15, 'Theoretical Probability');

-- Sample Items for Real Numbers Topic
INSERT INTO items (topic_id, item_type, title, content, difficulty_level) VALUES
(1, 'note', 'Introduction to Real Numbers', 
'Real numbers include all rational and irrational numbers. Rational numbers can be expressed as p/q where q≠0. Irrational numbers cannot be expressed in p/q form. Examples: √2, π, e are irrational numbers. The collection of all rational and irrational numbers form the real number system.', 
'easy'),

(1, 'note', 'Euclid Division Lemma', 
'For any two positive integers a and b, there exist unique integers q and r such that: a = bq + r, where 0 ≤ r < b. This is the basis for finding HCF using Euclid algorithm. Example: 67 = 13 × 5 + 2, where a=67, b=13, q=5, r=2.', 
'medium'),

(1, 'note', 'Fundamental Theorem of Arithmetic', 
'Every composite number can be expressed as a product of primes, and this factorization is unique, apart from the order of factors. Example: 60 = 2² × 3 × 5. This theorem is used to find HCF and LCM of numbers.', 
'medium'),

(1, 'question', 'Find HCF of 96 and 404', 
'Use Euclid Division Algorithm to find the HCF of 96 and 404. Show all steps clearly.', 
'easy'),

(1, 'question', 'Prove that √5 is irrational', 
'Prove by contradiction that √5 is an irrational number. Use the method similar to proving √2 is irrational.', 
'medium'),

(1, 'question', 'Prime Factorization Problem', 
'Find the LCM and HCF of 12, 15 and 21 by prime factorization method.', 
'medium'),

(1, 'answer', 'Solution: HCF of 96 and 404', 
'Step 1: 404 = 96 × 4 + 20
Step 2: 96 = 20 × 4 + 16
Step 3: 20 = 16 × 1 + 4
Step 4: 16 = 4 × 4 + 0
Since remainder is 0, HCF(96, 404) = 4', 
'easy'),

(1, 'answer', 'Solution: √5 is irrational', 
'Proof by contradiction:
Assume √5 is rational, then √5 = a/b where a,b are coprime integers.
Squaring: 5 = a²/b², so a² = 5b²
This means a² is divisible by 5, hence a is divisible by 5.
Let a = 5c, then 25c² = 5b², so b² = 5c²
This means b is also divisible by 5.
This contradicts our assumption that a and b are coprime.
Therefore, √5 is irrational.', 
'medium');

-- Sample Topics for Class 10 Science
INSERT INTO topics (subject_id, title, chapter_number, description) VALUES
(12, 'Chemical Reactions and Equations', 1, 'Types of chemical reactions, balancing equations'),
(12, 'Acids, Bases and Salts', 2, 'Properties and reactions of acids and bases'),
(12, 'Metals and Non-metals', 3, 'Properties, reactivity series, extraction of metals'),
(12, 'Life Processes', 6, 'Nutrition, Respiration, Transportation, Excretion'),
(12, 'Electricity', 12, 'Electric current, Ohm law, Series and Parallel circuits'),
(12, 'Light - Reflection and Refraction', 10, 'Laws of reflection and refraction, mirrors and lenses');

-- Sample Items for Electricity Topic
INSERT INTO items (topic_id, item_type, title, content, difficulty_level) VALUES
(17, 'note', 'Ohm Law', 
'Ohm Law states that the current flowing through a conductor is directly proportional to the potential difference across it, provided temperature remains constant. Mathematically: V = IR, where V is voltage (volts), I is current (amperes), R is resistance (ohms).', 
'easy'),

(17, 'question', 'Calculate Resistance', 
'A wire of length 3m and area of cross-section 1.7 × 10⁻⁶ m² has a resistance of 3 × 10⁻² ohm. Calculate the resistivity of the wire.', 
'medium'),

(17, 'answer', 'Solution: Resistivity Calculation', 
'Given: L = 3m, A = 1.7 × 10⁻⁶ m², R = 3 × 10⁻² Ω
Formula: ρ = RA/L
ρ = (3 × 10⁻² × 1.7 × 10⁻⁶) / 3
ρ = 1.7 × 10⁻⁸ Ω-m
The resistivity of the wire is 1.7 × 10⁻⁸ Ω-m', 
'medium');

-- Create Indexes for Performance
CREATE INDEX idx_subjects_class ON subjects(class_id);
CREATE INDEX idx_topics_subject ON topics(subject_id);
CREATE INDEX idx_items_topic ON items(topic_id);
CREATE INDEX idx_items_type ON items(item_type);
CREATE INDEX idx_users_class ON users(class_id);
"""

def create_database():
    """Create the LearnoVa database with all tables and sample data"""
    
    print("=" * 60)
    print("🎓 LearnoVa Database Setup")
    print("=" * 60)
    
    db_name = 'learnova.db'
    
    # Check if database already exists
    if os.path.exists(db_name):
        response = input(f"\n⚠️  Database '{db_name}' already exists. Overwrite? (yes/no): ")
        if response.lower() != 'yes':
            print("❌ Setup cancelled.")
            return
        os.remove(db_name)
        print(f"🗑️  Removed old database")
    
    try:
        # Create connection
        print(f"\n📦 Creating database: {db_name}")
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # Execute SQL script
        print("⚙️  Executing SQL script...")
        cursor.executescript(SQL_SCRIPT)
        
        # Commit changes
        conn.commit()
        
        # Verify data
        cursor.execute("SELECT COUNT(*) FROM classes")
        class_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM subjects")
        subject_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM topics")
        topic_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM items")
        item_count = cursor.fetchone()[0]
        
        # Close connection
        conn.close()
        
        # Success message
        print("\n" + "=" * 60)
        print("✅ Database created successfully!")
        print("=" * 60)
        print(f"\n📊 Database Statistics:")
        print(f"   • Classes: {class_count}")
        print(f"   • Subjects: {subject_count}")
        print(f"   • Topics: {topic_count}")
        print(f"   • Items (Notes/Questions/Answers): {item_count}")
        print(f"\n📁 Database file: {os.path.abspath(db_name)}")
        print("\n🚀 Next Steps:")
        print("   1. Install Flask: pip install flask flask-cors")
        print("   2. Create app.py with the Flask backend code")
        print("   3. Run: python app.py")
        print("   4. Open your HTML file in a browser")
        print("\n" + "=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error creating database: {e}")
        return

if __name__ == "__main__":
    create_database()
